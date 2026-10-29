//so o bibliotecário pode ver os usuários ou excluir algum!

const Usuario = require('../models/Usuario');

const listar = async (req, res) => {
    try {
        const usuarios = await Usuario.listarTodos();
        return res.status(200).json(usuarios);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao buscar." });
    }
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const { email, perfil } = req.body; 

    try {
        const usuarioAlvo = await Usuario.encontrarPorId(id);

        if (!usuarioAlvo) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        if (usuarioAlvo.perfil === 'Leitor' && perfil && perfil !== 'Leitor') {
            return res.status(403).json({ erro: "Não é possível alterar o perfil de um leitor." });
        }

        await usuarioAlvo.atualizar(email, perfil);
        
        return res.status(200).json({ mensagem: "Dados atualizados com sucesso!" });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao atualizar." });
    }
};

const deletar = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.encontrarPorId(id);
        if (!usuario) {
            return res.status(404).json({ erro: "Utilizador não encontrado." });
        }

        await usuario.deletar();
        return res.status(200).json({ mensagem: "Usuário removido." });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao remover." });
    }
};

module.exports = { listar, atualizar, deletar };