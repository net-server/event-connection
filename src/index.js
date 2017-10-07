/* eslint no-invalid-this: off */
/* eslint consistent-this: off */

'use strict';

/**
 * Class: net.Server
 * Event: 'connection'
 * <net.Socket> The connection object
 *
 * Emitted when a new connection is made. socket is an instance of net.Socket.
 * @link https://nodejs.org/dist/latest-v6.x/docs/api/net.html#net_class_net_socket
 * @link https://nodejs.org/dist/latest-v6.x/docs/api/net.html#net_event_connection
 *
 * @param {net.Socket} socket
 * @param {Function} socket.address
 * @param {Function} socket.on
 * @param {string} socket.remoteAddress
 * @param {number} socket.remotePort
 *
 * @returns {undefined}
 */
function connectionEvent( socket ) {
  var key = socket.remoteAddress + ':' + socket.remotePort;
  var Server = this;

  if ( !Server.sockets ) {
    Server.sockets = {};
  }

  Server.sockets[ key ] = socket;

  if ( Server.debug ) {
    console.log( '[info]', new Date(), 'net.Server connection', 'on socket', key );
  }

  socket.on(
    'close',
    function removeSocketKey() {
      delete Server.sockets[ key ];

      if ( Server.debug ) {
        console.log( '[info]', new Date(), 'net.Server connection, socket', key, 'closed and removed from Server.sockets' );
      }
    }
  );
}

module.exports = connectionEvent;
