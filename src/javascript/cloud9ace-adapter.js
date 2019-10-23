/* global ot */

ot.Cloud9AceAdapter = (function (global) {

    'use strict';
  
    var TextOperation = ot.TextOperation;
    var Selection = ot.Selection;
  
    // https://github.com/ajaxorg/ace
    function Cloud9AceAdapter (c9a /* = ace.edit("<editor_elem_id>") */) {
      this.c9a = c9a;
      this.ignoreNextChange = false;
      this.changeInProgress = false;
      this.selectionChanged = false;
        
       // use setOptions method
      if (!this.ignoreNextChange) {
        c9a.setOption("mergeUndoDeltas", "always"); // c9a.session.mergeUndoDeltas = true;
        c9a.setOption("selectionStyle", "text");
      }
        
        // c9a.session.getDocument();
        // c9a.session.getTextRange(c9a.getSelectionRange());
        // c9a.getSelectedText();
        // c9a.selection.getCursor();
        // c9a.selection.getLength();
  
      bind(this, 'onChanges');
      bind(this, 'onChange');
      bind(this, 'onCursorActivity');
      bind(this, 'onFocus');
      bind(this, 'onBlur');
        
        c9a.on('change', function(e) { // 'onChange'
            // e.start, e.end, e.lines, e.action
        });
        
        c9a.session.selection.on('changeSelection', function(e) { // 'onCursorActivity'
            // e.
        });

        c9a.session.selection.on('changeCursor', function(e) { // 'onCursorActivity'
            // e.
        });

        c9a.on('blur', function(e){ // 'onBlur'
            // e.
        });
        
        c9a.on('focus', function(e){ // 'onFocus'
            // e.
        });
    }
  
    // Removes all event listeners from the Cloud9Ace Editor instance.
    Cloud9AceAdapter.prototype.detach = function () {
      // code goes here...
    };

    function cloud9aceEditorDocLength (doc) {
        return doc.getLength()
    }

}(this));
