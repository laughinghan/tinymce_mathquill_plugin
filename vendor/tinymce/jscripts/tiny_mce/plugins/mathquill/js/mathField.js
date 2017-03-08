
var args = top.tinymce.activeEditor.windowManager.getParams();




//tinyMCEPopup.requireLangPack();
//
var MathquillDialog = {
    init: function () {
        var $ = window.top.$;

        var mathquill = window.top.MathQuill.getInterface(2);
        this.mathquill = mathquill;
        console.log(mathquill);


        var mathFieldSpan = document.getElementById('math-field');
        //var latexSpan = document.getElementById('latex');

        var mathField = this.mathquill.MathField(mathFieldSpan, {
            spaceBehavesLikeTab: true, // configurable
            handlers: {
                edit: function () { // useful event handlers
                    //latexSpan.textContent = mathField.latex(); // simple API
                }
            }
        });
        this.mathField = mathField;

    },

    getLatex: function () {
        return this.mathField.latex();
    }
};
//
//tinyMCEPopup.onInit.add(MathquillDialog.init, MathquillDialog);
