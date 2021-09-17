/* 
    Função para inicializar estrutura A e D, 
    fazendo um loop e setando todos os elementos com infinito
    caso seja estrutura D ou null caso seja a estrutura A.
*/
const initializeData = (data = [], prefix = '', inital = '') => {
    let aux = new Map();
    data.map(val =>
        aux.set(val, prefix === 'D' ? Infinity : null)
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
    Algoritmo de Bellman-ford
*/

const main = (C = [], L = Map, Cs = '', Ct = '') => {
    if (C.length === 1) {                                               // Verificação unico vértice.
        return 'Unico vértice';
    }
    let D = initializeData(C, 'D');                                     // Função para inicializar estrutura D (distancia) de acordo com a quantidade de centrais
    let A = initializeData(C, 'A');                                     // Função para inicializar estrutura A (ancestrais) de acordo com a quantidade de centrais
    D.set(Cs, 0);                                                       // Seta o vértice inicial
    for (let i = 0; i <= C.length - 1; i++) {                           // Percorre todas as centrais
        L.forEach((itens, key) => {                                     // Percorre todos os arcos
            itens.forEach((value) => {                                  // Foreach necessário para percorrer todas as ligações de um vértice
                if (D.get(value.dest) > D.get(key) + value.cost) {      // Verifica se o valor da distância do destino é maior que a distância inicial mais a distância entre os vértices
                    D.set(value.dest, D.get(key) + value.cost);         // Atualiza vetor D na posição destino com o valor da distância inicial mais a distância entre os vértices
                    A.set(value.dest, key);                             // Atualiza o ancestral de destino com o arco percorrido
                }
            }
            );
        });
    }
    L.forEach((itens, key) => {                                         // Função de relaxamento
        itens.forEach((value) => {
            if (D.get(value.dest) > D.get(key) + value.cost) {
                return null;
            }
        }
        );
    });

    return shortestPath(A, Ct, D.get(Ct));                                         // Retorna o menor caminho entre o vetor inicial e final (vetor)
}

// Lista de identificadores das centrais
const centrais = ['a', 'b', 'c', 'd', 'e'];

// Central de origem
const Cs = 'a';

// Central de destino
const Ct = 'b';

/* 
    Listagem com os pares centrais que trocam encomenda entre si
    Representado por elementos de chave e valor {Map}, onde o primeiro
    elemento é o vértice de origem, o vértice no atributo 'dest' é o de destino, e o 
    custo dessa ligação (cost).
*/

const pares = new Map(
    [
        ['a', [{ dest: 'b', cost: 3 }, { dest: 'c', cost: 7 }]],
        ['b', [{ dest: 'e', cost: 9 }]],
        ['c', [{ dest: 'd', cost: 1 }]],
        ['d', [{ dest: 'b', cost: 2 }, { dest: 'e', cost: 1 }]]
    ]
);
/* 
    Função que inicia a aplicação, recebendo todas as centrais (vértices), 
    as centrais que trocam elementos entre si (arcos), a central inicial e a
    central final, para calcular a menor distância entre elas.
*/
const response = main(centrais, pares, Cs, Ct);
console.log(response);