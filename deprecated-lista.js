import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

class ItemDAO {
async insertItem(){

    const banco = await this.connectDB()

     banco.run(
        'INSERT INTO aluno (nome, email) VALUES (?, ?)', nome, email);

    banco.close()
}

async deleteItem(){

    const banco = await this.connectDB()

     banco.run(
        'DELETE FROM item WHERE id = ?',);

    banco.close()

}

async updateItem(){
    const banco = await this.connectDB()

     banco.run(
        'UPDATE item  SET nome = ?, preço = ?, quantidade = ?, WHERE id = ?',);

    banco.close()
}

async createItem(){
    const banco = await this.connectDB()

     banco.run(
        `CREATE TABLE IF NOT EXISTS item (id integer PRIMARY KEY autoincrement, 
    nome varchar(30),
    preço real,
    quantidade integer)`);

    banco.close()
}

async listItens(){
    const banco = await this.connectDB()

     let resultado = banco.all('SELECT * FROM item ');

    banco.close()

    return resultado
}

async getById(id){
const banco = await this.connectDB()

     let resultado = banco.get('SELECT * FROM item WHERE ');

    banco.close()

}

async connectDB(){
 const db = await open({
        filename: this.banco,
        driver: sqlite3.Database
    })
    return db
 }

banco
constructor (banco){
this.banco = banco 
}
}

class Item {
    nome;
    preço;
    quantidade;

    constructor(nome, preço, quantidade) {
        this.nome = nome;
        this.preço = preço;
        this.quantidade = quantidade;
    }

    valorTotal() {
        return this.preço * this.quantidade;
    }
}

