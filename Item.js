export class Item {
    id = 0;
    nome = '';
    preço = 0.0;
    quantidade = 0;

    constructor(id, nome, preço, quantidade) {
        this.id = id;
        this.nome = nome;
        this.preço = preço;
        this.quantidade = quantidade;
    }

    valorTotal() {
        return this.preço * this.quantidade;
    }
}