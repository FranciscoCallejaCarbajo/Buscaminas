// Esta funcion crea el tablero automaticamente
function pintarTablero(numFilas,numColumnas){
    //obatiene el elemento del tablero por su id y lo guarda en la variable tablero
    let tablero = document.querySelector("#tablero");

    for (let f = 0; f < numFilas; f++) {
        for (let c = 0; c < numColumnas; c++) {
            let newDiv = document.createElement("div");

            tablero.appendChild(newDiv);
        }
    }
}