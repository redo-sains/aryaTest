import {
    getPengguna,
    login
} from '../controller/penggunaController.js'
import express from 'express'

const route = express.Router()

route.get('/pengguna', getPengguna)
route.post('/login', login)

export default route