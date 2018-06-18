function getObjeto(tipo){

    var tam = mousePoints.length;
    var criado = false;
    var isAutomode = document.getElementById('automode').checked;
    var aux, x, y;
    var size = Number(document.getElementById('autosize').value);

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
            }else if(tam <2){
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
                aux = getRectTwoPoints(mousePoints[0], mousePoints[1]);
                addObj(new Objeto([mousePoints[0], aux[0], mousePoints[1], aux[1]], tipo));
                criado = true;
            } else if(tam == 4){
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

function getRectTwoPoints(P1, P2){
    if(P1.x > P2.x){
        return [new Ponto(P2.x, P1.y), new Ponto(P1.x, P2.y)]
    } else {
        return [new Ponto(P1.x, P2.y), new Ponto(P2.x, P1.y)]
    }
}
