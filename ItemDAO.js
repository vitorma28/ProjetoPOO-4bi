import { Item } from './Item.js';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';


export class ItemDAO {
	#banco;

	constructor (banco) {
		this.#banco = banco;
	}


	static async build(banco) {
		const dao = new ItemDAO(banco);

		await dao.createItemTable();

		return dao;
	}

	async insertItem(item) {
		const banco = await this.connectDB();

		await banco.run('INSERT INTO item (nome, preco, quantidade) VALUES (?, ?, ?)', item.nome, item.preco, item.quantidade);

		await banco.close();
	}

	async deleteItem(id) {
		const banco = await this.connectDB();

		await banco.run('DELETE FROM item WHERE id = ?', id);

		await banco.close();
	}

	async updateItem(id, nome, preco, quantidade) {
		const banco = await this.connectDB();

		await banco.run('UPDATE item SET nome = ?, preco = ?, quantidade = ? WHERE id = ?', nome, preco, quantidade, id);

		await banco.close();
	}

	async createItemTable() {
		const banco = await this.connectDB();

		const sql = `
CREATE TABLE IF NOT EXISTS item (
	id integer PRIMARY KEY autoincrement, 
	nome varchar(30),
	preco real,
	quantidade integer
)
		`;

		await banco.run(sql);

		await banco.close();
	}

	async listItens() {
		const banco = await this.connectDB();

		const linhas = await banco.all('SELECT * FROM item');

		await banco.close();

		let listaItens = [];

		for (const linha of linhas) {
			const item = new Item(linha.id, linha.nome, linha.preco, linha.quantidade);
			listaItens.push(item);
		}

		return listaItens;
	}

	async getById(id) {
		const banco = await this.connectDB();

		let itemCols = await banco.get('SELECT * FROM item WHERE id = ?', id);

		await banco.close();

		return new Item(itemCols.id, itemCols.nome, itemCols.preco, itemCols.quantidade);
	}

	async connectDB() {
		const db = await open({
			filename: this.#banco,
			driver: sqlite3.Database
		});

		return db;
	}
}
