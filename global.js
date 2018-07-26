// ---------------------------------------------------------- Variaveis Globais
// pegando o canvas
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// declarando a lista de objetos
var objetos = [];
var index = 0;
// para inserir -> objetos[index] = obj; index += 1;
// para remover -> objetos.splice(i, 1); index -= 1;

// posicao do mouse
var mousePoints = [];
var mouseIndex = 0;

var selecao = [];
var areaSelecao = [];