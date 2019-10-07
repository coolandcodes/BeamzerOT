/* ot global */

ot.ServerAdapter = (function (global) {
    function ServerAdapter (servicer){
        this.servicer = servicer
    }
    
  ServerAdapter.prototype.getAppOrigin = function () {
      return global.location.origin;
  }
    
  ServerAdapter.prototype.publishOperation = function (protocolPayload) {
    throw new Error('This method need to be implemented!');
  };

  ServerAdapter.prototype.publishSelection = function (protocolPayload) {
    throw new Error('This method needs to be implemented!');
  };

  ServerAdapter.prototype.setUpdateResponseHandler = function(handler){
        var servicerName = this.servicer.constructor.displayName

        switch(servicerName) {
            case "BeamzerClient": // See: https://github.com/isocroft/beamzer-client
                /*this.servicer.start(
                    function onOpen () {

                    }, 
                    function onError () {

                    },
                    function onMessage () {

                    }
                );*/

                this.servicer.on('operations', function(data){
                    if(!data.revision){
                        revision = {}
                    }

                    handler(data)
                }).on('clients', function(data){
                    if(!data.revision){
                        revision = {}
                    }

                    handler(data)
                }).on('actions', function(data){
                    if(!data.revision){
                        revision = {}
                    }

                    handler(data)
                })
            break;
            case "Pusher": // See: https://github.com/pusher/pusher-js
                /*this.servicer.connection.bind('connected', function onOpen(){

                })
                this.servicer.connection.bind('unavailable', function onError(){

                })
                this.servicer.connection.bind('failed', function onError(){

                })
                this.servicer.connection.bind('error', function onError(){

                })*/
                this.servicer.channel(this.servicer.constructor.otChannel).bind('operations', function(data){
                    if(!data.revision){
                        revision = {}
                    }

                    handler(data)
                });

                this.servicer.channel(this.servicer.constructor.otChannel).bind('clients', function(data){
                    if(!data.revision){
                        revision = {}
                    }

                    handler(data)
                });

                this.servicer.channel(this.servicer.constructor.otChannel).bind('actions', function(data){
                    if(!data.revision){
                        revision = {}
                    }

                    handler(data)
                });
            break;
        }
  };

  ServerAdapter.prototype.terminate = function(onClose){
      var servicerName = this.servicer.constructor.displayName

      switch(servicerName){
          case "BeamzerClient":
            this.servicer.stop(onClose);
          break;
          case "Pusher":
            this.servicer.connection.bind('disconnected', onClose)
            this.servicer.disconnect();
          break;
      }
  };

})(this);