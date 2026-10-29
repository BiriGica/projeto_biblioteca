const db = require('../db/conn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    const { email, senha } = req.body;

try {
        const usuario = await Usuario.encontrarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({ mensagem: "Usuárrro não encontrado." });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha incorreta." });
        }

        const token = jwt.sign(
            { id: usuario.id, perfil: usuario.perfil },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            mensagem: "Login realizado.",
            perfil: usuario.perfil,
            token: token
        });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao realizar o login." });
    }
};

const registo = async (req, res) => {
    const { email, senha, perfil } = req.body;

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        
        const novoUsuario = new Usuario(null, email, senhaCriptografada, perfil);
        
        await novoUsuario.salvar();
        
        return res.status(201).json({ mensagem: "Registo realizado." });
    } catch (erro) {
        return res.status(400).json({ mensagem: "Erro ao registar." });
    }
};

module.exports = { login, registo };