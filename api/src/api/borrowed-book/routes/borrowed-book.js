'use strict';

/**
 * borrowed-book router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::borrowed-book.borrowed-book');
