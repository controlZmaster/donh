// Enforce dark theme by default (toggle removed)
(function(){
  document.body.classList.add('dark');
})();

// Simple product list for marketplace
const products = [
  {id:1,name:'Iphone case GRAND THEFT AUTO',price:12.99,desc:'Premium protective case with bold design',img:'products/case1.jpg',category:'iPhone Cases'},
  {id:2,name:'Iphone case BATMAN',price:12.99,desc:'Dark knight themed protective case',img:'products/case2.jpg',category:'iPhone Cases'},
  {id:3,name:'Iphone case MARVEL',price:12.99,desc:'Marvel characters protective case',img:'products/case3.jpg',category:'iPhone Cases'},
  {id:4,name:'Iphone case HORROR',price:12.99,desc:'Horror themed protective case',img:'products/case4.jpg',category:'iPhone Cases'},
  {id:5,name:'Iphone case M4 COMPETITION',price:14.99,desc:'Sports-inspired protective case',img:'products/case5.jpg',category:'iPhone Cases'},
  {id:6,name:'Iphone case Saint Laurent',price:14.99,desc:'Luxury brand protective case',img:'products/case6.jpg',category:'iPhone Cases'},
  {id:7,name:'Parfum Imagination',price:69.99,desc:'Unique and inspiring fragrance',img:'products/parfum1.jpg',category:'Perfumes'},
  {id:8,name:'Parfum Ralph Lauren Polo Black',price:84.99,desc:'Classic elegant cologne',img:'products/parfum2.jpg',category:'Perfumes'},
  {id:9,name:'Parfum Valentino',price:69.99,desc:'Sophisticated designer fragrance',img:'products/parfum3.jpg',category:'Perfumes'},
  {id:10,name:'Parfum Stronger with you',price:49.99,desc:'Fresh and energetic scent',img:'products/parfum4.jpg',category:'Perfumes'},
  {id:11,name:'Parfum Versace',price:59.99,desc:'Luxury designer perfume',img:'products/parfum5.jpg',category:'Perfumes'},
  {id:12,name:'AirPods Pro',price:129.99,desc:'Wireless earbuds with noise cancellation',img:'products/airpod1.jpg',category:'Electronics'},
  {id:13,name:'Stylish Crossbody Bag',price:79.99,desc:'Durable and fashionable shoulder bag',img:'products/bag1.jpg',category:'Accessories'},
  {id:14,name:'Leather Jacket',price:149.99,desc:'Premium quality leather jacket',img:'products/jacket1.jpg',category:'Clothing'},
  {id:15,name:'Designer Sunglasses',price:89.99,desc:'UV protection stylish sunglasses',img:'products/sunglasses1.jpg',category:'Accessories'},
  {id:16,name:'Classic Sunglasses',price:59.99,desc:'Timeless sunglasses design',img:'products/sunglasses2.jpg',category:'Accessories'},
  {id:17,name:'Aviator Sunglasses',price:69.99,desc:'Cool aviator style shades',img:'products/sunglasses3.jpg',category:'Accessories'},
  {id:18,name:'Smart Watch Pro',price:199.99,desc:'Advanced fitness tracking watch',img:'products/watch1.jpg',category:'Electronics'},
  {id:19,name:'Baseball Cap Black',price:24.99,desc:'Comfortable adjustable cap',img:'products/cap1.jpg',category:'Clothing'},
  {id:20,name:'Baseball Cap Red',price:24.99,desc:'Vibrant colored adjustable cap',img:'products/cap2.jpg',category:'Clothing'}
];

function getCategories(){
  return [...new Set(products.map(p=>p.category))];
}

function getProductsByCategory(category){
  return products.filter(p=>p.category===category);
}

function getRandomProducts(category, limit=18){
  const categoryProducts = getProductsByCategory(category);
  const shuffled = [...categoryProducts].sort(()=>Math.random()-0.5);
  return shuffled.slice(0, limit);
}

