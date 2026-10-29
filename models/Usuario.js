const db = require('../db/conn');

class Usuario {

    constructor(id, email, senha, perfil) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.perfil = perfil;
    }


    async salvar() {
        const [resultado] = await db.query(
            'INSERT INTO usuarios (email, senha, perfil) VALUES (?, ?, ?)', 
            [this.email, this.senha, this.perfil]
        );
        this.id = resultado.insertId; 
        return this;
    }

    async atualizar(novoEmail, novoPerfil) {
        this.email = novoEmail || this.email;
        this.perfil = novoPerfil || this.perfil;

        await db.query(
            'UPDATE usuarios SET email = ?, perfil = ? WHERE id = ?', 
            [this.email, this.perfil, this.id]
        );
        return this;
    }

    async deletar() {
        await db.query('DELETE FROM usuarios WHERE id = ?', [this.id]);
    }


    static async encontrarPorEmail(email) {
        const [linhas] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (linhas.length === 0) return null;
        
        const row = linhas[0];
        return new Usuario(row.id, row.email, row.senha, row.perfil); 
    }

    static async encontrarPorId(id) {
        const [linhas] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (linhas.length === 0) return null;
        
        const row = linhas[0];
        return new Usuario(row.id, row.email, row.senha, row.perfil);
    }

    static async listarTodos() {
        const [linhas] = await db.query('SELECT id, email, perfil FROM usuarios');

        return linhas.map(row => new Usuario(row.id, row.email, null, row.perfil));
    }
}

module.exports = Usuario                                        ;