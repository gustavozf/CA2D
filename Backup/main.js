import * as A from './objetos.js';

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

// ---------------------------------------------------------- Classes e definicioes/objetos
var tipos = {
    CIRCULO : 1,
    RETA : 2,
    TRIANGULO : 3,
    QUADRILATERO: 4
};

class Ponto{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Objeto{
    constructor(pontos, tipo){
        this.tipo = tipo;
        this.matriz = pontos;
    }

    draw(){
        var i, j;

        switch(this.tipo){
            case tipos.CIRCULO:
                context.beginPath();
                //arc(x-centro, y-centro, raio, startAngle, endAngle)
                context.arc(this.matriz[0].x, this.matriz[0].y, this.matriz[1], 0, 2 * Math.PI); 
                context.stroke();
                break;
            
            case tipos.RETA:
                context.beginPath();
                context.moveTo(this.matriz[0].x, this.matriz[0].y);
                context.lineTo(this.matriz[1].x, this.matriz[1].y);
                context.stroke();
                break;

            default:
                for(i=0; i < this.tipo; i++){
                    if (i==this.tipo-1){j = 0;} else {j = i+1;}

                    context.beginPath();
                    context.moveTo(this.matriz[i].x, this.matriz[i].y);
                    context.lineTo(this.matriz[j].x, this.matriz[j].y);
                    context.stroke();
                }
        }
        
    }
}

// ---------------------------------------------------------- Eventos em Geral

function drawCanvas(){

    width = window.innerWidth * 0.8;
    height = window.innerHeight*0.913;

    canvas.width= width;
    canvas.height= height;

    context.strokeStyle = 'black';
    context.lineWidth = '2.6';
    context.strokeRect(0, 0, width, height);
    
    drawObjects();
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {x: e.clientX - rect.left, y: e.clientY - rect.top};
}

function drawObjects(){
    objetos.forEach(element => {
        element.draw();
    });
}

// ---------------------------------------------------------- get Objetos
function getObjeto(tipo){

    var tam = mousePoints.length;
    var criado = false;

    switch (tipo){
        case tipos.CIRCULO:
            if(tam <2){
                alert("Atenção: são necessários pelo menos dois pontos!");
            } else {
                criado = true;
                addObj(new Objeto([mousePoints[0], getRaio(mousePoints[0], mousePoints[1])], tipo));
            }
            break;
        
        case tipos.RETA:
            if(tam <2){
                alert("Atenção: são necessários pelo menos dois pontos!");
            } else {
                criado = true;
                addObj(new Objeto([mousePoints[0], mousePoints[1]], tipo));
            }
            break;
        
        case tipos.TRIANGULO:
            if(tam <3){
                alert("Atenção: são necessários pelo menos três pontos!");
            } else {
                criado = true;
                addObj(new Objeto([mousePoints[0], mousePoints[1], mousePoints[2]], tipo));
            }
                break;
        case tipos.QUADRILATERO:
            if(tam <4){
                alert("Atenção: são necessários pelo menos quatro pontos!");
            } else {
                criado = true;
                addObj(new Objeto([mousePoints[0], mousePoints[1], mousePoints[2], mousePoints[3]], tipo));
            }
            break
    }

    if (criado){
        drawCanvas();
        //objetos[index-1].draw();
        mousePoints = [];
        mouseIndex = 0;
    }
}

// ---------------------------------------------------------- Extras
function salvar(){

}

// ---------------------------------------------------------- Funcoes do Sistema

function addObj(obj){
    objetos[index] = obj;
    index+=1;
}

function removeAllObj(){
    var tam = objetos.length;

    index = 0;
    objetos = []; 
}

function clearCanvas(clearObjs){
    console.log('> clear');
    
    if (clearObjs){
        removeAllObj();
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvas();
}

function desfazer(){
    console.log('> desfazer');
    if(objetos.length > 0){
        objetos.pop();
        index -= 1;
        clearCanvas(false);
    } else {
        alert('Nenhum objeto existente!');
    }
}

function getRaio(centro, pontoExterno){
    return Math.sqrt(Math.pow(pontoExterno.x - centro.x, 2) + Math.pow(pontoExterno.y - centro.y, 2));
}

// ---------------------------------------------------------- Main
function main(){
    console.log('Starting CA2D');

    // Se a janela muda o tamanho, o canvas muda tbm
    window.addEventListener('resize', drawCanvas, false);
    // Mostra na tela a posicao do mouse
    canvas.addEventListener('mousemove', function(e) {
        var mouseP = getMousePos(canvas, e); /// provide this canvas and event
        document.getElementById("mouse").innerHTML = "<" + Math.ceil(mouseP.x) + ", "+mouseP.y +">";
    
    }, false);
    // pega um click no canvas
    canvas.addEventListener('click', function(e) {
        var mouse = getMousePos(canvas, e); /// provide this canvas and event
        mousePoints.push(new Ponto(mouse.x, mouse.y));
        context.fillRect(mousePoints[mouseIndex].x, mousePoints[mouseIndex].y, 4, 4);
        mouseIndex += 1;
    }, false);

    drawCanvas();
}

main();
