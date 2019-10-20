/* global ot */

ot.FroalaAdapter = (function (global) {

    'use strict';
  
    var TextOperation = ot.TextOperation;
    var Selection = ot.Selection;
  
    // https://github.com/froala/wysiwyg-editor
    function FroalaAdapter (froala) {
      this.fr = froala;
      this.ignoreNextChange = false;
      this.changeInProgress = false;
      this.selectionChanged = false;

  
      bind(this, 'onChanges');
      bind(this, 'onChange');
      bind(this, 'onCursorActivity');
      bind(this, 'onFocus');
      bind(this, 'onBlur');
  
    }
  
    // Removes all event listeners from the Trix Editor instance.
    FroalaAdapter.prototype.detach = function () {
      // code goes here...
    };

    function froalaEditorDocLength (doc) {
        return 0
    }

}(this));
