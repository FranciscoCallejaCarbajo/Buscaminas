const buscaminas = {
  numMinasTotales: 0,
  numMinasEncontradas: 0,
  numFilas: 0,
  numColumnas: 0,
  aCampoMinas: [],
};

// Esta funcion crea el tablero automaticamente
function pintarTablero() {
  //obatiene el elemento del tablero por su id y lo guarda en la variable tablero
  let tablero = document.querySelector("#tablero");

  //Con esto colocamos en las variables CSS lo que recibimos como parametros de entrada de la funcion
  document
    .querySelector("html")
    .style.setProperty("--num-filas", buscaminas.numFilas);
  //el problema estaba aqui esque llamavamos el numero de filas y columnas pero no por el objeto si no con las variables que le habiamos metido a la funcion
  document
    .querySelector("html")
    .style.setProperty("--num-columnas", buscaminas.numColumnas);

  //este while borra los div predeterminados del html
  //borramos el tablero actual
  while (tablero.firstChild) {
    tablero.firstChild.removeEventListener("contextmenu", marcar); // teniamos addEventListener
    tablero.firstChild.removeEventListener("click", destapar); // teniamos addEventListener
    tablero.removeChild(tablero.firstChild);
  }

  // el problema de que se repita un monton de filas viene de aqui
  for (let f = 0; f < buscaminas.numFilas; f++) {
    for (let c = 0; c < buscaminas.numColumnas; c++) {
      let newDiv = document.createElement("div");

      newDiv.setAttribute("id", "f" + f + "_c" + c);
      newDiv.dataset.fila = f;
      newDiv.dataset.columna = c;
      newDiv.addEventListener("contextmenu", marcar); //evento con el boton derecho del raton
      newDiv.addEventListener("click", destapar); //evento con el boton izquierdo del raton
      tablero.appendChild(newDiv);
    }
  }
}

//Genera minas
function generarCampoMinasVacio() {
  if (!Number.isNaN(buscaminas.numFilas)) {
    //generamos el campo de minas en el objeto buscaminas
    buscaminas.aCampoMinas = new Array(buscaminas.numFilas);
    for (let fila = 0; fila < buscaminas.numFilas; fila++) {
      buscaminas.aCampoMinas[fila] = new Array(buscaminas.numColumnas);
    }
  } else {
    location.reload();
  }
}

function esparcirMinas() {
  //repartimos de forma aleatoria las minas
  let numMinasEsparcidas = 0;

  while (numMinasEsparcidas < buscaminas.numMinasTotales) {
    //numero aleatorio en el intervalo [0,numFilas-1]
    let fila = Math.floor(Math.random() * buscaminas.numFilas);

    //numero aleatorio en el intervalo [0,numColumnas-1]
    let columna = Math.floor(Math.random() * buscaminas.numColumnas);

    //si no hay bomba en esa posicion
    if (buscaminas.aCampoMinas[fila][columna] != "B") {
      //la ponemos
      buscaminas.aCampoMinas[fila][columna] = "B";

      //y sumamos 1 a las bombas esparcidas
      numMinasEsparcidas++;
    }
  }
}

function contarMinasAlrededorCasilla(fila, columna) {
  let numeroMinasAlrededor = 0;

  //de la fila anterior a la posterior
  for (let zFila = fila - 1; zFila <= fila + 1; zFila++) {
    //de la columna anterior a la posterior
    for (let zColumna = columna - 1; zColumna <= columna + 1; zColumna++) {
      //si la casilla cae dentro del tablero
      if (
        zFila > -1 &&
        zFila < buscaminas.numFilas &&
        zColumna > -1 &&
        zColumna < buscaminas.numColumnas
      ) {
        //miramos si en esa posición hay bomba
        if (buscaminas.aCampoMinas[zFila][zColumna] == "B") {
          //y sumamos 1 al numero de minas que hay alrededor de esa casilla
          numeroMinasAlrededor++;
        }
      }
    }
  }

  //y guardamos cuantas minas hay en esa posicion
  buscaminas.aCampoMinas[fila][columna] = numeroMinasAlrededor;
}

function contarMinas() {
  //contamos cuantas minas hay alrededor de cada casilla
  for (let fila = 0; fila < buscaminas.numFilas; fila++) {
    for (let columna = 0; columna < buscaminas.numColumnas; columna++) {
      //solo contamos si es distinto de bomba
      if (buscaminas.aCampoMinas[fila][columna] != "B") {
        contarMinasAlrededorCasilla(fila, columna);
      }
    }
  }
}

