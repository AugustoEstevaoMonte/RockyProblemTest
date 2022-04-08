/**
 * @author: Augusto Estevão Monte
 * @version: 1.0
 * @date 07/04/2022
 */


const fs = require('fs');


function readCorruptedJson() {
  const data = fs.readFileSync('broken-database.json');
  const json = JSON.parse(data);
  return json;
}
/**
 * Documentação: https://stackoverflow.com/questions/2116558/fastest-method-to-replace-all-instances-of-a-character-in-a-string
 * @param {*} json 
 * @returns um objeto JSON com os nomes corrigidos, substituindo todas as ocorrencias de "æ" por "a", "¢" por "c", "ø" por "o", "ß" por "b"
 */
function fixAllJsonNames(json) {
  for (let i = 0; i < json.length; i++) {
    json[i].name = json[i].name.replace(/ø/g, 'o');
    json[i].name = json[i].name.replace(/¢/g, 'c');
    json[i].name = json[i].name.replace(/æ/g, 'a');
    json[i].name = json[i].name.replace(/ß/g, 'b');

  }
  return json;
}

/**
 * 
 * @param {*} json 
 * @returns um objeto JSON com os preços transformados de string para float
 */
function fixAllJsonPrices(json) {
  for (let i = 0; i < json.length; i++) {
    json[i].price = parseFloat(json[i].price);
  }
  return json;
}

/**
 * 
 * @param {*} json 
 * @returns um objeto JSON que inclui a "quantity" em produtos que não existem essa categoria
 * Exemplo: {id: 1, name: "A", price: 1.99, quantity: 0}
 * Também valida se a quantidade não é nula substituindo por 0
 */

function fixAllJsonQuantity(json) {
  for (let i = 0; i < json.length; i++) {
    if (json[i].quantity == null) {
      json[i].quantity = 0;
    }
    json[i].quantity = parseInt(json[i].quantity);
  }
  return json;
}

/**
 * 
 * @param {*} json 
 * @returns um objeto JSON que passou pelas 3 correções sendo elas respectivamente: "Nome,Preço,Quantidade"
 */

function fixJson(json) {
  json = fixAllJsonNames(json);
  json = fixAllJsonPrices(json);
  json = fixAllJsonQuantity(json);
  return json;
}


/**
 * Documentação do filesystem: https://www.w3schools.com/nodejs/nodejs_filesystem.asp
 * Documentação do Stringfy: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 * @param {*} json 
 * Escreve o arquivo saida.json, com o conteudo do objeto json passado por parametro
 * Em seguida converte valores em javascript para uma String  JSON
 */
function writeJson(json) {
  fs.writeFileSync('saida.json', JSON.stringify(json));
}

/**
 * Link da documentação: https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/array/sort
 * @param {*} json 
 * @returns um objeto JSON ordenado de forma alfabetica exemplo: A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z
 */
function orderJsonInAlphabetical(json) {
  json.sort(function (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  return json;
}

/**
 * Link da documentação: https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/array/sort
 * @param {*} json 
 * @returns um objeto JSON ordenado por ID exemplo: 1,2,3,4,5,6,7,8,9..80
 */

function orderJsonByID(json) 
{
  json.sort(function (a, b) {
    return a.id - b.id;
  });
  return json;
}


/**
 * 
 * @param {*} orderJson 
 * Imprime na tela um objeto JSON que já passou por 2 ordenações sendo elas: Alfabética e pelo ID.
 */

function printAllOrderedJson(orderJson) {
  for (let i = 0; i < orderJson.length; i++) {
    console.log(orderJson[i]);
  }
}

/**
 * 
 * @param {*} json 
 * @returns um array com os preços de todos os produtos por categoria
 */
function totalValueInInventory(json) {
  const valorTotal = [];
  for (let i = 0; i < json.length; i++) {
    let valor = json[i].quantity * json[i].price;
    valorTotal.push(valor);
  }
  return valorTotal;
}


/**
 * Função principal onde todo o processo deve ser chamado
 */
function main() {
  const json = readCorruptedJson();
  let totalPrices = new Array();
  const fixedJson = fixJson(json);
  const orderJson = orderJsonByID(orderJsonInAlphabetical(fixedJson));
  printAllOrderedJson(orderJson);
  writeJson(orderJson);
  totalPrices = totalValueInInventory(fixedJson);
}


/**
 * Chamada da função principal
*/

main();































/**
 * @author: Augusto Estevão Monte
 * @version: 1.0
 * @date 07/04/2022
 */