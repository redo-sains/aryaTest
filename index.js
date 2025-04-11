import express from "express"
import cors from "cors"
import path from "path"; 
import penggunaRoute from "./route/penggunaRoute.js"
import barangRoute from "./route/barangRoute.js"
import barangMasukRoute from "./route/barangMasukRoute.js"
import transaksiRoute from "./route/transaksiRoute.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use('/gambar', express.static(path.resolve('gambar'))); 

app.use(penggunaRoute)
app.use(barangRoute)
app.use(barangMasukRoute)
app.use(transaksiRoute)

app.listen(5000, ()=>{
    console.log("Web berjalan di port 5000");
})