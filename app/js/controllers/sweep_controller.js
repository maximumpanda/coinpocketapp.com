(function(pageHash, browser, sweepView, sweepConfirmController, Controllers) {

  function SweepController() {
    var self = this;

    self.showOrHide(pageHash.currentPage);
    pageHash.bind('pageHash.pageChanged', self.showOrHide.bind(self));
    sweepView.bind('nextButton.click', self.nextButtonClicked.bind(self));

    if (browser.canScanCode()) {
      sweepView.showScanCode();
    } else {
      sweepView.hideScanCode();
    }
  }

  SweepController.prototype.showOrHide = function(pageParams) {
    if (pageParams.page === '#/sweep') {
      sweepView.show();

      if (pageParams.params.code) {
        sweepView.$privateKeyInput.val(pageParams.params.code);
        this.nextButtonClicked();
      }
    } else if (pageParams.page === '#/sweep_confirm') {
      sweepView.hide();
      sweepView.clearValidations();
    } else {
      sweepView.hide();
      sweepView.clearValidations();
      sweepView.setPrivateKey('');
    }
  };

  SweepController.prototype.nextButtonClicked = function() {
    var self = this;
    var privateKeyVal = sweepView.$privateKeyInput.val();
    var privateKey    = new CoinPocketApp.Models.PrivateKey(privateKeyVal);

    sweepView.clearValidations();

    privateKey.isValid(function(result) {
      if (result) {
        sweepConfirmController.confirmSweep(privateKey);
      } else {
        sweepView.invalidPrivateKey();
        sweepView.validationMessage('Invalid Private Key');
      }
    });
  };

  Controllers.sweepController = new SweepController();

})(CoinPocketApp.Models.pageHash, CoinPocketApp.Models.browser, CoinPocketApp.Views.sweepView, CoinPocketApp.Controllers.sweepConfirmController, CoinPocketApp.Controllers);
