import Pengguna from "../model/penggunaModel.js";

export const getPengguna = async (req, res) => {
    try {
        const response = await Pengguna.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const pengguna = await Pengguna.findOne({
            where: { email }
        });

        if (!pengguna) {
            return res.status(404).json({ msg: "Email Salah!" }); 
        }

        if (password !== pengguna.password) {
            return res.status(401).json({ msg: "Password salah" }); 
        }

        res.status(200).json({
            msg: "Login berhasil",
            pengguna: {
                id: pengguna.id_pengguna,
                nama: pengguna.nama
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message }); 
    }
};
