import { Interface } from "./Interface.js";
import { ItemDAO } from "./ItemDAO.js";

async function main() {
        const i = new Interface(await ItemDAO.build('banco.db'));

        await i.start();
}

main();
