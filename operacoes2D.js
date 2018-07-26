function translacao(dx, dy, objId){
    //alert("Entrou translacao!");
    var T = [
            [1, 0, dx],
            [0, 1, dy],
            [0, 0, 1]
    ];
    return matrixMultiplication(T, objetos[objId].toObjectMatrix());
}

function mudancaDeEscala(sx, sy, ponto, objId){
    var S = [
            [sx, 0, ponto.x - ponto.x * sx],
            [0, sy, ponto.y - ponto.y * sy],
            [0, 0, 1]
    ];

    if (objetos[objId].tipo == tipos.CIRCULO){
        var mat;
        var newPonto;
     
        mat = objetos[objId].toObjectMatrix();
        mat[0][1] = ponto.x; 
        mat[1][1] = ponto.y;
        mat[2][1] = 1;

        return matrixMultiplication(S, mat);
    }

    return matrixMultiplication(S, objetos[objId].toObjectMatrix());
}

function rotacao(angulo, ponto, objId){
    var cos = Math.cos(-angulo);
    var sen = Math.sin(-angulo);
    var x = ponto.x;
    var y = ponto.y;

    var R = [
        [cos, -sen, y*sen-x*cos+x],
        [sen, cos, -x*sen-y*cos+y],
        [0, 0 ,1]
    ];

    return matrixMultiplication(R, objetos[objId].toObjectMatrix());
}

function TransJanelaViewport(s, min, ponto){
    var x = ponto.x;
    var y = ponto.y;
    
    return {x: ((x - min.x)*s.x + min.u),
            y: ((y - min.y)*s.y + min.v)
    }
}

function getSxSy(u, v, x, y){
    return {
        x: (u.max - u.min)/(x.max - x.min),
        y: (v.max - v.min)/(y.max - y.min)

    }
}

function matrixMultiplication(A, B){
    var m = B.length;
    var n = A.length;
    var p = B[0].length;
    var C = [];

    var i, j, k, sum;
    //alert("Iniciou MM");
    for(i=0; i<n;i++){
        C[i] = [];
        for(j=0;j<p;j++){
            sum = 0;
            for(k = 0; k<m;k++){
                sum += A[i][k] * B[k][j];
            }
            C[i][j] = sum;
        }
    }

    //alert("terminou MM");   
    //alert(C);
    return C;
}

function transladar(){
    if (selecao.length == 0){
        alert("Atenção! É necessário que pelo menos um objeto esteja selecionado!");
    } else if(mousePoints.length < 2){
        alert("Atenção! São necessários dois pontos para esta operação!\n"+
              "O primeiro sendo um ponto do objeto e o segundo sendo o ponto onde o objeto será deslocado!");
    } else {
        id = getObjectByPoint(mousePoints[0], selecao);
        if (id<0){
            alert("Ponto selecionado não pertence ao objeto!")  ;
        } else {
            desloc = getDeslocamento(mousePoints[0], mousePoints[1]);
            objetos[id].updateObj(translacao(desloc.x, desloc.y, id), false);
            clearCanvas(false, true);   
        }
    }
}

function rotacionar(){
    var angulo;

    if (selecao.length == 0){
        alert("Atenção! É necessário que pelo menos um objeto esteja selecionado!");
    } else if(mousePoints.length < 1){
        alert("Atenção! É necessário um ponto para esta operação!\n"+
              "Este refere-se à um ponto do objeto!");
    } else {
        id = getObjectByPoint(mousePoints[0], selecao);
        if (id<0){
            alert("Ponto selecionado não pertence ao objeto!")  ;
        } else {
            angulo = prompt("Insira um ângulo a ser aplicada a rotação!");
            objetos[id].updateObj(rotacao(angulo *Math.PI/180, mousePoints[0], id), false);
            clearCanvas(false, true);   
        }
    }
}

function mudarEscala(){
    var s;

    if (selecao.length == 0){
        alert("Atenção! É necessário que pelo menos um objeto esteja selecionado!");
    } else if(mousePoints.length < 1){
        alert("Atenção! É necessário um ponto para esta operação!\n"+
              "Este sendo um ponto de referência do objeto!");
    } else {
        id = getObjectByPoint(mousePoints[0], selecao);
        //alert(id);
        if (id<0){
            alert("Ponto selecionado não pertence ao objeto!")  ;
        } else {
            s = prompt("Insira os valores de Sx e Sy separados por '/'").split('/');

            objetos[id].updateObj(mudancaDeEscala(Number(s[0]), Number(s[1]), mousePoints[0], id), true);
            clearCanvas(false, true);   
        }
    }
}

/*
function zoomExtend(){
    var objeto, matriz, retorno;
    var local, geral = [];
    var x, y, u ,v, i, j, s;

    for( i = 0; i < objetos.length; i++){
        objeto = objetos[i];

        if(objeto.tipo != tipos.CIRCULO){
            local = getMaxAndMin(objeto.matriz);
        } else {
            local = {maxX: objeto.matriz[0].x + objeto.matriz[1],
                     minX: objeto.matriz[0].x - objeto.matriz[1],
                     maxY: objeto.matriz[0].y + objeto.matriz[1],
                     minY: objeto.matriz[0].y - objeto.matriz[1]}
        }

        if (geral == []){
            geral = local;
        }

        if (local.maxX > geral.maxX) {geral.maxX = local.maxX;}
        if (local.minX < geral.minX) {geral.minX = local.minX;}
        if (local.maxY > geral.maxY) {geral.maxY = local.maxY;}
        if (local.minY < geral.minY) {geral.minY = local.minY;}
    }

    x = {min: 0, max: canvas.width};
    y = {min: 0, max: canvas.height};
    u = {min: geral.minX, max:  geral.maxX};
    v = {min: geral.minY, max:  geral.maxY};

    s = getSxSy(u, v, x, y);

    for(i = 0; i < objetos.length; i++){
        matriz = objetos[i].toObjectMatrix();

        for(j=0; j<matriz[0].length; j++){
            retorno = TransJanelaViewport(s, {x: x.min, y: y.min, u: u.min, v:v.min}, 
                                             {x:matriz[0][j], y:matriz[1][j]});
            matriz[0][j] = retorno.x;
            matriz[1][j] = retorno.y;
        }

        objetos[i].updateObj(matriz);
    }

    clearCanvas(false, true);   
}*/