const db = require('../db/conn');

//leitor que solicita!!! Algum livro qeu veio do banco.
const solicitar = async (req, res) => {
    const { livro_id } = req.body;
    const usuario_id = req.usuario.id; 

try {
        const livro = await Livro.encontrarPorId(livro_id);
        
        if (!livro || livro.quantidade <= 0) {
            return res.status(400).json({ erro: "Livro indisponível." });
        }

        const novoEmprestimo = new Emprestimo(null, usuario_id, livro.id, null);
        await novoEmprestimo.salvar();

        await livro.decrementarEstoque();

        return res.status(201).json({ mensagem: "Empréstimo realizado." });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao realizar o empréstimo." });
    }
};

module.exports = { solicitar };