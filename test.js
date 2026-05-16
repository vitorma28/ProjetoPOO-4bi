import { ItemDAO } from "./ItemDAO.js";
import { Item } from "./Item.js";


async function test1() {
        try {
                const dao = await ItemDAO.build('banco.db');

                const item1 = new Item(10, 'qualquer coisa', 15, 2);

                await dao.insertItem(item1);

                console.log(await dao.listItens());

                console.log(await dao.getById(1));

                await dao.updateItem(1, 'Tesouras', 150, 3);

                console.log(await dao.listItens());
                
                await dao.deleteItem(1);
                
                console.log(await dao.listItens());
        }
        catch (err) {
                console.log(err);
        }
}

test1();
