import { Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';

export async function login(req: Request, res: Response) {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ error: 'Correo y contraseña requeridos' });
    }

    const user = await Usuario.findOne({ where: { correo } });
    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }


    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) {
        return res.status(401).json({ error: 'Credenciales inválida' });
    }

    req.session.user = {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
    };

    res.status(200).json({ mensaje: 'Login exitoso', usuario: user.nombre });
}
