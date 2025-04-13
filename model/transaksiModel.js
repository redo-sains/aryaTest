import { Sequelize } from "sequelize";
import db from "../config/konek.js";

const { DataTypes } = Sequelize;

const Transaksi = db.define('tb_transaksi', {
    id_transaksi: {
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
    tanggal_pinjam: {
        type: DataTypes.DATE,
    },
    tanggal_kembali: {
        type: DataTypes.DATE,
    },
    nama_peminjam: {
        type: DataTypes.INTEGER,
    },
    jumlah_pinjam: {
        type: DataTypes.INTEGER,
    },
    jenis: {
        type: DataTypes.STRING,
    },
    merk: {
        type: DataTypes.STRING,
    },
    keterangan: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.STRING,
    },
    kondisi: {
        type: DataTypes.STRING,
    },
    gambar: {
        type: DataTypes.BLOB('long')
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW, 
    }
},{
    tableName: 'tb_transaksi',
    timestamps: false
});

export default Transaksi;
