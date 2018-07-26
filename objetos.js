const tipos = {
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

    toObjectMatrix(){
        var i;
        var matrix = [[], [], []];
        //alert("Entrou to objeto matrix!");
        if(this.tipo != tipos.CIRCULO){
            for (i = 0; i < this.matriz.length; i++) {
                matrix[0][i] = this.matriz[i].x;
                matrix[1][i] = this.matriz[i].y;
                matrix[2][i] = 1;
            }
        } else {
            matrix[0][0] = this.matriz[0].x;
            matrix[1][0] = this.matriz[0].y;
            matrix[2][0] = 1;
        }

        return matrix;
    }

    getTipo(){
        return this.tipo;
    }

    updateObj(newMat, isScale){
        var i;
    
        for(i=0; i < this.getTipo(); i++){
            this.matriz[i].x = newMat[0][i];
            this.matriz[i].y = newMat[1][i];
        }

        if(this.getTipo() == tipos.CIRCULO && isScale){
            this.matriz[1] = getRaio(this.matriz[0], new Ponto(newMat[0][1], newMat[1][1]));
        }
    }
    
}
