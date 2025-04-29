'use strict';

const bcrypt = require('bcrypt');
require('dotenv').config();

const SALT_ROUNDS = 10;

module.exports = {
  async up (queryInterface) {
    const plain = process.env.ADMIN_PASSWORD;
    const hash  = await bcrypt.hash(plain, SALT_ROUNDS);

    await queryInterface.bulkInsert('users', [
      {
        nome:            process.env.ADMIN_NAME    || 'Admin',
        email:           process.env.ADMIN_EMAIL   || 'admin@domain.com',
        telefone:        process.env.ADMIN_PHONE   || '+5511999999999',
        data_nascimento: process.env.ADMIN_DOB     || '1970-01-01',
        senha:           hash,
        role:            'admin',
        created_at:      new Date(),
        updated_at:      new Date()
      }
    ], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: process.env.ADMIN_EMAIL
    }, {});
  }
};
