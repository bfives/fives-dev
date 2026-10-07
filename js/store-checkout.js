(function () {
  var items = StoreCart.get();
  var form = document.getElementById('checkoutForm');
  if (!items.length) { form.innerHTML = '<div class="empty-catalog"><h3>Your cart is empty</h3><p><a class="btn btn-primary" href="tech-store.html">Browse products</a></p></div>'; }
  var deliveryReady = false;

  function renderSummary() {
    items = StoreCart.get();
    document.getElementById('summaryItems').innerHTML = items.map(function (i) { return storeItemHtml(i, false); }).join('');
    var sub = StoreCart.subtotal();
    document.getElementById('sumSubtotal').textContent = storeFormat(sub);
    document.getElementById('sumShipping').textContent = deliveryReady ? storeFormat(STORE_SHIPPING_FEE) : 'Added after address';
    document.getElementById('sumTotal').textContent = storeFormat(sub + (deliveryReady ? STORE_SHIPPING_FEE : 0));
  }
  renderSummary();
  if (!items.length) return;

  var rules = {
    firstName: function (v) { return v.length >= 2; }, lastName: function (v) { return v.length >= 1; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); },
    phone: function (v) { return /^(\+27|0)[6-8][0-9]{8}$/.test(v.replace(/[\s-]/g, '')); },
    address1: function (v) { return v.length >= 5; }, suburb: function (v) { return v.length >= 2; },
    city: function (v) { return v.length >= 2; }, province: function (v) { return !!v; },
    postal: function (v) { return /^[0-9]{4}$/.test(v); }
  };
  function check(ids) {
    var ok = true;
    ids.forEach(function (id) { var el = document.getElementById(id); var good = rules[id](el.value.trim()); el.closest('.field').classList.toggle('err', !good); if (!good && ok) { el.focus(); ok = false; } });
    return ok;
  }
  Object.keys(rules).forEach(function (id) { document.getElementById(id).addEventListener('input', function () { this.closest('.field').classList.remove('err'); }); });
  var detailIds = ['firstName', 'lastName', 'email', 'phone'];
  var deliveryIds = ['address1', 'suburb', 'city', 'province', 'postal'];

  function setStep(n) { document.querySelectorAll('.co-steps span').forEach(function (s) { s.classList.toggle('on', Number(s.dataset.step) <= n); }); }
  document.getElementById('toPayment').addEventListener('click', function () {
    if (!check(detailIds) || !check(deliveryIds)) return;
    deliveryReady = true; renderSummary(); setStep(3);
    document.getElementById('stepPayment').classList.remove('locked');
    document.getElementById('stepPayment').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  deliveryIds.forEach(function (id) { document.getElementById(id).addEventListener('focus', function () { setStep(2); }); });

  function v(id) { return document.getElementById(id).value.trim(); }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var err = document.getElementById('coError'); err.style.display = 'none';
    if (!check(detailIds) || !check(deliveryIds)) return;
    if (!document.getElementById('terms').checked) { err.textContent = 'Please accept the Terms of Service to continue.'; err.style.display = 'block'; return; }
    var d = new Date();
    var ref = 'FD' + String(d.getFullYear()).slice(2) + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2) + '-' + Math.floor(1000 + Math.random() * 9000);
    var sub = StoreCart.subtotal(), total = sub + STORE_SHIPPING_FEE;
    var address = [v('address1'), v('address2'), v('suburb'), v('city'), v('province'), v('postal')].filter(Boolean).join(', ');
    var order = {
      ref: ref, created: d.toISOString(), items: items, subtotal: sub, shipping: STORE_SHIPPING_FEE, total: total,
      customer: { firstName: v('firstName'), lastName: v('lastName'), email: v('email'), phone: v('phone') },
      delivery: { recipient: v('recipient') || (v('firstName') + ' ' + v('lastName')), address: address, type: v('addressType'), notes: v('notes') }
    };
    var payload = {
      _subject: 'New Tech Store order ' + ref + ' — ' + storeFormat(total),
      form_type: 'Tech Store order', order_reference: ref,
      customer_name: order.customer.firstName + ' ' + order.customer.lastName, email: order.customer.email, phone: order.customer.phone,
      recipient: order.delivery.recipient, delivery_address: address, address_type: order.delivery.type, delivery_notes: order.delivery.notes || '-',
      items: items.map(function (i) { return i.qty + ' × ' + i.name + ' (' + i.storage + ', ' + i.colour + ') @ ' + storeFormat(i.price); }).join('\n'),
      subtotal: storeFormat(sub), shipping: storeFormat(STORE_SHIPPING_FEE), total: storeFormat(total), payment_method: 'EFT / bank transfer'
    };
    var btn = document.getElementById('placeOrder'); btn.disabled = true; btn.textContent = 'Placing order…';
    fetch(STORE_FORMSPREE, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { if (!r.ok) throw new Error('fail'); return r.json(); })
      .then(function () {
        sessionStorage.setItem('fivesdev_last_order', JSON.stringify(order));
        StoreCart.clear();
        location.href = 'store-order-success.html?ref=' + encodeURIComponent(ref);
      })
      .catch(function () {
        btn.disabled = false; btn.textContent = 'Place order';
        err.textContent = 'We couldn\u2019t place your order just now. Please check your connection and try again, or email info@fivesdev.co.za.';
        err.style.display = 'block';
      });
  });
})();