function renderProductCard(p, container){
  const card = document.createElement('div');
  card.className='product card';
  card.setAttribute('data-product-id', p.id);
  card.innerHTML = `
    <div class="image" style="cursor:pointer;"><img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'"></div>
    <h3>${p.name}</h3>
    <p class="muted">${p.desc}</p>
    <div class="product-footer">
      <div><strong>$${p.price}</strong></div>
      <button class="btn" data-id="${p.id}">Buy Now</button>
    </div>
  `;
  card.querySelector('.image').addEventListener('click', ()=>openProductModal(p));
  container.appendChild(card);
}

function renderProducts(){
  const grid = document.getElementById('productsGrid');
  if(!grid) return;
  
  // Check if we're on marketplace page (all products) or index page (by category)
  const isMarketplacePage = window.location.pathname.includes('marketplace.html');
  
  if(isMarketplacePage){
    // Show all products
    grid.innerHTML='';
    products.forEach(p=>renderProductCard(p, grid));
  }else{
    // Show random products by category
    renderProductsByCategory();
  }
}

function renderProductsByCategory(){
  const mainGrid = document.getElementById('productsGrid');
  if(!mainGrid) return;
  mainGrid.innerHTML='';
  
  // Get random 18 products from all products
  const randomProducts = [...products].sort(()=>Math.random()-0.5).slice(0, 18);
  
  randomProducts.forEach(p=>renderProductCard(p, mainGrid));
}

function openProductModal(product){
  const modal = document.getElementById('productModal');
  if(!modal) return;
  
  document.getElementById('modalImage').src = product.img;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalPrice').textContent = `$${product.price}`;
  document.getElementById('modalDesc').textContent = product.desc;
  document.getElementById('modalBuyBtn').dataset.id = product.id;
  
  modal.classList.add('active');
}

function closeProductModal(){
  const modal = document.getElementById('productModal');
  if(modal) modal.classList.remove('active');
}

function openWhatsApp(message){
  const phone = '50943590374';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function handleTransfer(){
  const sendVia = document.getElementById('sendVia').value;
  const receiveVia = document.getElementById('receiveVia').value;
  const fromCountry = document.getElementById('fromCountry').value;
  const toCountry = document.getElementById('toCountry').value;
  const amount = parseFloat(document.getElementById('amountSend').value) || 0;
  const result = document.getElementById('amountReceive').textContent || '—';
  const transferResult = document.getElementById('transferResult');

  if(!amount || amount <= 0){
    if(transferResult) transferResult.textContent = 'Please enter a valid amount to continue.';
    return;
  }

  const message = `Hello Don H Services, I would like to execute a money transfer. Send via: ${sendVia}. Receive via: ${receiveVia}. From: ${fromCountry}. To: ${toCountry}. Amount: $${amount}. Estimated receive: ${result}. Please continue the operation.`;
  openWhatsApp(message);
  if(transferResult) transferResult.textContent = 'Opening WhatsApp with your transfer details...';
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const executeBtn = document.getElementById('executeTransfer');
  if(executeBtn) executeBtn.addEventListener('click', handleTransfer);

  const modalCloseBtn = document.querySelector('.modal-close');
  if(modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal);

  const modal = document.getElementById('productModal');
  if(modal) modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeProductModal();
  });

  const modalBuyBtn = document.getElementById('modalBuyBtn');
  if(modalBuyBtn) modalBuyBtn.addEventListener('click', (e)=>{
    const productId = e.target.dataset.id;
    const product = products.find(p=>p.id==productId);
    if(product){
      const message = `Hello, I'm interested in ${product.name} - ${product.desc}. Price: $${product.price}. Please provide purchase/delivery details.`;
      closeProductModal();
      openWhatsApp(message);
    }
  });

  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const msg = document.getElementById('contactMessage').value.trim();
      const res = document.getElementById('contactResult');
      if(!name||!email||!msg){ res.textContent='Please complete all fields.'; return; }
      res.textContent = 'Thanks! Your message is received (demo).';
      e.target.reset();
    });
  }

  const sendLinkBtn = document.getElementById('sendLinkBtn');
  if(sendLinkBtn) sendLinkBtn.addEventListener('click', ()=>{
    const linkInput = document.getElementById('productLink');
    const linkResult = document.getElementById('linkResult');
    const link = linkInput.value.trim();
    
    if(!link){
      linkResult.textContent = 'Please paste a product link.';
      return;
    }
    
    // Validate URL
    try{
      new URL(link);
    }catch(e){
      linkResult.textContent = 'Please enter a valid URL.';
      return;
    }
    
    const message = `Hello Don H Services, I would like to purchase this product: ${link}. Please help me get this item delivered to Haiti.`;
    openWhatsApp(message);
    linkResult.textContent = 'Link sent to WhatsApp! Opening WhatsApp now...';
    linkInput.value = '';
    setTimeout(()=>linkResult.textContent='', 3000);
  });
});

