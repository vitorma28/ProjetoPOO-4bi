export class ItemDAO {
	#banco;

	constructor (banco){
		this.#banco = banco;
	}


	async insertItem(aluno){
		const banco = await this.connectDB();

		await banco.run('INSERT INTO aluno (nome, email) VALUES (?, ?)', nome, email);

		await banco.close();
	}

	async deleteItem(alunoId){
		const banco = await this.connectDB();

		await banco.run('DELETE FROM item WHERE id = ?',);

		await banco.close();
	}

	async updateItem(alunoId, ){
		const banco = await this.connectDB();

		await banco.run('UPDATE item  SET nome = ?, preço = ?, quantidade = ?, WHERE id = ?',);

		await banco.close();
	}

	async createItem(){
		const banco = await this.connectDB();

		const sql = `
CREATE TABLE IF NOT EXISTS item (
	id integer PRIMARY KEY autoincrement, 
	nome varchar(30),
	preço real,
	quantidade integer
)
		`;

		await banco.run(sql);

		await banco.close();
	}

	async listItens(){
		const banco = await this.connectDB();

		let resultado = await banco.all('SELECT * FROM item ');

		await banco.close();

		return resultado;
	}

	async getById(id){
		const banco = await this.connectDB();

		let resultado = await banco.get('SELECT * FROM item WHERE ');

		await banco.close();
	}

	async connectDB(){
		const db = await open({
			filename: this.#banco,
			driver: sqlite3.Database
		});

		return db;
	}
}