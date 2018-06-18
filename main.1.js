function uploadJsonObject(){
    var files = document.getElementById('selectFiles').files;
    var fr = new FileReader();
    if (files.length == 1) {
        fr.onload = function(e) { 
            results = JSON.parse(e.target.result);
            objetos = [];
            index = 0;
            results.forEach(element => {
                addObj(new Objeto(element.matriz, element.tipo));
            });
            clearCanvas(false);
            }
          
        fr.readAsText(files.item(0));
    } else {
        alert('Erro ao importar objetos!');
    }
}

function downloadObjectAsJson(){
    var date = new Date()
    var exportName = prompt('Insira o nome do arquivo a ser salvo: ');

    if (exportName != null){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(objetos));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
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
