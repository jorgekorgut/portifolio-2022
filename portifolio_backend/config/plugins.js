module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          //defaultFrom: 'em2256@korgut.fr',
          //defaultReplyTo: 'em2256@korgut.fr',
          defaultFrom: 'no-reply@korgut.fr',
          efaultReplyTo: 'no-reply@korgut.fr',
          testAddress: 'jorge.korgut-junior@insa-lyon.fr',
        },
      },
    },
  }); 