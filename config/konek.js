import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config(); 

const db = new Sequelize(
    'u443307867_inventaris',
    'u443307867_root',
  '5i+j$?HK0Jb&',
  {
    host: 'srv1758.hstgr.io',
    dialect: "mysql",
  }
);

export default db;
