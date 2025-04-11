import { Sequelize } from "sequelize";
import db from "../config/konek.js";

const { DataTypes } = Sequelize;

const BarangMasuk = db.define("tb_barang_masuk", {
    id_barang_masuk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_barang: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_barang', 
            key: 'id_barang',   
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
    },
    nama_barang: {
        type: DataTypes.STRING,
    },
    kode_barang: {
        type: DataTypes.STRING,
    },
    jenis: {
        type: DataTypes.STRING,
    },
    merk: {
        type: DataTypes.STRING,
    },
    tanggal_masuk: {
        type: DataTypes.DATE,
    },
    tahun_pengadaan: {
        type: DataTypes.INTEGER,
    },
    jumlah_masuk: {
        type: DataTypes.INTEGER,
    },
    keterangan: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: "tb_barang_masuk",
    timestamps: false,
});

export default BarangMasuk;