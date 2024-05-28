let filas = 20;
let columnas = 20;
let lado = 30;

let marcas = 0;
let minas = Math.floor(filas * columnas * 0.1);
let tablero = [];
let enJuego = true;
let juegoIniciado = false;

nuevoJuego();

function nuevoJuego() {
    generacionTableroHTML();
    añadirEventos();
    generarTableroJuego();
    refrescarTablero();
}

function generacionTableroHTML() {
    let html = "";
    for (let f = 0; f < filas; f++) {
        html += `<tr>`;
        for (let c = 0; c < columnas; c++) {
            html += `<td id="celda-${c}-${f}" style="width:${lado}px;height:${lado}px"></td>`;
        }
        html += `</tr>`;
    }

    let tableroHTML = document.getElementById("tablero");
    tableroHTML.innerHTML = html;
    tableroHTML.style.width = columnas * lado + "px";
    tableroHTML.style.height = filas * lado + "px";
}

function añadirEventos() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            let celda = document.getElementById(`celda-${c}-${f}`);
            celda.addEventListener("dblclick", (me) => {
                dobleClic(celda, c, f, me);
            });
            celda.addEventListener("mouseup", (me) => {
                clicSimple(celda, c, f, me);
            });
        }
    }
}

function dobleClic(celda, c, f, me) {
    if (!enJuego) {
        return;
    }
    refrescarTablero();
}

function clicSimple(celda, c, f, me) {
    if (!enJuego) {
        return;
    }
    if (tablero[c][f].estado == "descubierto") {
        return;
    }
    switch (me.button) {
        case 0: // 0 es el código para el clic izquierdo
            if (tablero[c][f].estado == "marcado") {
                break;
            }
            while (!juegoIniciado && tablero[c][f].valor == -1) {
                generarTableroJuego();
            }
            tablero[c][f].estado = "descubierto";
            juegoIniciado = true;
            break;
        case 2: // 2 es el código para el clic derecho
            if (tablero[c][f].estado == "marcado") {
                tablero[c][f].estado = undefined;
                marcas--;
            } else {
                tablero[c][f].estado = "marcado";
                marcas++;
            }
            break;
    }
    refrescarTablero();
}

function refrescarTablero() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            let celda = document.getElementById(`celda-${c}-${f}`);
            if (tablero[c][f].estado == "descubierto") {
                celda.style.boxShadow = "none";
                switch (tablero[c][f].valor) {
                    case -1:
                        celda.innerHTML = `<i class="fas fa-bomb"></i>`;
                        celda.style.color = "black";
                        celda.style.background = "red";
                        break;
                    case 0:
                        break;
                    default:
                        celda.innerHTML = tablero[c][f].valor;
                        celda.classList.add(`number-${tablero[c][f].valor}`);
                        break;
                }
            }
            if (tablero[c][f].estado == "marcado") {
                celda.innerHTML = `<i class="fa-brands fa-font-awesome"></i>`;
                celda.style.color = `red`;
            }
            if (tablero[c][f].estado == undefined) {
                celda.innerHTML = ``;
                celda.style.background = ``;
            }
        }
    }
}
//////////////////////////////////////////
function verificarGanador() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            // Lógica para verificar si el jugador ha ganado
        }
    }
}

function verificarPerdedor() {
    // Lógica para verificar si el jugador ha perdido
}
///////////////////////


function generarTableroJuego() {
    vaciarTablero();
    ponerMinas();
    contadorMinas();
}

function vaciarTablero() {
    tablero = [];
    for (let c = 0; c < columnas; c++) {
        tablero.push([]);
    }
}

function ponerMinas() {
    for (let i = 0; i < minas; i++) {
        let c;
        let f;
        do {
            c = Math.floor(Math.random() * columnas);
            f = Math.floor(Math.random() * filas);
        } while (tablero[c][f]);
        tablero[c][f] = { valor: -1 };
    }
}

function contadorMinas() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            if (!tablero[c][f]) {
                let contador = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i == 0 && j == 0) {
                            continue;
                        }
                        try {
                            if (tablero[c + i][f + j].valor == -1) {
                                contador++;
                            }
                        } catch (e) {}
                    }
                }
                tablero[c][f] = { valor: contador };
            }
        }
    }
}
