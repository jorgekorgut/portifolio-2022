'use strict';

/**
 * gratification service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gratification.gratification');
