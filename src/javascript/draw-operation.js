/* ot global */

ot.DrawOperation = (function (global) {

    'use strict';

    // Constructor for new operations.
    function DrawOperation (context) {
        if (!this || this.constructor !== DrawOperation) {
            // => function was called without 'new'
            return new DrawOperation();
        }
    
        // When an operation is applied to an input string, you can think of this as
        // if an imaginary cursor runs over the entire string and skips over some
        // parts, deletes some parts and inserts characters at some positions. These
        // actions (skip/delete/insert) are stored as an array in the "ops" property.
        this.ops = [];

        this.context = context;
    }

}(this))