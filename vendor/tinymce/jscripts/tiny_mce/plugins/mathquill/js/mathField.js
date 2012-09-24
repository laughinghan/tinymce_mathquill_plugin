tinyMCEPopup.requireLangPack();

var MathquillDialog = {
  init : function() {
    var $ = window.top.$;
    $('.mathquill-editor', document).mathquill('editor')
      .keydown(function(e) {
        if (e.which === 13) {
          MathquillDialog.insertLatex($(this).mathquill('latex'));
        }
      });
  },

  insertLatex : function(val) {
    // Insert latex into the main tinyMCE document
    tinyMCEPopup.restoreSelection();
    tinyMCEPopup.editor.execCommand('mceMathquillInsert', val);
    tinyMCEPopup.close();
  }
};

tinyMCEPopup.onInit.add(MathquillDialog.init, MathquillDialog);
