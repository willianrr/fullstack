'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type:   Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey:    true
      },
      nome:            { type: Sequelize.STRING, allowNull: false },
      email:           { type: Sequelize.STRING, allowNull: false, unique: true },
      telefone:        { type: Sequelize.STRING, allowNull: false },
      data_nascimento: { type: Sequelize.DATEONLY, allowNull: false },
      senha:           { type: Sequelize.STRING, allowNull: false },
      role:            { type: Sequelize.ENUM('user','admin'), allowNull: false, defaultValue: 'user' },
      created_at:      { type: Sequelize.DATE, allowNull: false },
      updated_at:      { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down (queryInterface /* , Sequelize */) {
    await queryInterface.dropTable('users');
  }
};
