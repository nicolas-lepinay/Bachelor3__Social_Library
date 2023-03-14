'use strict';

/**
 * borrowed-book controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::borrowed-book.borrowed-book');
