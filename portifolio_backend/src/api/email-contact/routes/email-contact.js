'use strict';

module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/email-contact',
        handler: 'email-contact.send',
      }
    ]
  }