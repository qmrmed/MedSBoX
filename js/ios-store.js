const buttons=[...document.querySelectorAll('.store-filter')];
const cards=[...document.querySelectorAll('.store-app')];
buttons.forEach(button=>button.addEventListener('click',()=>{
  buttons.forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  const filter=button.dataset.filter;
  cards.forEach(card=>card.classList.toggle('hidden',filter!=='all'&&card.dataset.category!==filter));
}));
