module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
  },
  'strapi::poweredBy',
  {
    name: 'strapi::cors',
    config: {
      credentials: true,
      origin: ['*','localhost:3000'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    }
  },
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
