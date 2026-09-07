const buttons=[...document.querySelectorAll('.store-filter')];
const grid=document.getElementById('storeApps');

const catalog=[
  {name:'ChatGPT',category:'ai',icon:'fa-brain',meta:'AI · Productivity'},
  {name:'Notion',category:'ai',icon:'fa-note-sticky',meta:'Notes · Productivity'},
  {name:'Threads',category:'social',icon:'fa-at',meta:'Social · Community'},
  {name:'Documents',category:'pdf',icon:'fa-folder-open',meta:'Files · Productivity'},
  {name:'PDF Expert',category:'pdf',icon:'fa-file-pdf',meta:'PDF · Files'},
  {name:'Netflix',category:'entertainment',icon:'fa-film',meta:'Entertainment · Video'},
  {name:'CapCut',category:'design',icon:'fa-wand-magic-sparkles',meta:'Video · Design'},
  {name:'Canva',category:'design',icon:'fa-pen-ruler',meta:'Design · Creative'}
];

function cardTemplate(app){
  return `<article class="store-app" data-category="${app.category}">
    <div class="store-app-icon"><i class="fa-solid ${app.icon}" aria-hidden="true"></i></div>
    <div class="store-app-info"><strong>${app.name}</strong><small>${app.meta}</small></div>
    <span class="store-app-arrow"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span>
  </article>`;
}

function render(){
  if(!grid) return;
  grid.innerHTML=catalog.map(cardTemplate).join('');
}

function applyFilter(filter){
  document.querySelectorAll('.store-filter').forEach(item=>item.classList.toggle('active',item===buttons.find(b=>b.dataset.filter===filter)));
  document.querySelectorAll('.store-app').forEach(card=>{
    card.classList.toggle('hidden',filter!=='all'&&card.dataset.category!==filter);
  });
}

render();
buttons.forEach(button=>button.addEventListener('click',()=>applyFilter(button.dataset.filter)));