function marcar(miEvento) {
  if (miEvento.type === "contextmenu") {
    console.log(miEvento);

    //obtenemos el elemento que ha disparado el evento
    let casilla = miEvento.currentTarget;

    //detenemos el burbujeo del evento y su accion por defecto
    miEvento.stopPropagation();
    miEvento.preventDefault();

    //obtenemos la fila de las propiedades dataset.
    let fila = parseInt(casilla.dataset.fila, 0);
    let columna = parseInt(casilla.dataset.columna, 0);

    if (
      fila >= 0 &&
      columna >= 0 &&
      fila < buscaminas.numFilas &&
      columna < buscaminas.numColumnas
    ) {
      //si esta marcada como "bandera"
      if (casilla.classList.contains("icon-bandera")) {
        //la quitamos
        casilla.classList.remove("icon-bandera");
        //y la marcamos como duda
        casilla.classList.add("icon-duda");
        //y al numero de minas encontradas le restamos 1
        buscaminas.numMinasEncontradas--;
      } else if (casilla.classList.contains("icon-duda")) {
        //si estaba marcada como duda lo quitamos
        casilla.classList.remove("icon-duda");
      } else if (casilla.classList.length == 0) {
        //si no está marcada la marcamos como "bandera"
        casilla.classList.add("icon-bandera");
        //y sumamos 1 al numero de minas encontradas
        buscaminas.numMinasEncontradas++;
        //si es igual al numero de minas totales resolvemos el tablero para ver si esta bien
        if (buscaminas.numMinasEncontradas == buscaminas.numMinasTotales) {
          resolverTablero(true);
        }
      }
      //actualizamos la barra de estado con el numero de minas restantes
      actualizarNumMinasRestantes();
    }
  }
}

function destapar(miEvento) {
  if (miEvento.type === "click") {
    let casilla = miEvento.currentTarget;
    let fila = parseInt(casilla.dataset.fila, 0);
    let columna = parseInt(casilla.dataset.columna, 0);

    destaparCasilla(fila, columna);
  }
}

// Esta funcion se encarga de llamar la funcion destapar
function destaparCasilla(fila, columna) {
  //si la casilla esta dentro del tablero
  if (
    fila > -1 &&
    fila < buscaminas.numFilas &&
    columna > -1 &&
    columna < buscaminas.numColumnas
  ) {
    console.log(
      "destapamos la casilla con fila " + fila + " y columna " + columna
    );
    //obtenermos la casilla con la fila y columna
    let casilla = document.querySelector("#f" + fila + "_c" + columna);

    //si la casilla no esta destapada
    if (!casilla.classList.contains("destapado")) {
      //si no esta marcada como "bandera"
      if (!casilla.classList.contains("icon-bandera")) {
        //la destapamos
        casilla.classList.add("destapado");

        //ponemos en la casilla el número de minas que tiene alrededor
        casilla.innerHTML = buscaminas.aCampoMinas[fila][columna];

        //ponemos el estilo del numero de minas que tiene alrededor (cada uno es de un color)
        casilla.classList.add("c" + buscaminas.aCampoMinas[fila][columna]);

        //si no es bomba
        if (buscaminas.aCampoMinas[fila][columna] !== "B") {
          // y tiene 0 minas alrededor, destapamos las casillas contiguas
          if (buscaminas.aCampoMinas[fila][columna] == 0) {
            destaparCasilla(fila - 1, columna - 1);
            destaparCasilla(fila - 1, columna);
            destaparCasilla(fila - 1, columna + 1);
            destaparCasilla(fila, columna - 1);
            destaparCasilla(fila, columna + 1);
            destaparCasilla(fila + 1, columna - 1);
            destaparCasilla(fila + 1, columna);
            destaparCasilla(fila + 1, columna + 1);

            //y borramos el 0 poniendo la cadena vacía
            casilla.innerHTML = "";
          }
        } else if (buscaminas.aCampoMinas[fila][columna] == "B") {
          // si por el contrario hay bomba quitamos la B
          casilla.innerHTML = "";

          //añadimos el estilo de que hay bomba
          casilla.classList.add("icon-bomba");

          // y que se nos ha olvidado marcarla
          casilla.classList.add("sinmarcar");

          // y resolvemos el tablero indicando (false), que hemos cometido un fallo
          resolverTablero(false);
        }
      }
    }
  }
}

