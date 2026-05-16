import { ItemDAO } from "./ItemDAO.js";
import { Item } from "./Item.js";


async function test1() {
        try {
                const dao = await ItemDAO.build('banco.db');

                const item1 = new Item(10, 'qualquer coisa', 15, 2);

                await dao.insertItem(item1);
        }
        catch (err) {
                console.log(err);
        }
}

test1();
