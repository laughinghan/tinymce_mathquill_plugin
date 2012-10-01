/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {
  // Load plugin specific language pack
  tinymce.PluginManager.requireLangPack('mathquill');

  tinymce.create('tinymce.plugins.MathquillPlugin', {
    /**
     * Initializes the plugin, this will be executed after the plugin has been created.
     * This call is done before the editor instance has finished it's initialization so use the onInit event
     * of the editor instance to intercept that event.
     *
     * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
     * @param {string} url Absolute URL to where the plugin is located.
     */
    init : function(ed, url) {
      // This is a local variable used as a lock on the window to prevent
      // infinite loops in onNodeChange
      var editing = false;

      // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceMathquill');
      ed.addCommand('mceMathquill', function(existing_latex) {
        if (!existing_latex) {
         existing_latex = '';
        }
        editing = true;
        var popup = ed.windowManager.open({
          file : url + '/mathField.html',
          width : 706,
          height : 199,
          inline : 1,
          popup_css : false
        }, {
          plugin_url : url, // Plugin absolute URL
          existing_latex : existing_latex // The latex currently in the img, '' if none
        });
        ed.windowManager.onClose.add(function onClose() {
          // The return value of ed.windowManager.open for inline windows is
          // not officially documented, but the code for the window amnager of
          // the "inlinePopups" plugin specifies that popup.iframeElement.get()
          // will return us the DOM of the popup.
          var latex = popup.iframeElement.get().contentWindow.MathquillDialog.getLatex();
          ed.execCommand('mceMathquillInsert', latex);
          ed.windowManager.onClose.remove(onClose);
          editing = false;
        });
      });

      // Generate an image from the supplied latex and insert it into the tinyMCE document
      ed.addCommand('mceMathquillInsert', function(latex) {
        if (!latex) return;
        var content = '<img class="rendered-latex" style="vertical-align:middle" src="http://www.tabuleiro.com/cgi-bin/mathtex.cgi?'
          + latex + '" alt="' + latex + '"/>';
        ed.selection.setContent(content);
      });

      // Recognize that a user has clicked on the image, and pop-up the mathquill dialog box
      ed.onNodeChange.add(function(ed, cm, n) {
        if (n.className === 'rendered-latex' && !editing) {
          var latex = $(n).attr('alt');
          ed.execCommand('mceMathquill', latex);
        }
      });

      // Register mathquill button
      ed.addButton('mathquill', {
        title : 'mathquill.desc',
        cmd : 'mceMathquill',
        image : url + '/img/equation.gif'
      });
    },

    /**
     * Returns information about the plugin as a name/value array.
     * The current keys are longname, author, authorurl, infourl and version.
     *
     * @return {Object} Name/value array containing information about the plugin.
     */
    getInfo : function() {
      return {
        longname : 'Mathquill',
        author : 'Han and Ian',
        authorurl : 'https://github.com/laughinghan',
        infourl : 'https://github.com/laughinghan/tinymce_mathquill_plugin',
        version : "1.0"
      };
    }
  });

  // Register plugin
  tinymce.PluginManager.add('mathquill', tinymce.plugins.MathquillPlugin);
})();
