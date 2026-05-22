import Sequelize from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  return UserFile.init(sequelize, DataTypes);
};
class UserFile extends Sequelize.Model {
  static init(sequelize: any, DataTypes: any) {
    return sequelize.define(
      'UserFile',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'user_id',
          references: { model: 'users', key: 'uid' },
        },

        fileId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'file_id',
          references: { model: 'files', key: 'uid' },
        },

        action: {
          type: DataTypes.STRING,
          defaultValue: 'uploaded',
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
        tableName: 'user_file',
        timestamps: true,
        paranoid: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'userId',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
          {
            name: 'fileId',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'file_id' }],
          },
        ],
      }
    );
  }
}
