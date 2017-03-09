 
 tinymce.PluginManager.add('mathquill', function (editor, url) {
     
     var panelButton = {
         type: 'panelbutton',
         panel: {
             role: 'application',
             autohide: true,
             minHeight: 125,
             minWidth: 700,
             style: "background:white;",
             html: "<div style=\"all:initial;\"><style type=\"text/css\">.mq-root-block * {vertical-align:middle;text-align:center;}</style><link rel=\"stylesheet\" href=\"" + url + "/vendor/mathquill.css\" /><span id=\"math-field\" style=\"position:absolute;left:5px;right:5px;top:5px;bottom:5px;\"></span></div>",
             //onclick: function (e) {  },
             onhide: function(e) {
                 editor.insertContent("\\(" + this.mathField.latex() + "\\)");
             },
             onshow: function(e) {
                 this.mathField.latex("");
                 this.mathField.focus();
             },
             onpostRender: function (e) {
                 //create the mathquill interface
                 var mathquill = MathQuill.getInterface(2);
                 var mathFieldSpan = document.getElementById('math-field');
                 this.mathField = mathquill.MathField(mathFieldSpan, {
                     spaceBehavesLikeTab: true
                 });
             },
             onkeydown: function(e) {
                 if (e.keyCode === 13) {
                     this.hide();
                 }
             }
         },
         title: 'Mathquill',
         image: url + "/img/equation.gif"
     };

     // Register mathquill button
     editor.addButton("mathquill", panelButton);

     //can't work out how to add a keyboard shortcut for a panelbutton, there's no command/event?
     //hacking around using the aria-label
     editor.shortcuts.add("ctrl+m", "Mathquill", function () { $("[aria-label=Mathquill]").click(); });
 });