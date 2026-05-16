import { Item } from "./Item.js";
import { ItemDAO } from "./ItemDAO.js";
import PromptSync from 'prompt-sync';
const prompt = PromptSync();


export class Interface {
        sair = false;
        dao;

        constructor(dao) {
                this.dao = dao;
        }

        static async build(banco) {
                const i = new Interface(ItemDAO.build(banco));

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

        #opcoes(opcao) {
                switch (opcao) {
                        case 0: {
                                this.sair = true;

                                break;
                        }
                        case 1: {
                                break;
                        }
                        case 2: {
                                break;
                        }
                        case 3: {
                                break;
                        }
                        case 4: {
                                break;
                        }
                        case 5: {
                                break;
                        }
                }
        }

        #loop() {
                this.#menu();
                console.log();
                let opcao = prompt('> ');
                
                if (!/^\d+$/.test(opcao)) {
                        return;
                }

                opcao = parseInt(opcao);

                this.#opcoes(opcao);
        }

        start() {
                while (!this.sair) {
                        this.#loop();
                }
        }
}
