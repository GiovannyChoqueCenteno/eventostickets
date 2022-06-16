// export const login = (req,res)=>{
//     try {

//     } catch (error) {
//         res.status(500).send(error)
//     }
// }

import prisma from "../config/prisma"
import bcrypt from 'bcrypt'
import { createToken } from "../utils/user/userUtils"


export const addUsuario = async (req, res) => {
    try {

        const { email } = req.body
        const existeUsuario = await prisma.usuario.findFirst({
            where: {
                email
            }
        })
        if (existeUsuario) {
            const error = new Error("Email ya registrado");
            return res.status(400).json({
                msg: error.message
            })
        }
        //
        const newUsuario = req.body;
        const salt = await bcrypt.genSalt(10);
        newUsuario.password = await bcrypt.hash(newUsuario.password, salt);
        const usuario = await prisma.usuario.create({
            data: newUsuario
        })
        res.json({
            token: createToken(usuario, process.env.JWT_SECRET, '3h')
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

export const login = async (req, res) => {
    try {
        console.log(process.env.JWT_SECRET)
        const { email, password } = req.body
        const usuario = await prisma.usuario.findFirst({
            where: {
                email
            }
        })
        if (!usuario) {
            return res.status(404).json({
                msg: "El usuario no existe"
            })
        }
        const verificarPassword = await bcrypt.compare(password, usuario.password);
        if (!verificarPassword) {
            const error = new Error("El Password es Incorrecto");
            return res.status(403).json({ msg: error.message });
        }
        return res.json({
            token: createToken(usuario, process.env.JWT_SECRET, '3h')
        })
    } catch (error) {
        res.status(500).send(error)
    }
}