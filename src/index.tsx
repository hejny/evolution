import { App } from './App';

main();


async function main() {



    const app = new App(document.getElementById('root') as HTMLDivElement);
    app.run();
}
