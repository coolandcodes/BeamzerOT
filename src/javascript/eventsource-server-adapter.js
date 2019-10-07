/* ot global */

ot.EventSourceServerAdapter = (function () {

    'use strict';

    function EventSourceServerAdapter (servicer, transporter){
        ServerAdapter.call(this, arguments[0]);
        this.transporter = transporter

        this.servicer = servicer
    }

    EventSourceServerAdapter.prototype = Object.create(ot.ServerAdapter.prototype)

    EventSourceServerAdapter.prototype.publishOperation = function (protocolPayload) {
        
        if(!this.transporter){
            return this.servicer.constructor.publishToHub(protocolPayload.httpEntityBody)
        }

        var transportName = this.transporter.displayName

        switch(transportName){
            case "ajax": // jQuery ajax
                return transporter({
                    url: protocolPayload.httpUrl,
                    type: protocolPayload.httpMethod.toUpperCase(),
                    data: JSON.stringify(protocolPayload.httpEntityBody),
                    contentType: protocolPayload.httpContentType,
                    processData: false,
                    timeout: 2000
                });
            break;
            case "axios": // Axios: https://github.com/axios/axios
                return transporter({
                    method: protocolPayload.httpMethod.toLowerCase(),
                    url: protocolPayload.httpUrl,
                    data: protocolPayload.httpEntityBody,
                    timeout: 2000
                });
            break;
        }
        
    };

    EventSourceServerAdapter.prototype.publishSelection = function (protocolPayload) {
        if(!this.transporter){
            return this.servicer.constructor.publishToHub(protocolPayload.httpEntityBody)
        }

        var transportName = this.transporter.displayName

        switch(transportName){
            case "ajax": // jQuery ajax
                return transporter({
                    url: protocolPayload.httpUrl,
                    type: protocolPayload.httpMethod.toUpperCase(),
                    data: JSON.stringify(protocolPayload.httpEntityBody.selection),
                    contentType: protocolPayload.httpContentType,
                    processData: false,
                    timeout: 1000
                });
            break;
            case "axios": // Axios: https://github.com/axios/axios
                return transporter({
                    method: protocolPayload.httpMethod.toLowerCase(),
                    url: protocolPayload.httpUrl,
                    data: protocolPayload.httpEntityBody,
                    timeout: 1000
                });
            break;
        }
    };

})();