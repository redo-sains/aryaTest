import { Sequelize } from "sequelize";
import db from "../config/konek.js";

const { DataTypes } = Sequelize

const Barang = db.define('tb_barang',{
    id_barang: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama_barang: {
        type: DataTypes.STRING,
    },
    kode_barang: {
        type: DataTypes.STRING,
    },
    stok: {
        type: DataTypes.INTEGER,
    },
    jenis: {
        type: DataTypes.STRING,
    },
    merk: {
        type: DataTypes.STRING,
    },
    tahun_pengadaan: {
        type: DataTypes.INTEGER,
    },
    kondisi: {
        type: DataTypes.STRING,
    },
    gambar: {
        type: DataTypes.BLOB('long'),
    },
    keterangan: {
        type: DataTypes.TEXT,
    },
},{
    tableName: 'tb_barang',
    timestamps: false
})

export default Barang;