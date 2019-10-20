/*global ot */

ot.ConnectAdapter = (function () {
  'use strict';

  function ConnectAdapter (clientName, serverAdapter, revision) {
    // if (basePath[basePath.length - 1] !== '/') { basePath += '/'; }
    var that = this;

    that.path = '/hub/ot/';
    that.origin = "https://app.beamzer.co";
    that.ownUserName = clientName;
    that.majorRevision = revision.major || 0;
    that.minorRevision = revision.minor || 0;
    that.serverAdapter = serverAdapter;

    that.setup();
  }

  ConnectAdapter.prototype.renderRevisionUrl = function (suffix) {
    return this.origin + this.path + 'revision/' + this.getRevisionNumber() + suffix;
  };

  ConnectAdapter.prototype.getRevisionNumber = function(){
      return (this.majorRevision + '-' + this.minorRevision);
  }

  ConnectAdapter.prototype.handleUpdateResponse = function (data) {
        var i;
        var operations = data.operations;

        if(operations){
            for (i = 0; i < operations.length; i++) {
                if (operations[i].user === this.ownUserName) {
                    this.trigger('ack');
                } else {
                    this.trigger('operation', operations[i].operation);
                    // this.trigger('selection', operations[i].meta)
                }
            }
            if (operations.length > 0) {
                this.majorRevision += operations.length;
                this.minorRevision = 0;
            } 
        }

        var actions = data.actions;

        if (actions) {
            for (i = 0; i < actions.length; i++) {
                var user = actions[i].user;
                if (user === this.ownUserName) { continue; }
                switch (actions[i].event) {
                    case 'joined':    this.trigger('set_name', user, user); break; // self.trigger('set_name', clientId, name);
                    case 'left':      this.trigger('client_left', user); break; // self.trigger('client_left', clientId);
                    case 'selection': this.trigger('selection', user, actions[i].selection); break; // self.trigger('selection', clientId, selection);
                }
            }

            this.minorRevision += actions.length;
        }

        var clients = data.clients;
        
        if (clients) {
            delete clients[this.ownUserName];
            this.trigger('clients', clients);
        }

        if (data.revision.major) {
            this.majorRevision = data.revision.major;
        }

        if (data.revision.minor) {
            this.minorRevision = data.revision.minor;
        }
  };

  ConnectAdapter.prototype.setup = function () {
    var self = this;
    
    self.serverAdapter.setUpdateResponseHandler(function (data){
        self.handleUpdateResponse(data)
    })
  };

  ConnectAdapter.prototype.sendOperation = function (revision, operation, selection) {
    if (revision !== this.majorRevision) { throw new Error("Revision numbers out of sync"); }
    var self = this;

    self.serverAdapter.publishOperation({
        revision: revision,
        httpUrl:this.renderRevisionUrl(''),
        httpMethod:'POST',
        httpContentType: 'application/json',
        httpEntityBody: { operation: operation, selection: selection },
    }).then(function (data) {}, function () {
        setTimeout(function () { self.sendOperation(revision, operation, selection); }, 500);
    })
  };

  ConnectAdapter.prototype.sendSelection = function (selection) {
    var self = this;

    self.serverAdapter.publishSelection({
        httpUrl: this.renderRevisionUrl('/selection'),
        httpMethod:'POST',
        httpContentType: 'application/json',
        httpEntityBody: { selection: selection }
    })
  };

  ConnectAdapter.prototype.registerCallbacks = function (cb) {
    this.callbacks = cb;
  };

  ConnectAdapter.prototype.trigger = function (event) {
    var args = Array.prototype.slice.call(arguments, 1);
    var action = this.callbacks && this.callbacks[event];
    if (action) { action.apply(this, args); }
  };

  return ConnectAdapter;

})();
