import bcrypt from 'bcryptjs';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';

const SALT_ROUNDS = 10;

export interface UserAttributes {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  senha: string;
  role?: 'user' | 'admin';
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'role'> {}

export class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public nome!: string;
  public email!: string;
  public telefone!: string;
  public dataNascimento!: string;
  public senha!: string;
  public role!: 'user' | 'admin';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  
  public validPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.senha);
  }
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dataNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'data_nascimento',
    },

    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user: Users) => {
        user.senha = await bcrypt.hash(user.senha, SALT_ROUNDS);
      },
      beforeUpdate: async (user: Users) => {
        if (user.changed('senha')) {
          user.senha = await bcrypt.hash(user.senha, SALT_ROUNDS);
        }
      },
    },
  }
);
