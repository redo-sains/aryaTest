import Barang from "../model/barangModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "gambar/barang");
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

export const getBarang = async (req, res) => {
    try {
        const response = await Barang.findAll({
            order: [['nama_barang', 'ASC']] 
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getBarangById = async (req, res) => {
    try {
        const response = await Barang.findOne({
            where: { id_barang: req.params.id }
        });

        if (!response) {
            return res.status(404).json({ msg: "Barang tidak ditemukan" });
        }

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};


export const createBarang = async (req, res) => {
    try {
        let gambarPath = "";
        if (req.file) {
            gambarPath = req.file.filename;
        }

        await Barang.create({
            ...req.body,
            gambar: gambarPath
        });

        res.status(201).json({ msg: "Barang Dibuat" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const updateBarang = async (req, res) => {
    try {
        const barang = await Barang.findByPk(req.params.id);
        if (!barang) {
            return res.status(404).json({ msg: "Barang tidak ditemukan" });
        }

        let gambarPath = barang.gambar;

        if (req.file) {
            if (barang.gambar) {
                fs.unlinkSync(`gambar/barang/${barang.gambar}`);
            }
            gambarPath = req.file.filename;
        }

        await Barang.update(
            { ...req.body, gambar: gambarPath },
            { where: { id_barang: req.params.id } }
        );

        res.status(200).json({ msg: "Barang diperbarui" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const deleteBarang = async (req, res) => {
    try {
        const barang = await Barang.findByPk(req.params.id);
        if (!barang) {
            return res.status(404).json({ msg: "Barang tidak ditemukan" });
        }

        if (barang.gambar) {
            fs.unlinkSync(`gambar/barang/${barang.gambar}`);
        }

        await Barang.destroy({
            where: { id_barang: req.params.id },
        });

        res.status(200).json({ msg: "Barang dihapus" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};