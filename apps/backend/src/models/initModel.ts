import { DataTypes, Sequelize } from 'sequelize';
import _Users from './Users';
import _Files from './Files';
import _UserFile from './UserFile';
import _FileVersions from './FileVersions';

function initModels(sequelize: Sequelize) {
  const Users = _Users(sequelize, DataTypes);
  const Files = _Files(sequelize, DataTypes);
  const UserFile = _UserFile(sequelize, DataTypes);
  const FileVersions = _FileVersions(sequelize, DataTypes);

  Files.hasMany(UserFile, { as: 'userFile', foreignKey: 'fileId' });
  UserFile.belongsTo(Files, { as: 'file', foreignKey: 'fileId' });

  Files.hasMany(FileVersions, { as: 'fileVersions', foreignKey: 'fileId' });
  FileVersions.belongsTo(Files, { as: 'file', foreignKey: 'fileId' });

  return {
    Users,
    Files,
    UserFile,
    FileVersions,
  };
}

export default initModels;
export { initModels };
