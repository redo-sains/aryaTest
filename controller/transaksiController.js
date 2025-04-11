import Transaksi from "../model/transaksiModel.js";
import Barang from "../model/barangModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "gambar/transaksi");
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const fileName = originalName.replace(/\s+/g, '_'); 
        const extname = path.extname(originalName); 
        cb(null, fileName + extname);
    },
});

const upload = multer({ storage: storage });
export const uploadImage = upload.single("gambar");

export const getPinjaman = async (req, res) => {
    try {
        const response = await Transaksi.findAll({
            where: { status: "pinjam" }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getPengembalian = async (req, res) => {
    try {
        const response = await Transaksi.findAll({
            where: { status: "kembali" }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const createPinjaman = async (req, res) => {
    const { id_barang, jumlah_pinjam } = req.body;
    try {
        const barang = await Barang.findByPk(id_barang);

        if (!barang) {
            return res.status(404).json({ message: "Barang tidak ditemukan" });
        }

        if (jumlah_pinjam > barang.stok) {
            return res.status(400).json({ message: "Jumlah pinjaman melebihi stok yang tersedia" });
        }

        let gambarPath = "";
        if (req.file) {
            gambarPath = req.file.filename;
        }

        barang.stok -= jumlah_pinjam;
        await barang.save();

        await Transaksi.create({
            ...req.body,
            gambar: gambarPath
        });

        res.status(201).json({ msg: "Transaksi Dibuat" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};


export const createPengembalian = async (req, res) => {
    try {
        const transaksi = await Transaksi.findOne({
            where: { id_transaksi: req.params.id }
        });

        if (!transaksi) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        }

        if (transaksi.status === "kembali") {
            return res.status(400).json({ message: "Barang sudah dikembalikan" });
        }

        const barang = await Barang.findByPk(transaksi.id_barang);
        if (!barang) {
            return res.status(404).json({ message: "Barang tidak ditemukan" });
        }

        await transaksi.update({
            status: "kembali",
            tanggal_kembali: new Date()
        });

        barang.stok += transaksi.jumlah_pinjam;
        await barang.save();

        res.status(200).json({ message: "Barang berhasil dikembalikan" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Terjadi kesalahan saat mengembalikan barang" });
    }
};

export const deleteTransaksi = async (req, res) => {
    try {
        const transaksi = await Transaksi.findByPk(req.params.id);
        if (!transaksi) {
            return res.status(404).json({ msg: "Transaksi tidak ditemukan" });
        }

        if (transaksi.gambar) {
            fs.unlinkSync(`gambar/transaksi/${transaksi.gambar}`);
        }

        await Transaksi.destroy({
            where: { id_transaksi: req.params.id },
        });

        res.status(200).json({ msg: "Barang dihapus" }); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};


