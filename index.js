import { Interface } from "./Interface.js";

async function main() {
        const i = await Interface.build('banco.db');

        i.start();
}

main();
