import {
    getBarang,
    getBarangById,
    createBarang,
    updateBarang,
    deleteBarang,
    uploadImage
} from '../controller/barangController.js'
import express from 'express'

const route = express.Router()

route.get('/barang', getBarang)
route.get('/barang/:id', getBarangById)
route.post('/barang', uploadImage, createBarang)
route.patch('/barang/:id', uploadImage, updateBarang)
route.delete('/barang/:id', deleteBarang)

export default route