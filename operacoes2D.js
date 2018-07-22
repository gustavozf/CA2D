function translacao(dx, dy, objId){
    var T = [
            [1, 0, dx],
            [0, 1, dy],
            [0, 0, 1]
    ];
    
    var matrix = objetos[objId].toObjectMatrix();
    return matrixMultiplication(T, matrix);
}

function mudancaDeEscala(sx, sy, ponto, objId){
    var S = [
            [sx, 0, ponto.x - ponto.x * sx],
            [0, sy, ponto.y - ponto.y * sy],
            [0, 0, 1]
    ];

    var matrix = objetos[objId].toObjectMatrix();

    return matrixMultiplication(S, matrix);

}

function rotacao(angulo, ponto, objId){
    var cos = Math.cos(angulo);
    var sen = Math.sin(angulo);

    var R = [
        [cos, -sen, (ponto.y*sen) - (ponto.x*cos) + ponto.x],
        [sen, cos, (-ponto.x*sen)-(ponto.y*cos)+ ponto.y],
        [0, 0 ,1]
    ];

    var matrix = objetos[objId].toObjectMatrix();

    return matrixMultiplication(R, matrix);
}

function matrixMultiplication(A, B){
    var m = B.length;
    var n = A.length;
    var p = B[0].length;
    var C = []

    var i, j, k, sum;

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

    //alert(C);
    return C;
}