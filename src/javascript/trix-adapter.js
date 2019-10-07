/* global ot */

ot.TrixAdapter = (function (global) {

    'use strict';
  
    var TextOperation = ot.TextOperation;
    var Selection = ot.Selection;
  
    function TrixAdapter (trix) {
      this.te = trix.editor;
      this.ignoreNextChange = false;
      this.changeInProgress = false;
      this.selectionChanged = false;

      // var doc = this.te.getDocument();
      // var pos = this.te.getPosition();
      // var comp = this.te.editorController.composition;
      // var startOffset = this.te.selectionManager.currentLocationRange[0].offset;
      // var rect = this.te.getClientRectAtPosition(startOffset);

      // this.te.setSelectedRange([0, doc.getLength()])

      
        if(global.document.documentMode <= 9) {
            trix.addEventListener('textInput', this.onChanges, false);
        } else {
            trix.addEventListener('input', this.onChanges, false);
        }
      
  
      bind(this, 'onChanges');
      bind(this, 'onChange');
      bind(this, 'onCursorActivity');
      bind(this, 'onFocus');
      bind(this, 'onBlur');
  
      this.te.addEventListener('o-trix-changes', this.onChanges); // 'changes'
      this.te.addEventListener('trix-change', this.onChange);
      this.te.addEventListener('trix-selection-change', this.onChange)
      this.te.addEventListener('o-trix-cursor-activity', this.onCursorActivity); // 'cursorActivity'
      this.te.addEventListener('trix-focus', this.onFocus);
      this.te.addEventListener('trix-blur', this.onBlur);

      this.trix = trix
    }
  
    // Removes all event listeners from the Trix Editor instance.
    TrixAdapter.prototype.detach = function () {
      this.te.removeEventListener('o-trix-changes', this.onChanges); // 'changes'
      this.te.removeEventListener('trix-change', this.onChange);
      this.te.removeEventListener('trix-selection-change', this.onChange);
      this.te.removeEventListener('o-trix-cursor-activity', this.onCursorActivity); // 'cursorActivity'
      this.te.removeEventListener('trix-focus', this.onFocus);
      this.te.removeEventListener('trix-blur', this.onBlur);
    };

    function trixEditorDocLength (doc) {
        return doc.getLength()
    }

}(this));