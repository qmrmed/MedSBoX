# MedSBoX Pro 2.0

منصة مكتبة تطبيقات طبية ودراسية مع اشتراكات يدوية عبر Telegram وتفعيل بكود فريد.

## البنية
- المكتبة العامة: تصفح وبحث وتفاصيل التطبيقات بدون تسجيل.
- التحميل: يتطلب حساباً واشتراكاً فعالاً، ويُتحقق منه على Firebase Functions قبل إعطاء الرابط.
- الاشتراكات: خطط محفوظة في Firestore ويمكن للإدارة إضافة خطط جديدة.
- التفعيل: المشرف ينشئ كوداً من `/admin.html` بعد تأكيد الدفع ويرسله للمشترك عبر Telegram. الكود يستخدم مرة واحدة.
- الإدارة: `/admin.html` لإدارة التطبيقات والخطط والمستخدمين وأكواد التفعيل.
- الأصول: يمكن استخدام Firebase Storage لأيقونات وصور التطبيقات.

## إعداد أول مشرف
بعد إنشاء حسابك في Firebase Authentication، أنشئ مستنداً في Firestore:
`admins/<UID>`

بالقيم:
```json
{ "enabled": true, "role": "admin" }
```

لا توجد طريقة من الواجهة العامة لإنشاء مشرف، وهذا مقصود.

## نشر Firebase
1. ثبّت Firebase CLI وسجّل الدخول.
2. اربط المشروع بمشروع Firebase `medsbox-pro`.
3. ثبّت الحزم داخل `functions`.
4. انشر Functions وFirestore Rules وStorage Rules وHosting.

قبل النشر النهائي، راجع روابط التحميل في كل تطبيق وتأكد أنها مملوكة/مرخّصة لك، ولا تضع ملفات سرية أو مفاتيح خدمة داخل الواجهة.

## نموذج التطبيق في Firestore
Collection: `apps`
```json
{
  "name": "Farmakon",
  "category": "صيدلة",
  "description": "...",
  "version": "1.0.0",
  "iconUrl": "...",
  "platforms": ["Android", "iPhone"],
  "downloadLinks": { "Android": "...", "iPhone": "..." },
  "active": true,
  "featured": false
}
```

## نموذج الخطة
Collection: `plans`
```json
{
  "name": "اشتراك سنوي",
  "price": 10,
  "currency": "USD",
  "durationDays": 365,
  "active": true
}
```

## ملاحظة مهمة
إعدادات Firebase الظاهرة في تطبيق الويب ليست أسراراً بحد ذاتها؛ الحماية الحقيقية تعتمد على Authentication وFirestore/Storage Rules وCloud Functions. لا تنقل منطق إنشاء أكواد التفعيل أو منح الاشتراك إلى JavaScript الخاص بالمتصفح.
