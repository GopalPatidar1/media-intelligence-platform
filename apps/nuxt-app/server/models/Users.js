import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
  return Users.init(sequelize, DataTypes);
};

class Users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "Users",
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
        },

        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "member",
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "created_at",
          validate: { isDate: true },
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "updated_at",
          validate: { isDate: true },
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "deleted_at",
          validate: { isDate: true },
        },
      },
      {
        tableName: "users",
        timestamps: true,
        paranoid: true,
      },
    );
  }
}
