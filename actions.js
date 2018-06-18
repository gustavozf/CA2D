function getObjeto(tipo){

    var tam = mousePoints.length;
    var criado = false;
    var aux;

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
            if(tam <2){
                alert("Atenção: são necessários pelo menos três pontos!");
            } else {
                criado = true;
                addObj(new Objeto([mousePoints[0], mousePoints[1], mousePoints[2]], tipo));
            }
                break;
        case tipos.QUADRILATERO:
            if(tam == 2){
                aux = getRectTwoPoints(mousePoints[0], mousePoints[1]);
                criado = true;
                addObj(new Objeto([mousePoints[0], aux[0], mousePoints[1], aux[1]], tipo));
            } else if(tam == 4){
                criado = true;
                addObj(new Objeto([mousePoints[0], mousePoints[1], mousePoints[2], mousePoints[3]], tipo));
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
