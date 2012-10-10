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
      var latexImgRendererUrlTempl = ed.getParam('mathquill_latex_img_renderer_url_templ');

      // The rendered-LaTeX-img element that we are currently editing, if there is one
      var editing = null;

      // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceMathquill');
      ed.addCommand('mceMathquill', function(existing_latex) {
        if (!existing_latex) {
         existing_latex = '';
        }
        var popup = ed.windowManager.open({
          file : url + '/mathField.html',
          width : 700,
          height : 175,
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
        });
      });

      // Generate an image from the supplied latex and insert it into the tinyMCE document
      ed.addCommand('mceMathquillInsert', function(latex) {
        if (!latex) return;
        var content = '<img class="rendered-latex" '
          + 'style="vertical-align:middle" '
          + 'src="' + latexImgRendererUrlTempl.replace('*', latex) + '" '
          + 'alt="' + latex + '"/>';

        if (editing) ed.selection.select(editing);
        editing = null;

        ed.selection.setContent(content);
      });

      // Recognize that a user has clicked on the image, and pop-up the mathquill dialog box
      ed.onInit.add(function() {
        $(ed.getDoc()).on('click', 'img.rendered-latex', function() {
          editing = this;
          var latex = $(this).attr('alt');
          ed.execCommand('mceMathquill', latex);
        });
      });

      // Register mathquill button
      ed.addButton('mathquill', {
        title : 'mathquill.desc',
        cmd : 'mceMathquill',
        image : url + '/img/equation.gif'
      });

      // Use mathquill-rendered-latex when getting the contents of the document
      ed.onPreProcess.add(function(ed, o) {
        if (o.get) {
          var mathquills = ed.dom.select('img.rendered-latex', o.node);
          $(mathquills).replaceWith(function() {
            var latex = $(this).attr('alt');
            return '<span class="mathquill-rendered-math">' + latex + '</span>';
          });
        }
      });
      // Uncomment below to include MathQuill in the returned document (for the preview plugin as an example)
      // This is disabled as there is no checking for duplicates of the script line
      /*ed.onGetContent.add(function(ed, o) {
        o.content =
            '<link rel="stylesheet" href="' + url + '/vendor/mathquill.css"/>\n'
          + o.content
          + '<script type="text/javascript">\n'
          +   'window.top.$(\'.mathquill-rendered-math\', document).mathquill();\n'
          + '</script>';
      });*/
      
      // When loading or setting content, transform mathquill-rendered-math spans into img previews of the equation, ready for editing
      ed.onLoadContent.add(function(ed,o) {
          var mathquills = ed.dom.select('span.mathquill-rendered-math', o.node);
          $(mathquills).replaceWith(function() {
            var latex = $(this).text();
            var imgurl = '<img class="rendered-latex" '
            	+ 'style="vertical-align:middle" '
            	+ 'src="' + latexImgRendererUrlTempl.replace('*', latex) + '" '
            	+ 'alt="' + latex + '"/>';
            return imgurl;
          });
	  });
	  
	  ed.onSetContent.add(function(ed,o) {
          var mathquills = ed.dom.select('span.mathquill-rendered-math', o.node);
          $(mathquills).replaceWith(function() {
            var latex = $(this).text();
            var imgurl = '<img class="rendered-latex" '
            	+ 'style="vertical-align:middle" '
            	+ 'src="' + latexImgRendererUrlTempl.replace('*', latex) + '" '
            	+ 'alt="' + latex + '"/>';
            return imgurl;
          });
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
