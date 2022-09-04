const { createCoreController } = require('@strapi/strapi').factories;

module.exports = {
    
    async send(ctx) {
        const msg = {
            to: ctx.request.body.to, // Change to your recipient
            from: 'jorge.korgut-junior@insa-lyon.fr', // Change to your verified sender
            subject: ctx.request.body.subject,
            text: ctx.request.body.text,
          }
    },
  };
  