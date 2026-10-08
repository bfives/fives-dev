/* Shared store UI: header, cart drawer, toast. Catalogue rendering when #productGrid exists. */
(function () {
  var COLOURS = {black:'#1d1d1f',white:'#f5f5f2',silver:'#d9d9d9',grey:'#8a8d91',gray:'#8a8d91',gold:'#e6cfa1',red:'#c8102e',blue:'#4a6fa5',green:'#4f6f5a',pink:'#f2c4cf',purple:'#b9a7d6',violet:'#7e6bb0',yellow:'#f4dc7a',cream:'#efe6d2',lavender:'#cbbfe6',teal:'#5fa8a3',orange:'#e2742f',navy:'#22304d',mint:'#bfe3d3',sage:'#b7c4a8',burgundy:'#6d2033',titanium:'#a8a49c',starlight:'#f0e9de',midnight:'#232a35',natural:'#c9c3b6',desert:'#c7a98a',ultramarine:'#5368d8',sky:'#a9cbe8',icy:'#cfe2ef',mist:'#b9cbd9',amber:'#e9b44c',graphite:'#4b4b4d',onyx:'#202020',marble:'#c4c4c4',cloud:'#e7ebee',space:'#3b3b3d',phantom:'#2c2c2e',cobalt:'#5a4fa0',deep:'#1f3b6d',cosmic:'#e2742f',sierra:'#a7c1d9',alpine:'#4f6f5a',whitesilver:'#e6e6e6',silverblue:'#a9b8c9',titan:'#9a9a9a',dark:'#3a3a3a'};
  window.storeColour = function (name) {
    var n = name.toLowerCase().replace(/[()]/g, '');
    if (n.indexOf('product') > -1) return COLOURS.red;
    var words = n.split(/\s+/);
    for (var i = words.length - 1; i >= 0; i--) if (COLOURS[words[i]] && words[i] !== 'titanium' && words[i] !== 'phantom') return COLOURS[words[i]];
    for (var j = 0; j < words.length; j++) if (COLOURS[words[j]]) return COLOURS[words[j]];
    return '#bbb';
  };

  // Mobile menu
  var tog = document.getElementById('navToggle');
  if (tog) tog.addEventListener('click', function () { var n = document.getElementById('headerLinks'); var o = n.classList.toggle('open'); tog.setAttribute('aria-expanded', o); });

  // Toast
  var toast = document.createElement('div'); toast.className = 'store-toast'; document.body.appendChild(toast);
  window.storeToast = function (msg) { toast.textContent = msg; toast.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(function () { toast.classList.remove('show'); }, 2200); };

  // Cart drawer
  var drawer = document.createElement('div');
  drawer.innerHTML = '<div class="cart-overlay" data-close-cart></div><aside class="cart-drawer" aria-label="Shopping cart"><div class="cart-head"><h2>Your cart</h2><button class="icon-btn" data-close-cart aria-label="Close cart">×</button></div><div class="cart-items" id="drawerItems"></div><div class="cart-foot" id="drawerFoot"></div></aside>';
  document.body.appendChild(drawer);
  function openCart() { renderDrawer(); document.body.classList.add('cart-open'); }
  function closeCart() { document.body.classList.remove('cart-open'); }
  window.storeOpenCart = openCart;
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-cart]')) { e.preventDefault(); openCart(); }
    if (e.target.closest('[data-close-cart]')) closeCart();
    var q = e.target.closest('[data-qty]');
    if (q) { var it = StoreCart.get().filter(function (i) { return i.key === q.dataset.key; })[0]; if (it) StoreCart.setQty(it.key, it.qty + Number(q.dataset.qty)); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });

  window.storeItemHtml = function (i, editable) {
    return '<div class="cart-item"><img src="' + i.image + '" alt=""><div><h4>' + i.name + '</h4><small>' + i.storage + ' · ' + i.colour + '</small>' +
      (editable ? '<div class="qty"><button data-qty="-1" data-key="' + i.key + '" aria-label="Decrease">−</button><span>' + i.qty + '</span><button data-qty="1" data-key="' + i.key + '" aria-label="Increase">+</button></div>' : '<small>Qty ' + i.qty + '</small>') +
      '</div><strong>' + storeFormat(i.price * i.qty) + '</strong></div>';
  };
  function renderDrawer() {
    var items = StoreCart.get();
    document.getElementById('drawerItems').innerHTML = items.length ? items.map(function (i) { return storeItemHtml(i, true); }).join('') : '<div class="cart-empty"><p>Your cart is empty.</p></div>';
    document.getElementById('drawerFoot').innerHTML = items.length ?
      '<div class="cart-row total"><span>Subtotal</span><span>' + storeFormat(StoreCart.subtotal()) + '</span></div><small>The delivery fee is shown after you enter your address at checkout.</small><a class="btn btn-primary" href="store-checkout.html">Checkout <span aria-hidden="true">→</span></a>' :
      '<a class="btn btn-ghost" href="tech-store.html#catalog" data-close-cart style="width:100%;justify-content:center">Browse products</a>';
  }
  function updateCount() { document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = StoreCart.count(); }); if (document.body.classList.contains('cart-open')) renderDrawer(); }
  document.addEventListener('cart:change', updateCount); updateCount();

  // ---------- Catalogue ----------
  var grid = document.getElementById('productGrid');
  if (!grid) return;
  var state = { cat: 'all', q: '', sort: 'featured' };
  var counts = { all: STORE_PRODUCTS.length };
  STORE_PRODUCTS.forEach(function (p) { counts[p.category] = (counts[p.category] || 0) + 1; });
  document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = counts[el.dataset.count] || 0; });

  function card(p) {
    var sw = p.colours.slice(0, 5).map(function (c) { return '<i style="background:' + storeColour(c) + '" title="' + c + '"></i>'; }).join('');
    var meta = p.category === 'laptop' ? p.specs[1][1] + ' · ' + p.specs[2][1] : p.storages.map(function (s) { return s.label; }).join(' / ');
    var sale = p.storages.some(function (s) { return s.wasPrice && s.wasPrice > s.price; });
    return '<a class="product-card" href="product.html?id=' + p.id + '"><div class="pc-img"><span class="pc-tag">' + p.condition + '</span>' + (sale ? '<span class="pc-sale-tag">Sale</span>' : '') + '<img loading="lazy" src="' + p.image + '" alt="' + p.brand + ' ' + p.model + '"></div><div class="pc-body"><span class="pc-brand">' + p.brand + '</span><h3 class="pc-name">' + p.model + '</h3><span class="pc-meta">' + meta + '</span><div class="pc-swatches">' + sw + '</div><div class="pc-price"><div><small>' + (p.storages.length > 1 ? 'From' : 'Price') + '</small>' + (p.wasPrice ? '<del class="pc-was-price">' + storeFormat(p.wasPrice) + '</del>' : '') + '<strong class="' + (sale ? 'pc-sale-price' : '') + '">' + storeFormat(p.price) + '</strong></div><span class="pc-view">View →</span></div></div></a>';
  }
  function render() {
    var list = STORE_PRODUCTS.filter(function (p) {
      if (state.cat !== 'all' && p.category !== state.cat) return false;
      if (state.q && (p.brand + ' ' + p.model).toLowerCase().indexOf(state.q) === -1) return false;
      return true;
    });
    if (state.sort === 'price-low') list.sort(function (a, b) { return a.price - b.price; });
    else if (state.sort === 'price-high') list.sort(function (a, b) { return b.price - a.price; });
    else if (state.sort === 'name') list.sort(function (a, b) { return (a.brand + a.model).localeCompare(b.brand + b.model); });
    else list.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    grid.innerHTML = list.map(card).join('');
    document.getElementById('emptyCatalog').hidden = list.length > 0;
    document.getElementById('resultCount').textContent = list.length + ' product' + (list.length === 1 ? '' : 's');
  }
  document.querySelectorAll('[data-cat]').forEach(function (b) {
    b.addEventListener('click', function () { document.querySelectorAll('[data-cat]').forEach(function (x) { x.classList.remove('active'); }); b.classList.add('active'); state.cat = b.dataset.cat; render(); });
  });
  document.getElementById('storeSearch').addEventListener('input', function (e) { state.q = e.target.value.trim().toLowerCase(); render(); });
  document.getElementById('sortProducts').addEventListener('change', function (e) { state.sort = e.target.value; render(); });
  render();
})();
