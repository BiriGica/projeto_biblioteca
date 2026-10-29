const db = require('../db/conn');

class Livro {
    constructor(id, titulo, autor, quantidade) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.quantidade = quantidade;
    }


    async salvar() {
        const [resultado] = await db.query(
            'INSERT INTO livros (titulo, autor, quantidade) VALUES (?, ?, ?)', 
            [this.titulo, this.autor, this.quantidade]
        );
        this.id = resultado.insertId;
        return this;
    }

    async deletar() {
        await db.query('DELETE FROM livros WHERE id = ?', [this.id]);
    }

    async decrementarEstoque() {
        if (this.quantidade > 0) {
            this.quantidade -= 1;
            await db.query('UPDATE livros SET quantidade = ? WHERE id = ?', [this.quantidade, this.id]);
        }
    }


    static async encontrarPorId(id) {
        const [linhas] = await db.query('SELECT * FROM livros WHERE id = ?', [id]);
        if (linhas.length === 0) return null;
        
        const r = linhas[0];
        return new Livro(r.id, r.titulo, r.autor, r.quantidade);
    }

    static async listarTodos() {
        const [linhas] = await db.query('SELECT * FROM livros');
        return linhas.map(r => new Livro(r.id, r.titulo, r.autor, r.quantidade));
    }
}

module.exports = Livro;