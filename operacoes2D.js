function translacao(origem, destino){
    
}

function getObjectByPoint(ponto){
    var i, j;
    var objAtual, matriz;
    var inArea;

    for (i = 0; i < objetos.length; i) {
        objAtual = objetos[i];

        if(objAtual.getTipo() != tipos.CIRCULO){
            matriz = objAtual.toObjectMatrix();
            
            for(j = 0; j<matriz.length; j++){
                inArea = (ponto.x);
            }
        }
        
    }
}

//function convertToObjectMatrix