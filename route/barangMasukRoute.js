import {
    getBarangMasuk,
    createBarangMasuk,
    deleteBarangMasuk
} from '../controller/barangMasukController.js'; 
import express from 'express';

const route = express.Router();

route.get('/barang-masuk', getBarangMasuk)
route.post('/barang-masuk', createBarangMasuk);
route.delete('/barang-masuk/:id', deleteBarangMasuk);

export default route;
