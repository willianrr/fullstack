'use strict';

const path   = require('path');
const bcrypt = require('bcrypt');

require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '.env')
});

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    const rawPassword = process.env.ADMIN_PASSWORD?.trim();
    if (!rawPassword) {
      throw new Error('A variável ADMIN_PASSWORD não está definida ou está vazia.');
    }

    const hash = await bcrypt.hash(rawPassword, SALT_ROUNDS);

    await queryInterface.bulkInsert('users', [
      {
        nome:            process.env.ADMIN_NAME    || 'Admin',
        email:           process.env.ADMIN_EMAIL   || 'admin@domain.com',
        telefone:        process.env.ADMIN_PHONE   || '+5511999999999',
        data_nascimento: process.env.ADMIN_DOB     || '1970-01-01',
        senha:           hash,
        role:            process.env.ADMIN_ROLE    || 'admin',
        created_at:      new Date(),
        updated_at:      new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@domain.com';
    await queryInterface.bulkDelete('users', {
      email: adminEmail
    }, {});
  }
};
