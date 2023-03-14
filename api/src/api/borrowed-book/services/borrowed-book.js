'use strict';

/**
 * borrowed-book service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::borrowed-book.borrowed-book');