// WhatsApp generator for product buttons
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.btn');
  if(!btn) return;
  if(btn.dataset.id){
    const product = products.find(p=>p.id==btn.dataset.id);
    if(!product) return;
    const message = `Hello, I'm interested in ${product.name} - ${product.desc}. Price: $${product.price}. Please provide purchase/delivery details.`;
    openWhatsApp(message);
  }
});

// Calculator logic
const rates = {
  USD:{HTG:120, RUB:100, CAD:1.35, USD:1},
  RUB:{USD:0.013, HTG:1.56, CAD:0.017, RUB:1},
  CAD:{USD:0.74, HTG:88.5, RUB:74, CAD:1},
  HTG:{USD:0.0083, CAD:0.011, RUB:0.013, HTG:1}
};
const methodFees = {Paypal:0.035, Zelle:0.01, 'Sogebank Online':0.015, Mir:0.02};

function countryToCurrency(country){
  switch(country){
    case 'USA': return 'USD';
    case 'Russia': return 'RUB';
    case 'Canada': return 'CAD';
    case 'Haiti': return 'HTG';
    default: return 'USD';
  }
}

function calculate(){
  const sendViaEl = document.getElementById('sendVia');
  const receiveViaEl = document.getElementById('receiveVia');
  const fromCountryEl = document.getElementById('fromCountry');
  const toCountryEl = document.getElementById('toCountry');
  const amountEl = document.getElementById('amountSend');

  if(!sendViaEl || !receiveViaEl || !fromCountryEl || !toCountryEl || !amountEl) return;

  const sendVia = sendViaEl.value;
  const receiveVia = receiveViaEl.value;
  const fromCountry = fromCountryEl.value;
  const toCountry = toCountryEl.value;
  const amount = parseFloat(amountEl.value) || 0;

  const fromCurr = countryToCurrency(fromCountry);
  const toCurr = countryToCurrency(toCountry);
  const feePercent = methodFees[sendVia] || 0.02;

  // lookup rate
  const rate = (rates[fromCurr] && rates[fromCurr][toCurr]) ? rates[fromCurr][toCurr] : 1;

  const fee = amount * feePercent;
  const afterFee = amount - fee;
  const received = afterFee * rate;

  const amountReceive = document.getElementById('amountReceive');
  const rateUsed = document.getElementById('rateUsed');
  const feesApplied = document.getElementById('feesApplied');
  const totalEstimate = document.getElementById('totalEstimate');

  if(amountReceive) amountReceive.textContent = `${received.toFixed(2)} ${toCurr}`;
  if(rateUsed) rateUsed.textContent = `1 ${fromCurr} = ${rate} ${toCurr}`;
  if(feesApplied) feesApplied.textContent = `${fee.toFixed(2)} ${fromCurr} (${(feePercent*100).toFixed(2)}%)`;
  if(totalEstimate) totalEstimate.textContent = `${received.toFixed(2)} ${toCurr}`;
}

['sendVia','receiveVia','fromCountry','toCountry','amountSend'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', calculate);
});
// initial calc
calculate();
