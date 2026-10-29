const db = require('../db/conn');

class Emprestimo {
    constructor(id, usuario_id, livro_id, data_emprestimo) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.livro_id = livro_id;
        this.data_emprestimo = data_emprestimo;
    }

    async salvar() {
        const [resultado] = await db.query(
            'INSERT INTO emprestimos (usuario_id, livro_id, data_emprestimo) VALUES (?, ?, NOW())', 
            [this.usuario_id, this.livro_id]
        );
        this.id = resultado.insertId;
        return this;
    }
}       

module.exports = Emprestimo;