/* 
    Função para inicializar estrutura A, C e D, 
    fazendo um loop e setando todos os elementos com infinito
    caso seja estrutura D, null caso seja a estrutura A ou false caseja estrutura C.
*/
const initializeData = (data = [], prefix = '') => {
    let aux = new Map();
    data.map(val =>
        aux.set(val, prefix === 'D' ? Infinity : prefix === 'C' ? false : null)
    );
    return aux;
}

/* 
    Função para retornar um vetor da menor distância 
    entre os dois pontos setados.
*/

const shortestPath = (A = Map, final = '', cost) => {
    let routeFinal = [final];                                       // Primeiro elemento do array, destino
    let currentTarget = final;                                      // Variável auxiliar para percorrer todos os valores
    while (currentTarget !== null) {
        A.forEach((ancestral, key) => {                             // Percorre todos os ancestrais, 
            if (key === currentTarget) {                            // verificando se o valor atual, é ancestral de alguma chave (vértice)
                currentTarget = ancestral;                          // caso sim, atualizar a variável auxiliar e adiciona no vetor 
                ancestral !== null && routeFinal.push(ancestral);   // de menor distância, até que encontre um ancestral nulo. 
            }
        });
    }

    if (routeFinal.length === 1) return 'Caminho não encontrado';
    return `\nCaminho final: ${routeFinal.reverse()} \nCusto: ${cost}`;
}

/* 
    Verifica se existe pelo menos 1 elemento
    que seja falso na estrutura C (conhecido). 
*/

const getElementsC = (C = Map) => {
    let aux = [];
    C.forEach((element) => aux.push(element));
    return aux.some(elem => elem === false);
}

/* 
    Verifica o menor elemento na estrutura D, 
    obrigatoriamente não conhecido na estrutura C (false).
*/

const argMin = (D = Map, C = Map) => {
    let currentLowestValue = new Map();
    let index = 0;
    D.forEach((element, key) => {                                               // Percorre todos os elementos em D.
        if (C.get(key) === false) {                                             // Verifica se o elemento C na posição D é nulo.
            index === 0 ? currentLowestValue.set(key, element) : undefined;     // Seta somente quando for o primeiro elemento.
            if (element < currentLowestValue.values().next().value) {           // Verifica se o elemento atual do for é menor que o menor elemento atual setado.
                currentLowestValue.clear();                                     // Necessário para o JS não fazer um vetor.
                currentLowestValue.set(key, element);                           // Seta o elemento como menor até então.
            }
            index++;
        }
    });
    return currentLowestValue;
}

/* 
    Algoritmo de Dijkstra.
*/

const main = (Places = [], L = Map, Cs = '', Ct = '') => {
    if (Places.length === 1) {                                               // Verificação unico vértice.
        return 'Unico vértice';
    }
    let D = initializeData(Places, 'D');                                     // Função para inicializar estrutura D (distancia) com infinito.
    let A = initializeData(Places, 'A');                                     // Função para inicializar estrutura A (ancestrais) com nulo.
    let C = initializeData(Places, 'C');                                     // Função para inicializar estrutura C (conhecido) com false.
    let u;
    D.set(Cs, 0);                                                            // Seta o elemento de partida.       
    while (getElementsC(C)) {                                                               // Verifica se algum elemento ainda não é conhecido.
        u = argMin(D, C);                                                                   // Retorna único map representando o menor valor entre os não conhecidos.
        C.set(u.keys().next().value, true);                                                 // Seta o menor elemento como conhecido.
        L.get(u.keys().next().value) && L.get(u.keys().next().value).map(aresta => {        // Verifica se o vértice tem arestas que saem dele, caso sim (&&), percorre todas as arestas.
            if (C.get(aresta.dest) === false) {                                             // Verifica se as arestas não são conhecidas.
                if (D.get(aresta.dest) > D.get(u.keys().next().value) + aresta.cost) {      // Verifica se o valor da distância do destino é maior que a distância inicial mais a distância entre os vértices.
                    D.set(aresta.dest, D.get(u.keys().next().value) + aresta.cost);         // Atualiza vetor D na posição destino com o valor da distância inicial mais a distância entre os vértices.
                    A.set(aresta.dest, u.keys().next().value);                              // Atualiza o ancestral de destino com o arco percorrido.
                }
            }
        })
    }

    return shortestPath(A, Ct, D.get(Ct));                                         // Retorna o menor caminho entre o vetor inicial e final (vetor)
}

// Lista de identificadores das centrais
const centrais = ['a', 'c', 'd', 'e', 'f'];

// Vértice de origem
const Cs = 'a';

// Vértice de destino
const Ct = 'd';

/* 
    Conjunto de vértices que representam a distância entre eles.
*/

const pares = new Map(
    [
        ['a', [{ dest: 'c', cost: 4 }, { dest: 'e', cost: 5 }]],
        ['c', [{ dest: 'd', cost: 4 }]],
        ['e', [{ dest: 'f', cost: 1 }]],
        ['f', [{ dest: 'c', cost: 1 }, { dest: 'd', cost: 7 }]]
    ]
);
/* 
    Função que inicia a aplicação, recebendo todas as localidades (vértices), 
    conjunto de pares (arcos), p valor cobrado em cada localidade, vértice de origem Cs e 
    um vértice de destino Ct, para calcular a menor distância entre elas.
*/
const response = main(centrais, pares, Cs, Ct);
console.log(response);