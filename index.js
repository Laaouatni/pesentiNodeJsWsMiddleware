"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logic_1 = require("./logic");
var node_process_1 = __importDefault(require("node:process"));
node_process_1.default.on('uncaughtException', function (err, origin) {
    console.log("restarto il server a causa dell'errore: ".concat(err));
});
console.log("print PRIMA di thisLogic... visualizzato con successo");
(0, logic_1.thisLogic)();
console.log("print DOPO di thisLogic... visualizzato con successo");
