import express from "express";
import cors from "cors";
import path from "path";
import penggunaRoute from "./route/penggunaRoute.js";
import barangRoute from "./route/barangRoute.js";
import barangMasukRoute from "./route/barangMasukRoute.js";
import transaksiRoute from "./route/transaksiRoute.js";
import serverless from "serverless-http";

const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(penggunaRoute);
app.use(barangRoute);
app.use(barangMasukRoute);
app.use(transaksiRoute);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));