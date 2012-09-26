tinyMCEPopup.requireLangPack();

var MathquillDialog = {
  init : function() {
    var $ = window.top.$;
    this.mathquill = $('.mathquill-editor', document).mathquill('editor')
      .keydown(function(e) {
        if (e.which === 13) {
          tinyMCEPopup.close();
        }
      });
  },

  getLatex : function() {
    var $ = window.top.$;
    return this.mathquill.mathquill('latex');
  },
};

tinyMCEPopup.onInit.add(MathquillDialog.init, MathquillDialog);
