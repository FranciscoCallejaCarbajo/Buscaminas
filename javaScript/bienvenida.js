const mensaje = document.querySelector(".titulo");
let texto = "Welcome";

// Funcion para hacer el efecto de escritura
function efecto (elemento, texto, i = 0){
    if (i < texto.length){
        elemento.textContent += texto [i];
        setTimeout(() => efecto(elemento,texto, i + 1), 600);
    } else {
        setTimeout(() => borrarTexto(elemento), 1000);
    }
}

// Funcion para borrar el efecto y produzca un bucle
function borrarTexto (elemento){
    elemento.textContent = ' ';
    setTimeout(() => efecto(elemento, texto), 800);
}

// Ejecutar la funcion texto
efecto(mensaje,texto);

let coche1 = document.getElementById("coche");
let autobus1 = document.getElementById("autobus");
function movimiento (t=0, a=0, cc=0){
    if (t<120){
        coche1.style.marginLeft= (t*1.5) + `vw`;
        setTimeout(() => movimiento(t + 1), 60);
    }else if (a<120) {
        autobus1.style.display= `flex`;
        autobus1.style.marginLeft= a + `vw`;
        setTimeout(() => movimiento(t + 1, a + 1), 60);
    }
}

function invertirImagenCoche() {
    
    if (coche1.style.transform === "scaleX(1)") {
      coche1.style.transform = "scaleX(-1)";
    } else {
      coche1.style.transform = "scaleX(1)";
    }
  }
  function invertirImagenAutobus() {
    
    if (autobus1.style.transform === "scaleX(1)") {
      autobus1.style.transform = "scaleX(-1)";
    } else {
      autobus1.style.transform = "scaleX(1)";
    }
  }
function vuelta(){
    let estiloscoche = getComputedStyle(coche1);
    let estilosaut = getComputedStyle(autobus1);
    let margautobus = estilosaut.marginLeft;
    let margcoche = estiloscoche.marginLeft;
    if(margautobus>0){
        autobus1.style.marginLeft= margautobus + `vw`;
        setTimeout(() => vuelta(margautobus-1), 60);
    }

}
movimiento()
invertirImagenAutobus()
vuelta()


efecto(mensaje,texto);

