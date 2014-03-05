(function($, QRCode, Views) {

  function ReceiveView() {
    this.$container = $("#receive");
    this.$receiveAddress = $("#receive-address");
    this.$smsButton = $("#sms-button");
    this.$emailButton = $("#email-button");
  }

  ReceiveView.prototype.show = function() {
    this.$container.fadeIn();
  };

  ReceiveView.prototype.hide = function() {
    this.$container.hide();
  };

  ReceiveView.prototype.setAddress = function(address) {
    new QRCode(document.getElementById("qrcode"), address);
    this.$receiveAddress.text(address);
    this.$smsButton.attr('href', 'sms:;body=' + address);
    this.$emailButton.attr('href', 'mailto:?body=' + address);
  };

  Views.receiveView = new ReceiveView();

})(jQuery, QRCode, CoinPocketApp.Views);
