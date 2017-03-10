 
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
             onhide: function (e) {
                 var output = this.mathField.latex();
                 if (output) { editor.insertContent("\\(" + this.mathField.latex() + "\\)"); }
                 editor.focus();
             },
             onshow: function (e) {
                 this.mathField.latex("");

                 //if we've selected an equation, we edit that.
                 var sel = editor.selection.getContent();
                 if (sel) {
                     if (sel.substr(0, 2) === "\\(" && sel.substr(sel.length - 2, 2) === "\\)") {
                         this.mathField.latex(sel.substr(2, sel.length - 4));
                     }
                 } else {
                     //if there's no selection but we're inside an equation,
                     //select the equation to edit it
                     var edRng = editor.selection.getRng();
                     var offset = edRng.startOffset;
                     var node = edRng.startContainer;
                     var content = node.wholeText;
                     if (!content) { return; }

                     //this is a bit weird but the only way I found of getting a true offset
                     for (var y = 0; y < node.parentNode.childNodes.length; y++) {
                         if (node.parentNode.childNodes[y]=== node) {break;}
                         offset += node.parentNode.childNodes[y].length;
                     }

                     var indexOfLb = content.substr(0,offset).lastIndexOf("\\(");
                     var indexOfRb = content.substr(offset).indexOf("\\)");

                     if (indexOfLb >= 0 && indexOfRb >= 0) {
                         var indexOfOffsideRb = content.substr(0, offset).lastIndexOf("\\)");
                         var indexOfOffsideLb = content.substr(offset).indexOf("\\(");

                         if (indexOfOffsideRb < indexOfLb && (indexOfOffsideLb === -1 || indexOfOffsideLb > indexOfRb)) {
                             //we're in an equation
                             //it's pitch black. you are likely to be eaten by a grue.

                             var overallIndexOfRb = offset + indexOfRb; 

                             this.mathField.latex(content.substr(indexOfLb + 2, (overallIndexOfRb - indexOfLb) - 2));
                             var rng = document.createRange();

                             var node1 = null;
                             var node1Index = 0;
                             var node2 = null;
                             var node2Index = 0;
                             var overallLength = 0;

                             for (var i = 0; i < node.parentNode.childNodes.length; i++) {
                                 var thisNode = node.parentNode.childNodes[i];
                                 var len = thisNode.length;
                                 if (!node1 && indexOfLb < overallLength + len) {
                                     node1 = thisNode;
                                     node1Index = indexOfLb - overallLength;
                                 }
                                 if (!node2 && overallIndexOfRb < overallLength + len) {
                                     node2 = thisNode;
                                     node2Index = overallIndexOfRb - overallLength;
                                 }
                                 if (node1 && node2) { break; }
                                 overallLength += len;
                             }

                             rng.setStart(node1, node1Index);
                             //we're taking it on faith the bracket is actually in the same node, it should be but unfortunately this may cause an issue
                             rng.setEnd(node2, node2Index + 2);

                             editor.selection.setRng(rng);
                         }
                     }
                 }
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
                 if (e.keyCode === 13) { this.hide(); }
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