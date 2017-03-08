 
 tinymce.PluginManager.add('mathquill', function (editor, url) {
     
    // Register mathquill button
     editor.addButton('mathquill', {
         type: 'panelbutton',
         panel: {
             role: 'application',
             autohide: true,
             minHeight: 125,
             minWidth: 700,
             style: "background:white;",
             html: "<div style=\"all:initial;\"><style type=\"text/css\">.mq-root-block * {vertical-align:middle;text-align:center;}</style><link rel=\"stylesheet\" href=\"vendor/tinymce/jscripts/tiny_mce/plugins/mathquill/vendor/mathquill.css\" /><span id=\"math-field\" style=\"position:absolute;left:5px;right:5px;top:5px;bottom:5px;\"></span></div>",
             //onclick: function (e) {  },
             onhide: function(e) {
                 editor.insertContent(this.mathField.latex());
             },
             onpostRender: function (e) {
                 console.log(e);
                 var mathquill = MathQuill.getInterface(2);
                 var mathFieldSpan = document.getElementById('math-field');
                 this.mathField = mathquill.MathField(mathFieldSpan, {
                     spaceBehavesLikeTab: true, // configurable
                     handlers: {
                         edit: function () { // useful event handlers
                             //latexSpan.textContent = mathField.latex(); // simple API
                         }
                     }
                 });
                 this.mathField.focus();
             },
             onkeydown: function(e) {
                 if (e.keyCode === 13) {
                     this.hide();
                 }
             }
         },
        title : 'Mathquill',
        //cmd : 'mceMathquill',
        image : url + '/img/equation.gif'
    });
 });