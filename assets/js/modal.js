$(document).ready(function () {
  $('.ui.basic.modal').
  modal({
    closable  : false,
    onApprove : function() {
      return true;
    }
  }).
  modal('show');
});
