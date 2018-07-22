function getObjeto(tipo){

    var tam = mousePoints.length;
    var criado = false;
    var isAutomode = document.getElementById('automode').checked;
    var aux, x, y;
    var size = 200; //Number(document.getElementById('autosize').value);

    switch (tipo){
        case tipos.CIRCULO:
            if(isAutomode){
                if(tam <1){
                    alert("Atenção: o modo automático exige pelo menos um ponto!");
                }else {
                    x = mousePoints[0].x;
                    y = mousePoints[0].y;
                    addObj(new Objeto([mousePoints[0], getRaio(mousePoints[0], new Ponto(x+size/2, y))], tipo));
                    criado = true;
                } 
            }else if(tam <2){
                alert("Atenção: são necessários pelo menos dois pontos!");
            } else {
                addObj(new Objeto([mousePoints[0], getRaio(mousePoints[0], mousePoints[1])], tipo));
                criado = true;
            }
            break;
        
        case tipos.RETA:
            if(isAutomode){
                if(tam <1){
                    alert("Atenção: o modo automático exige pelo menos um ponto!");
                }else {
                    x = mousePoints[0].x;
                    y = mousePoints[0].y;
                    addObj(new Objeto([mousePoints[0], new Ponto(x+size, y)], tipo));
                    criado = true;
                }
            }else if(tam <2){
                alert("Atenção: são necessários pelo menos dois pontos!");
            } else {
                addObj(new Objeto([mousePoints[0], mousePoints[1]], tipo));
                criado = true;
            }
            break;
        
        case tipos.TRIANGULO:
            if(isAutomode){
                if(tam <1){
                    alert("Atenção: o modo automático exige pelo menos um ponto!");
                }else {
                    x = mousePoints[0].x;
                    y = mousePoints[0].y;
                    addObj(new Objeto([mousePoints[0], new Ponto(x+size, y), new Ponto(x + size/2, y-size)], tipo));
                    criado = true;
                }
            }else if(tam <=2){
                alert("Atenção: são necessários pelo menos três pontos!");
            } else {
                addObj(new Objeto([mousePoints[0], mousePoints[1], mousePoints[2]], tipo));
                criado = true;
            }
                break;
        case tipos.QUADRILATERO:
            if(isAutomode){
                if(tam <1){
                    alert("Atenção: o modo automático exige pelo menos um ponto!");
                }else {
                    x = mousePoints[0].x;
                    y = mousePoints[0].y;
                    addObj(new Objeto([mousePoints[0], new Ponto(x, y+size), new Ponto(x+size, y+size), new Ponto(x+size, y)], tipo));
                    criado = true;
                }
            }else if(tam == 2){
                //aux = getRectTwoPoints(mousePoints[0], mousePoints[1]);
                //addObj(new Objeto([mousePoints[0], aux[0], mousePoints[1], aux[1]], tipo));
                addObj(new Objeto(getRectTwoPoints(mousePoints[0], mousePoints[1]), tipo));
                criado = true;
            } else if(tam > 3){
                addObj(new Objeto([mousePoints[0], mousePoints[1], mousePoints[2], mousePoints[3]], tipo));
                criado = true;
            } else{
                alert("Atenção: são necessários dois ou quatro pontos!");
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

function getRaio(centro, pontoExterno){
    return Math.sqrt(Math.pow(pontoExterno.x - centro.x, 2) + Math.pow(pontoExterno.y - centro.y, 2));
}

function addObj(obj){
    objetos[index] = obj;
    index+=1;
}

function removeAllObj(){
    var tam = objetos.length;

    index = 0;
    objetos = []; 
}

// Pega dois ponto e retorna um retangulo
function getRectTwoPoints(P1, P2){
    if(P1.x > P2.x){
        return [mousePoints[0], new Ponto(P2.x, P1.y), mousePoints[1], new Ponto(P1.x, P2.y)];
    } else {
        return [mousePoints[0], new Ponto(P1.x, P2.y), mousePoints[1], new Ponto(P2.x, P1.y)];
    }
}

function getListaObjetos(){
    if(mousePoints.length < 2){
        alert('São necessários dois pontos para realizar a seleção!');
    } else {
        var area = getRectTwoPoints(mousePoints[0], mousePoints[1]);
        var tam, cont;
        var i, k, elemento;
        selecao = [];
  
        for(k=0; k < objetos.length; k++) {
            elemento = objetos[k];
            tam = elemento.getTipo();
            cont = 0;

            if (tam != tipos.CIRCULO){
                for(i=0; i<tam; i++){
                    // conta a quantidade de pontos dentro da area
                    if(inArea(area, elemento.matriz[i])){
                        cont++;
                    }
                }
                // se todos os pontos da forma estiverem na area
                if (cont == tam){
                    // adiciona na selecao
                    alert('entrou!');
                    selecao.push(Object.assign({}, elemento));
                    alert(JSON.stringify(selecao));
                }
            } else {
                var raio = elemento.matriz[1];
                var x = elemento.matriz[0].x;
                var y = elemento.matriz[0].y;

                // se o circulo esta na area
                if(
                    (inArea(area, new Ponto(x + raio, y))) &&
                    (inArea(area, new Ponto(x - raio, y))) &&
                    (inArea(area, new Ponto(x, y + raio))) &&
                    (inArea(area, new Ponto(x, y - raio)))
                ){
                    alert('entrou!');
                    // adiciona na selecao
                    selecao.push(Object.assign({}, elemento));
                    alert(JSON.stringify(selecao));
                }
            }
        }

        drawSelecao(area);
    }
}

// pega um ponto de um objeto
function getObjectByPoint(ponto, lista){
    var i, j;
    var objAtual;

    for (i = 0; i < lista.length; i) {
        objAtual = lista[i];

        if(objAtual.getTipo() != tipos.CIRCULO){
            if(inArea(objAtual.matriz, ponto)){
                return i;
            }
        }
        
    }

    return -1;
}

function getMaxAndMin(matrix){
    var maxX = matrix[0].x;
    var maxY = matrix[0].y;
    var minX = matrix[0].x;
    var minY = matrix[0].y;

    var i;

    for(i=1; i < matrix.length; i++){
        // Pega o X max e min
        if(matrix[i].x > maxX){
            maxX = matrix[i].x;
        } else if (matrix[i].x < minX){
            minX = matrix[i].x;
        }

        // Pega o Y max e min
        if(matrix[i].y > maxY){
            maxY = matrix[i].y;
        } else if (matrix[i].y < minY){
            minY = matrix[i].y;
        }
    }

    return {
            maxX : maxX, 
            maxY : maxY, 
            minX : minX, 
            minY : minY
        };
}

function inArea(matrix, ponto){
    var ret = getMaxAndMin(matrix);
    //alert(JSON.stringify(ret));

    return ((ponto.x <= ret.maxX) && (ponto.x >= ret.minX)) && ((ponto.y <= ret.maxY) && (ponto.y >= ret.minY));
}

