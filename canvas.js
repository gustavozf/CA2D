function drawCanvas(){

    width = window.innerWidth * 0.8;
    height = window.innerHeight*0.913;

    canvas.width= width;
    canvas.height= height;

    context.strokeStyle = 'black';
    context.lineWidth = '2.6';
    context.strokeRect(0, 0, width, height);
    
    drawObjects();
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {x: e.clientX - rect.left, y: e.clientY - rect.top};
}

function clearCanvas(clearObjs){
    console.log('> clear');
    
    if (clearObjs){
        removeAllObj();
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvas();
}

function desfazer(){
    console.log('> desfazer');
    if(objetos.length > 0){
        objetos.pop();
        index -= 1;
        clearCanvas(false);
    } else {
        alert('Nenhum objeto existente!');
    }
}

function drawObjects(){
    objetos.forEach(element => {
        element.draw();
    });
}

