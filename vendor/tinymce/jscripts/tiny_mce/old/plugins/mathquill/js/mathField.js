tinyMCEPopup.requireLangPack();

var MathquillDialog = {
  init : function() {
    var $ = window.top.$;
    var mathquill = this.mathquill = $('.mathquill-editor', document).mathquill('editor')
      .keydown(function(e) {
        if (e.which === 13) {
          tinyMCEPopup.close();
        }
      });

    mathquill.on('keydown keypress', function() { setTimeout(fitWindow); });

    var existing = tinyMCEPopup.getWindowArg('existing_latex');
    mathquill.mathquill('latex', existing).mathquill('redraw').focus();

    fitWindow();
    $('body').load(fitWindow); // in case font hasn't loaded yet, call it again

    function fitWindow() {
      win = tinyMCEPopup.id;
      var dw = dh = 0;
      var w = mathquill.outerWidth()+10;
      var h = mathquill.outerHeight()+10;

      // Now trick window into thinking it's that size.
      // so all internal resizing gets done properly..
      tinyMCEPopup.params.mce_height = h;
      tinyMCEPopup.params.mce_width = w;
      tinyMCEPopup.resizeToInnerSize();

      // Now move picture back to center.
      var vpw = tinyMCE.DOM.getViewPort().w;
      var vph = tinyMCE.DOM.getViewPort().h;
      var top = vph > h ? (vph-h)/2 : 0;
      var left = vpw > w ? (vpw-w)/2 : 0;

      // recenter.
      var popup = tinyMCE.DOM.doc.getElementById(tinyMCEPopup.id);
      popup.style.top = top+"px";
      popup.style.left = left+"px";
    }
  },

  getLatex : function() {
    return this.mathquill.mathquill('latex');
  }
};

tinyMCEPopup.onInit.add(MathquillDialog.init, MathquillDialog);
