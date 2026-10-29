const db = require('../db/conn');

const listar = async (req, res) => {
    try {
        const [livros] = await db.query('SELECT * FROM livros');
        return res.status(200).json(livros);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao buscar." });
    }
};

// só bibliotecario pode 
const adicionar = async (req, res) => {
    const { titulo, autor, quantidade } = req.body;

    try {
        await db.query('INSERT INTO livros (titulo, autor, quantidade) VALUES (?, ?, ?)', 
            [titulo, autor, quantidade] 
        );
        return res.status(201).json({ mensagem: "Livro adicionado!" });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao adicionar o livro." });
    }
};


const deletar = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM livros WHERE id = ?', [id]);
        return res.status(200).json({ mensagem: "Livro removido." });
    } catch (erro) {
        return res.status(500).json({ erro: "Não foi possível deletar." });
    }
};

module.exports = { listar, adicionar, deletar };