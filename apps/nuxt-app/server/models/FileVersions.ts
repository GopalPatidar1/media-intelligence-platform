import Sequelize from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  return FileVersions.init(sequelize, DataTypes);
};

class FileVersions extends Sequelize.Model {
  static init(sequelize: any, DataTypes: any) {
    return sequelize.define(
      'FileVersions',
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
        tableName: 'file_versions',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
