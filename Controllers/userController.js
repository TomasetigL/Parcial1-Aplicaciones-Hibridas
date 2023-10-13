const userModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const salt = 10;



exports.crear = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Faltan campos' });
        }

        const passHash = await bcrypt.hash(password, salt);
        const userNew = new userModel({
            name: name,
            email: email,
            password: passHash
        });
        await userNew.save();

        res.status(201).json({
            msg: 'Usuario Guardado',
            id: userNew._id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}





exports.actualizar = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, email, password } = req.body; 

     
        if (!name && !email && !password) {
            return res.status(400).json({ msg: 'Debes proporcionar al menos un campo para actualizar' });
        }

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const passHash = await bcrypt.hash(password, salt);
            user.password = passHash;
        }

        await user.save(); 

        res.status(200).json({ msg: 'Usuario actualizado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id); 

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        await user.remove(); 
        res.status(200).json({ msg: 'Usuario eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}
