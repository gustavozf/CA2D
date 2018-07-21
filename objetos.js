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
        var coordenada;
        var j = 0;
        var matrix = [];

        if(this.tipo != tipos.CIRCULO){
            for (i = 0; index < this.matriz.length; i++) {
                coordenada = [this.matriz[i].x, 
                              this.matriz[i].y, 
                              1];
                matrix[j] = coordenada;
                j++;
            }
        }

        return matrix;
    }

    getTipo(){
        return this.tipo;
    }

    
}
