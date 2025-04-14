import { thisLogic } from "./logic";

import process from 'node:process';

process.on('uncaughtException', (err, origin) => {
  console.log(`restarto il server a causa dell'errore: ${err}`);
});

console.log("print PRIMA di thisLogic... visualizzato con successo");

thisLogic();

console.log("print DOPO di thisLogic... visualizzato con successo");