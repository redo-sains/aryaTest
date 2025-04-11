import { DATE, Sequelize } from "sequelize";
import db from "../config/konek.js";

const { DataTypes } = Sequelize

const Pengguna = db.define('tb_pengguna',{
    id_pengguna: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW, 
    }
},{
    tableName: 'tb_pengguna',
    timestamps: false
})

export default Pengguna;