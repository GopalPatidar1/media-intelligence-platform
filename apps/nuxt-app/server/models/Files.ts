import Sequelize from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  return Files.init(sequelize, DataTypes);
};

class Files extends Sequelize.Model {
  static init(sequelize: any, DataTypes: any) {
    return sequelize.define(
      'Files',
      {
        uid: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },

        fileName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'file_name',
        },

        fileType: {
          type: DataTypes.ENUM('image', 'video', 'pdf', 'doc', 'other'),
          allowNull: false,
          field: 'file_type',
        },

        fileUrl: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'file_url',
        },

        size: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },

        status: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },

        department: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },

        version: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          allowNull: false,
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
        tableName: 'files',
        timestamps: true,
        paranoid: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'uid' }],
          },
        ],
      }
    );
  }
}
