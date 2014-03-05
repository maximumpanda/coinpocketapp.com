(function(CoinPocketApp) {

  var self = CoinPocketApp.Controllers.PageHashController = {
    sendView: CoinPocketApp.Views.sendView,
    receiveView: CoinPocketApp.Views.receiveView,
    showOrHideViews: function(pageParams) {
      switch(pageParams.page) {
        case "#/send":
          self.sendView.show();
          self.receiveView.hide();
          break;
        case "#/receive":
          self.sendView.hide();
          self.receiveView.show();
          break;
        default:
          self.sendView.hide();
          self.receiveView.hide();
      }
    }
  };

  CoinPocketApp.Models.PageHash.pageHash.bind("pageHash.pageChanged", self.showOrHideViews);

  self.showOrHideViews(CoinPocketApp.Models.PageHash.pageHash.currentPage);

})(CoinPocketApp);
