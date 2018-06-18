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
