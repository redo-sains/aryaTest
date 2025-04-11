import BarangMasuk from "../model/barangMasukModel.js";
import Barang from "../model/barangModel.js";

export const getBarangMasuk = async (req, res) => {
    try {
        const response = await BarangMasuk.findAll({
            order: [['nama_barang', 'ASC']] 
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const createBarangMasuk = async (req, res) => {
    const { id_barang, jumlah_masuk } = req.body;

    try {
        const barangMasuk = await BarangMasuk.create(req.body);
        const barang = await Barang.findByPk(id_barang);
        
        if (!barang) {
            return res.status(404).json({ msg: "Barang tidak ditemukan" });
        }

        barang.stok += jumlah_masuk;

        await barang.save();

        res.status(201).json({ msg: "Barang Masuk Dibuat dan Stok Diperbarui", data: barangMasuk });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const deleteBarangMasuk = async (req, res) => {
    try {
        const barang = await BarangMasuk.findByPk(req.params.id);
        if (!barang) {
            return res.status(404).json({ msg: "Barang tidak ditemukan" });
        }

        await BarangMasuk.destroy({
            where: { id_barang_masuk: req.params.id },
        });

        res.status(200).json({ msg: "Barang dihapus" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
