const buscaminas = {

    numMinasTotales: 30,
    numMinasEncontradas: 0,
    numFilas: 15,
    numColumnas: 15,
    aCampoMinas: []
}

function inicio(){
    //RETOCAR (crear input interactivo / interfac )
    buscaminas.numFilas = 10;
    buscaminas.numColumnas = 10;
    buscaminas.numMinasTotales = 12;
    pintarTablero();
    generarCampoMinasVacio();
    esparcirMinas();
    contarMinas();
}

// Esta funcion crea el tablero automaticamente
function pintarTablero(numFilas,numColumnas){
    //obatiene el elemento del tablero por su id y lo guarda en la variable tablero
    let tablero = document.querySelector("#tablero");

    //Con esto colocamos en las variables CSS lo que recibimos como parametros de entrada de la funcion
    document.querySelector("html").style.setProperty("--num-filas",numFilas);
    document.querySelector("html").style.setProperty("--num-columnas",numColumnas);

    // el problema de que se repita un monton de filas viene de aqui
    for (let f = 0; f < buscaminas.numFilas; f++) {
        for (let c = 0; c < buscaminas.numColumnas; c++) {
            let newDiv = document.createElement("div");

            newDiv.setAttribute("id","f", + f + "_c" + c);
            newDiv.dataset.fila = f;
            newDiv.dataset.columna = c;
            newDiv.addEventListener("contextmenu",marcar);//evento con el boton derecho del raton
            newDiv.addEventListener("click", destapar);//evento con el boton izquierdo del raton
            tablero.appendChild(newDiv);
        }
    }
}


function marcar(evento){


}

let destapar = function(evento){


}

//Genera minas 
function generarCampoMinasVacio(){
    //generamos el campo de minas en el objeto buscaminas
    buscaminas.aCampoMinas = new Array(buscaminas.numFilas);
    for (let fila=0; fila<buscaminas.numFilas; fila++){
        buscaminas.aCampoMinas[fila] = new Array(buscaminas.numColumnas);
    }
}


function esparcirMinas(){
    //repartimos de forma aleatoria las minas
    let numMinasEsparcidas = 0;
    
    while (numMinasEsparcidas<buscaminas.numMinasTotales){
        //numero aleatorio en el intervalo [0,numFilas-1]
        let fila    = Math.floor(Math.random() * buscaminas.numFilas);

        //numero aleatorio en el intervalo [0,numColumnas-1]
        let columna = Math.floor(Math.random() * buscaminas.numColumnas);

        //si no hay bomba en esa posicion
        if (buscaminas.aCampoMinas[fila][columna] != "B"){
            //la ponemos
            buscaminas.aCampoMinas[fila][columna] = "B";

            //y sumamos 1 a las bombas esparcidas
            numMinasEsparcidas++;
        }
    }
}

function contarMinasAlrededorCasilla(fila,columna){
    let numeroMinasAlrededor = 0;

    //de la fila anterior a la posterior
    for (let zFila = fila-1; zFila <= fila+1; zFila++){

        //de la columna anterior a la posterior
        for (let zColumna = columna-1; zColumna <= columna+1; zColumna++){

            //si la casilla cae dentro del tablero
            if (zFila>-1 && zFila<buscaminas.numFilas && zColumna>-1 && zColumna<buscaminas.numColumnas){

                //miramos si en esa posición hay bomba
                if (buscaminas.aCampoMinas[zFila][zColumna]=="B"){

                    //y sumamos 1 al numero de minas que hay alrededor de esa casilla
                    numeroMinasAlrededor++;
                }
            }
        }
    }
    //y guardamos cuantas minas hay en esa posicion
    buscaminas.aCampoMinas[fila][columna] = numeroMinasAlrededor;
}

function contarMinas(){
    //contamos cuantas minas hay alrededor de cada casilla
    for (let fila=0; fila<buscaminas.numFilas; fila++){
        for (let columna=0; columna<buscaminas.numColumnas; columna++){
            //solo contamos si es distinto de bomba
            if (buscaminas.aCampoMinas[fila][columna]!="B"){
                contarMinasAlrededorCasilla(fila,columna);
            }
        }
    }
}



//este while borra los div predeterminados del html
//borramos el tablero actual
while (tablero.firstChild) {
    tablero.firstChild.addEventListener("contextmenu",marcar);
    tablero.firstChild.addEventListener("click", destapar);
    tablero.removeChild(tablero.firstChild);

}

window.onload = inicio;