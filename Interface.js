import { Item } from "./Item.js";
import { ItemDAO } from "./ItemDAO.js";
import colors from 'colors/safe.js';
import PromptSync from 'prompt-sync';
const prompt = PromptSync();


export class Interface {
        sair = false;
        #errormsg = colors.bold(colors.red('Opção inválida.'));
        dao;

        constructor(dao) {
                this.dao = dao;
        }

        static async build(banco) {
                const i = new Interface(await ItemDAO.build(banco));

                return i;
        }


        #menu() {
                const menu =
`/---
| 0. Sair do programa.
| 1. Lista todas as compras.
| 2. Acessar uma compra específica.
| 3. Atualizar uma compra.
| 4. Inserir novo item.
| 5. Remover item.
\\---`
                ;
                console.log(menu);
        }

        #listarTodos(){
                let lista = await this.dao.listItens()

                for(let i=0; i<lista.length; i++){
                        let item = lista[i]
                        console.log("id: ", item.id )
                        console.log("nome: ", item.nome )
                        console.log("preco: ", item.preco )
                        console.log("quantidade: ", item.quantidade )
                        console.log()
                }
        }

        #acessarItem(){
                let id = parseInt(prompt("Digite o id: "))
                let item = await this.dao.getById()

                console.log("id: ", item.id )
                console.log("nome: ", item.nome )
                console.log("preco: ", item.preco )
                console.log("quantidade: ", item.quantidade )
                console.log()

                
        }

        #atualizarItem(){

        }

        #inserirItem(){
             let nome = prompt("Nome: ")  
             let preco = parseFloat(prompt("Preço: "))
             let quantidade = parseInt(prompt("Quantidade: "))

             let item = new Item(null, nome, preco, quantidade)

             await this.dao.insertItem(item)
        }
        
        #removerItem(){
                let id = parseInt(prompt("Digite o id: "))
                await this.dao.deleteItem(id)
        }





        #opcoes(opcao) {
                switch (opcao) {
                        case 0: {
                                this.sair = true;

                                break;
                        }
                        case 1: {
                                this.#listarTodos()
                                break;
                        }
                        case 2: {
                                this.#acessarItem()
                                break;
                        }
                        case 3: {
                                this.#atualizarItem()
                                break;
                        }
                        case 4: {
                                this.#inserirItem()
                                break;
                        }
                        case 5: {
                                this.#removeItem()
                                break;
                        }
                }
        }

        #loop() {
                this.#menu();
                console.log();
                let opcao = prompt('> ').trim();
                
                if (!/^\d+$/.test(opcao)) {
                        console.log(this.#errormsg);
                        return;
                }

                opcao = parseInt(opcao);

                if (opcao < 0 || opcao > 5) {
                        console.log(this.#errormsg);
                        return;
                }

                this.#opcoes(opcao);
        }

        start() {
                while (!this.sair) {
                        this.#loop();
                }
        }
}
