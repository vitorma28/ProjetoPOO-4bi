import { Item } from "./Item.js";
import colors from 'colors/safe.js';
import PromptSync from 'prompt-sync';
const prompt = PromptSync();


export class Interface {
        sair = false;
        dao;

        constructor(dao) {
                this.dao = dao;
        }


        #menu() {
                const menu =
`╔═ Gerenciador de compras ═════════
║ 0. Sair do programa.
║ 1. Lista todas as compras.
║ 2. Acessar uma compra específica.
║ 3. Atualizar uma compra.
║ 4. Inserir novo item.
║ 5. Remover item.
╚═══`
                ;
                console.log(menu);
        }

        async #listarTodos(){
                const lista = await this.dao.listItens();

                if (lista.length == 0) {
                        console.log(colors.yellow('Não há itens a listar.'));

                        return;
                }

                for(let i = 0; i < lista.length; i++){
                        const item = lista[i];

                        console.table({
                                Id: item.id.toString(),
                                Nome: item.nome,
                                Preço: `R$ ${item.preco.toFixed(2)}`,
                                Qtd: item.quantidade.toString(),
                                "Valor total": `R$ ${item.valorTotal().toFixed(2)}`
                        });
                }
        }

        async #acessarItem(){
                const id = parseInt(prompt("Digite o id: ").trim());
                const item = await this.dao.getById(id);

                if (!item) {
                        console.log(colors.red(`Compra ${id} não existe.`));

                        return;
                }

                console.table({
                        Id: item.id.toString(),
                        Nome: item.nome,
                        Preço: `R$ ${item.preco.toFixed(2)}`,
                        Qtd: item.quantidade.toString(),
                        "Valor total": `R$ ${item.valorTotal().toFixed(2)}`
                });
        }

        async #atualizarItem(){
                const id = parseInt(prompt('Digite o id: ').trim());

                // Verificar se o ID existe.

                const item = await this.dao.getById(id);

                if (!item) {
                        console.log(colors.red(`A compra ${id} não existe.`));

                        return;
                }

                console.log(colors.yellow('[ATENÇÃO]'), 'Digite os novos valores, ou deixe vazio para manter, os seguintes atributos:\n');
                
                let nome = prompt('Nome: ').trim();
                let preco = parseFloat(prompt('Preço: ').trim());
                let quantidade = parseInt(prompt('Quantidade: ').trim());

                nome ||= item.nome;
                preco ||= item.preco;
                quantidade ||= item.quantidade;

                await this.dao.updateItem(id, nome, preco, quantidade);
        }

        async #inserirItem(){
             const nome = prompt("Nome: ").trim();
             const preco = parseFloat(prompt("Preço: ").trim());
             const quantidade = parseInt(prompt("Quantidade: ").trim());

             const item = new Item(null, nome, preco, quantidade);

             await this.dao.insertItem(item);
        }
        
        async #removerItem(){
                const id = parseInt(prompt("Digite o id: ").trim());
                
                const item = await this.dao.getById(id);

                if (!item) {
                        console.log(colors.red(`Compra ${id} não existe.`));

                        return;
                }

                await this.dao.deleteItem(id);
        }

        async #opcoes(opcao) {
                switch (opcao) {
                        case 0: {
                                this.sair = true;

                                break;
                        }

                        case 1: {
                                await this.#listarTodos()
                                break;
                        }
                        
                        case 2: {
                                await this.#acessarItem()
                                break;
                        }
                        
                        case 3: {
                                await this.#atualizarItem()
                                break;
                        }
                        
                        case 4: {
                                await this.#inserirItem()
                                break;
                        }
                        
                        case 5: {
                                await this.#removerItem()
                                break;
                        }
                }
        }

        async #loop() {
                this.#menu();
                console.log();

                let opcao = prompt(colors.blue('OPÇÃO> ')).trim();
                
                if (!/^\d+$/.test(opcao)) {
                        console.log(colors.red('Opção inválida.'));
                        return;
                }

                opcao = parseInt(opcao);

                if (opcao < 0 || opcao > 5) {
                        console.log(colors.red('Opção inválida.'));
                        return;
                }

                const nomeOpcoes = [
                        'Sair',
                        'Listar',
                        'Acessar',
                        'Atualizar',
                        'Inserir',
                        'Remover'
                ];

                console.log('Opção:', colors.green(nomeOpcoes[opcao]));

                await this.#opcoes(opcao);
        }

        async start() {
                while (!this.sair) {
                        await this.#loop();
                }
        }
}
