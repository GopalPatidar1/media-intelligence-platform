import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default (sequelize: any, DataTypes: any) => {
  return Users.init(sequelize, DataTypes);
};

class Users extends Sequelize.Model {
  static init(sequelize: any, DataTypes: any) {
    return sequelize.define(
      'Users',
      {
        uid: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },

        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },

        password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(this: Model, value: string) {
            this.setDataValue('password', bcryptjs.hashSync(value, 10));
          },
        },

        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'member',
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: 'created_at',
          validate: { isDate: true },
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: 'updated_at',
          validate: { isDate: true },
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'deleted_at',
          validate: { isDate: true },
        },
      },
      {
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'uid' }],
          },
          {
            name: 'email',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'email' }],
          },
        ],
      }
    );
  }
}
