const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore');
const crypto = require('crypto');

initializeApp();
const db = getFirestore();

async function isAdmin(uid) {
  if (!uid) return false;
  const snap = await db.doc(`admins/${uid}`).get();
  return snap.exists && snap.data().enabled === true;
}

function randomCode() {
  const raw = crypto.randomBytes(6).toString('hex').toUpperCase();
  return `MSB-${raw.slice(0,4)}-${raw.slice(4,8)}-${raw.slice(8,12)}`;
}

exports.createActivationCode = onCall(async (request) => {
  if (!(await isAdmin(request.auth?.uid))) throw new HttpsError('permission-denied', 'Admin only');
  const { planId, durationDays, note } = request.data || {};
  if (!planId) throw new HttpsError('invalid-argument', 'planId is required');
  const code = randomCode();
  const days = planId === 'lifetime' ? null : Number(durationDays || 365);
  await db.collection('activationCodes').doc(code).set({
    code, planId, durationDays: days, note: note || '', status: 'unused',
    createdAt: FieldValue.serverTimestamp(), createdBy: request.auth.uid
  });
  return { code };
});

exports.redeemActivationCode = onCall(async (request) => {
  const uid = request.auth?.uid;
  if (!uid) throw new HttpsError('unauthenticated', 'Login required');
  const code = String(request.data?.code || '').trim().toUpperCase();
  if (!code) throw new HttpsError('invalid-argument', 'Activation code is required');
  const ref = db.doc(`activationCodes/${code}`);
  const snap = await ref.get();
  if (!snap.exists || snap.data().status !== 'unused') throw new HttpsError('not-found', 'Invalid or used code');
  const data = snap.data();
  const userRef = db.doc(`users/${uid}`);
  const userSnap = await userRef.get();
  if (!userSnap.exists) throw new HttpsError('failed-precondition', 'User profile not found');
  const now = Timestamp.now();
  const expiresAt = data.planId === 'lifetime' ? null : Timestamp.fromMillis(now.toMillis() + Number(data.durationDays || 365) * 86400000);
  await db.runTransaction(async tx => {
    const fresh = await tx.get(ref);
    if (!fresh.exists || fresh.data().status !== 'unused') throw new HttpsError('aborted', 'Code already used');
    tx.update(ref, { status: 'used', usedBy: uid, usedAt: FieldValue.serverTimestamp() });
    tx.update(userRef, {
      plan: data.planId, subscriptionStatus: 'active', startedAt: FieldValue.serverTimestamp(),
      expiresAt, activatedAt: FieldValue.serverTimestamp(), activationCode: code
    });
  });
  return { success: true, planId: data.planId, expiresAt: expiresAt ? expiresAt.toDate().toISOString() : null };
});

exports.createDownloadToken = onCall(async (request) => {
  const uid = request.auth?.uid;
  if (!uid) throw new HttpsError('unauthenticated', 'Login required');
  const appId = String(request.data?.appId || '');
  const platform = String(request.data?.platform || '');
  if (!appId || !platform) throw new HttpsError('invalid-argument', 'App and platform are required');
  const userSnap = await db.doc(`users/${uid}`).get();
  const u = userSnap.data() || {};
  const active = u.subscriptionStatus === 'active' && (!u.expiresAt || u.expiresAt.toMillis() > Date.now());
  if (!active) throw new HttpsError('permission-denied', 'Active subscription required');
  const appSnap = await db.doc(`apps/${appId}`).get();
  if (!appSnap.exists || appSnap.data().active !== true) throw new HttpsError('not-found', 'App not found');
  const url = appSnap.data().downloadLinks?.[platform];
  if (!url) throw new HttpsError('not-found', 'Platform download not available');
  await db.collection('downloadLogs').add({ userId: uid, appId, platform, createdAt: FieldValue.serverTimestamp() });
  return { url };
});

exports.expireSubscriptions = onDocumentCreated('subscriptionJobs/{jobId}', async () => null);
