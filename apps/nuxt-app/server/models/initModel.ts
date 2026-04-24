import { DataTypes, Sequelize } from 'sequelize';
import _Users from './Users';
import _Files from './Files';
import _UserFile from './UserFile';

function initModels(sequelize: Sequelize) {
  const Users = _Users(sequelize, DataTypes);
  const Files = _Files(sequelize, DataTypes);
  const UserFile = _UserFile(sequelize, DataTypes);

  Files.hasMany(UserFile, { as: 'userFile', foreignKey: 'fileId' });
  UserFile.belongsTo(Files, { as: 'file', foreignKey: 'fileId' });

  return {
    Users,
    Files,
    UserFile,
  };
}

export default initModels;
export { initModels };
