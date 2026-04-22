import { DataTypes, Sequelize } from "sequelize";
import _Users from "./Users";
import _Files from "./Files";
import _UserFile from "./UserFile";

function initModels(sequelize: Sequelize) {
  const Users = _Users(sequelize, DataTypes);
  const Files = _Files(sequelize, DataTypes);
  const UserFile = _UserFile(sequelize, DataTypes);

  return {
    Users,
    Files,
    UserFile,
  };
}

export default initModels;
export { initModels };
