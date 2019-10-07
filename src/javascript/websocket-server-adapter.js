/* ot global */

ot.WebSocketServerAdapter = (function () {

    'use strict';

    function WebSocketServerAdapter (servicer, transporter) {
        ServerAdapter.call(this, arguments[0])
        this.transporter = transporter
    }

    WebSocketServerAdapter.prototype = Object.create(ot.ServerAdapter.prototype)

    WebSocketServerAdapter.prototype.publishOperation = function (protocolPayload) {
        if(!this.transporter) {
            return this.servicer.emit('operation', protocolPayload.revision, protocolPayload.httpEntityBody.operation, protocolPayload.httpEntityBody.selection);
        }
    };

    WebSocketServerAdapter.prototype.publishSelection = function (protocolPayload) {
        if(!this.transporter) {
            return this.servicer.emit('selection', protocolPayload.httpEntityBody.selection);
        }
    };
})();