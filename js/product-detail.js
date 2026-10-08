(function () {
  var id = new URLSearchParams(location.search).get('id');
  var p = storeFind(id);
  var root = document.getElementById('productRoot');
  if (!p) { root.innerHTML = '<div class="empty-catalog" style="margin:40px 0"><h3>Product not found</h3><p><a href="tech-store.html">Back to the store</a></p></div>'; return; }
  var cats = { iphone: 'iPhone', samsung: 'Samsung Galaxy', laptop: 'Laptops' };
  var name = p.brand + ' ' + p.model;
  document.title = name + ' | Fives Dev Tech Store';
  document.getElementById('crumbCat').textContent = cats[p.category];
  document.getElementById('crumbName').textContent = p.model;
  var sel = { storage: p.storages[0], colour: p.colours[0] };

  root.innerHTML =
    '<div class="pd-grid"><div class="pd-image"><img src="' + p.image + '" alt="' + name + '"></div><div class="pd-info">' +
    '<span class="pc-brand">' + p.brand + ' · ' + p.condition + '</span><h1>' + p.model + '</h1>' +
    '<div class="pd-price" id="pdPrice"></div><div class="pd-sub">Smart buying: quality devices at a fraction of the new price.</div>' +
    '<div class="opt-label">Storage: <span id="selStorage"></span></div><div class="chips" id="storageChips">' +
    p.storages.map(function (s, i) { return '<button type="button" class="chip' + (i === 0 ? ' active' : '') + '" data-storage="' + i + '">' + s.label + '<small>' + storeFormat(s.price) + '</small></button>'; }).join('') +
    '</div><div class="opt-label">Colour: <span id="selColour"></span></div><div class="chips" id="colourChips">' +
    p.colours.map(function (c, i) { return '<button type="button" class="chip colour-chip' + (i === 0 ? ' active' : '') + '" data-colour="' + i + '"><i style="background:' + storeColour(c) + '"></i>' + c + '</button>'; }).join('') +
    '</div><div class="pd-actions"><button class="btn btn-ghost" id="addCart" type="button">Add to cart</button><button class="btn btn-primary" id="buyNow" type="button">Buy now</button></div>' +
    '' +
    '<h2 style="margin:32px 0 4px;font-size:1.2rem">Specifications</h2><table class="spec-table"><tbody>' +
    p.specs.map(function (r) { return '<tr><th>' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('') +
    '</tbody></table></div></div>';

  function update() {
    var onSale = sel.storage.wasPrice && sel.storage.wasPrice > sel.storage.price;
    document.getElementById('pdPrice').innerHTML = (onSale ? '<span class="pd-sale-tag">Sale</span><del class="pd-was-price">' + storeFormat(sel.storage.wasPrice) + '</del> ' : '') + '<strong class="' + (onSale ? 'pd-sale-price' : '') + '">' + storeFormat(sel.storage.price) + '</strong>';
    document.getElementById('selStorage').textContent = sel.storage.label;
    document.getElementById('selColour').textContent = sel.colour;
  }
  root.addEventListener('click', function (e) {
    var s = e.target.closest('[data-storage]'), c = e.target.closest('[data-colour]');
    if (s) { sel.storage = p.storages[s.dataset.storage]; root.querySelectorAll('[data-storage]').forEach(function (b) { b.classList.toggle('active', b === s); }); update(); }
    if (c) { sel.colour = p.colours[c.dataset.colour]; root.querySelectorAll('[data-colour]').forEach(function (b) { b.classList.toggle('active', b === c); }); update(); }
  });
  document.getElementById('addCart').addEventListener('click', function () { StoreCart.add(p.id, sel.storage.label, sel.colour, 1); storeToast(name + ' added to cart'); storeOpenCart(); });
  document.getElementById('buyNow').addEventListener('click', function () { StoreCart.add(p.id, sel.storage.label, sel.colour, 1); location.href = 'store-checkout.html'; });
  update();
})();
