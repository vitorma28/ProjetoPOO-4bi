export class Item {
    id = 0;
    nome = '';
    preco = 0.0;
    quantidade = 0;

    constructor(id, nome, preco, quantidade) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    valorTotal() {
        return this.preco * this.quantidade;
    }
}