function resolverTablero(isOK) {
  let modal = document.getElementById("myModal");
  let span = document.getElementById("closeModal");
  let btnResetModal = document.getElementById("btnResetModal");

  let aCasillas = tablero.children;
  for (let i = 0; i < aCasillas.length; i++) {
    // Quitamos los listeners de los eventos a las casillas
    aCasillas[i].removeEventListener("click", destapar);
    aCasillas[i].removeEventListener("contextmenu", marcar);

    let fila = parseInt(aCasillas[i].dataset.fila, 0);
    let columna = parseInt(aCasillas[i].dataset.columna, 0);

    if (aCasillas[i].classList.contains("icon-bandera")) {
      if (buscaminas.aCampoMinas[fila][columna] == "B") {
        // Bandera correcta
        aCasillas[i].classList.add("destapado");
        aCasillas[i].classList.remove("icon-bandera");
        aCasillas[i].classList.add("icon-bomba");
      } else {
        // Bandera errónea
        aCasillas[i].classList.add("destapado");
        aCasillas[i].classList.add("banderaErronea");
        isOK = false;
      }
    } else if (!aCasillas[i].classList.contains("destapado")) {
      if (buscaminas.aCampoMinas[fila][columna] == "B") {
        // Destapamos el resto de las bombas
        aCasillas[i].classList.add("destapado");
        aCasillas[i].classList.add("icon-bomba");
      }
    }
  }

  if (isOK) {
    // Mostrar el modal
    modal.style.display = "block";
  }

  // Cuando el usuario haga clic en <span> (x), cierra el modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Cuando el usuario haga clic en cualquier lugar fuera del modal, ciérralo
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// function resetJuego() {
//   location.reload();
// }

function actualizarNumMinasRestantes() {
  document.querySelector("#numMinasRestantes").innerHTML =
    buscaminas.numMinasTotales - buscaminas.numMinasEncontradas;
}

function reiniciarJuego() {
  // Ocultar el mensaje de felicitación
  let mensajeFelicidades = document.getElementById("mensajeFelicidades");
  mensajeFelicidades.style.display = "none";

  // Reiniciar el juego
  inicio();
}
// Funcion iniciar el juego con parametros exactos (Si quisieramos cambiar los parametros para que salga de otro tamaño cambiarlos aqui...)
function inicio() {
  buscaminas.numFilas = 10;
  buscaminas.numColumnas = 10;
  buscaminas.numMinasTotales = 12;
  pintarTablero();
  generarCampoMinasVacio();
  esparcirMinas();
  contarMinas();
  actualizarNumMinasRestantes();
}

window.onload = inicio;

// Esto es para el boton de jugar con mas celdas etc

document.getElementById("abrirJugarMas").addEventListener("click", function () {
  document.getElementById("formContainer").classList.toggle("hidden");
});

function inicioBoton() {
  if (buscaminas.numColumnas == NaN || buscaminas.numFilas == NaN) {
    location.reload();
  } else {
    // Obtener los campos de entrada por el click
    let numFilasInput = 10;
    let numColumnasInput = 10;
    let numMinasTotalesInput = 12;
    numFilasInput = document.getElementById("numFilas");
    numColumnasInput = document.getElementById("numColumnas");
    numMinasTotalesInput = document.getElementById("numMinasTotales");
    buscaminas.numFilas = parseInt(numFilasInput.value ?? 0, 10);
    buscaminas.numColumnas = parseInt(numColumnasInput.value, 10);
    buscaminas.numMinasTotales = parseInt(numMinasTotalesInput.value, 10);

    // Validar que el número de minas no sea mayor que el total de casillas

    if (
      buscaminas.numMinasTotales >=
      (buscaminas.numFilas * buscaminas.numColumnas) / 2
    ) {
      alert(
        "El número de minas no puede ser mayor que la mitad del total de las casillas."
      );
      return;
    }
  }
  pintarTablero();
  generarCampoMinasVacio();
  esparcirMinas();
  contarMinas();
  actualizarNumMinasRestantes();
}

document.getElementById("iniciarJuego1").addEventListener("click", inicioBoton);

document.getElementById("iniciarJuego2").addEventListener("click", inicioBoton);

function myFunction() {
  document.getElementById("myForm").reset();
}

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-timer");

  let segundos = 0; // Variable para almacenar el tiempo

  // Función para actualizar el temporizador
  function actualizarTemporizador() {
    const minutos = Math.floor(segundos / 60); // Calcula los minutos
    const segundosRestantes = segundos % 60; // Calcula los segundos restantes

    // Formatea el tiempo en minutos y segundos
    const tiempoFormateado =
      (minutos < 10 ? "0" : "") +
      minutos +
      ":" +
      (segundosRestantes < 10 ? "0" : "") +
      segundosRestantes;

    startButton.textContent = tiempoFormateado; // Muestra el tiempo en el botón
    segundos++; // Incrementa el tiempo en 1 segundo
  }

  // Evento de clic en el botón de inicio del temporizador
  startButton.addEventListener("click", function () {
    segundos = 0; // Establece el tiempo en 0
    startButton.textContent = "00:00"; // Actualiza el botón con el tiempo inicial

    // Inicia el temporizador actualizando cada segundo
    setInterval(actualizarTemporizador, 1000);
  });
});
