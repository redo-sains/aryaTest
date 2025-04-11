import {
    getPinjaman,
    createPinjaman,
    createPengembalian,
    deleteTransaksi,
    uploadImage,
    getPengembalian
} from '../controller/transaksiController.js'
import express from 'express'

const route = express.Router()

route.get('/peminjaman', getPinjaman)
route.get('/pengembalian', getPengembalian)
route.post('/peminjaman', uploadImage, createPinjaman)
route.patch('/pengembalian/:id', uploadImage, createPengembalian)
route.delete('/transaksi/:id', uploadImage, deleteTransaksi)

export default route