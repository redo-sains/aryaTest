import Barang from "../model/barangModel.js";
import multer from "multer";

const storage = multer.memoryStorage();
export const uploadImage = multer({ storage }).single("gambar");

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
        const barang = await Barang.findOne({
            where: { id_barang: req.params.id }
        });

        if (!barang) {
            return res.status(404).json({ msg: "Barang tidak ditemukan" });
        }

        const responseData = {
            ...barang.dataValues,
            gambar: barang.gambar
                ? `data:image/jpeg;base64,${barang.gambar.toString("base64")}`
                : null,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const createBarang = async (req, res) => {
    try {
        let gambarBuffer = null;
        if (req.file) {
            gambarBuffer = req.file.buffer;
        }

        await Barang.create({
            ...req.body,
            gambar: gambarBuffer
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

        let gambarBaru = barang.gambar;

        if (req.file) {
            gambarBaru = req.file.buffer; 
        }

        await Barang.update(
            { ...req.body, gambar: gambarBaru },
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

        await Barang.destroy({
            where: { id_barang: req.params.id },
        });

        res.status(200).json({ msg: "Barang dihapus" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};