class ItemDAO {

}

class Item {
    nome
    preço
    quantidade

    constructor(nome, preço, quantidade) {

        this.nome = nome
        this.preço = preço
        this.quantidade = quantidade
    }

    valorTotal() {
        return this.preço * this.quantidade
    }
}

