(function () {
  var order;
  try { order = JSON.parse(sessionStorage.getItem('fivesdev_last_order')); } catch (e) { order = null; }
  var requestedRef = new URLSearchParams(location.search).get('ref');
  var validOrder = order && typeof order.ref === 'string' && Array.isArray(order.items) && order.items.length > 0 && order.customer && order.delivery;
  if (!validOrder || (requestedRef && requestedRef !== order.ref)) {
    location.replace('store-checkout.html');
    return;
  }
  var ref = requestedRef || order.ref;

  function set(id, value) { var el = document.getElementById(id); if (el) el.textContent = value || ''; }
  set('orderRef', ref || '');
  set('bankRef', ref || '');
  if (order) {
    set('custName', order.customer.firstName || 'there');
    document.getElementById('summaryItems').innerHTML = order.items.map(function (item) { return storeItemHtml(item, false); }).join('');
    set('sumSubtotal', storeFormat(order.subtotal));
    set('sumShipping', storeFormat(order.shipping));
    set('sumTotal', storeFormat(order.total));
    set('shipTo', 'Delivering to: ' + order.delivery.recipient + ', ' + order.delivery.address);
  } else {
    document.getElementById('order-summary').hidden = true;
    set('custName', 'there');
  }

  var accounts = {
    fnb: {name:'First National Bank (FNB)', rows:[['Account name','Fives Dev'],['Account number','63220934962'],['Branch code','250655'],['Account type','Cheque']]},
    capitec: {name:'Capitec', rows:[['Account name','Fives Dev'],['Account number','2083709973'],['Branch code','470010'],['Account type','Cheque']]}
  };
  var choice = document.getElementById('bankChoice');
  var details = document.getElementById('bankDetails');
  function renderBank() {
    var account = accounts[choice.value] || accounts.fnb;
    details.innerHTML = '<h3>' + account.name + '</h3><dl>' + account.rows.map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('') + '</dl>';
  }
  choice.addEventListener('change', renderBank);
  renderBank();
})();
