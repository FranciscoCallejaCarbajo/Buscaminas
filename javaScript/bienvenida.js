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
function movimiento (t=-20, a=-20){
    if (t<120){
        coche1.style.marginLeft= (t*1.5) + `vw`;
        setTimeout(() => movimiento(t + 1), 60);
    }else if (a<120) {
        autobus1.style.display= `flex`;
        autobus1.style.marginLeft= a + `vw`;
        setTimeout(() => movimiento(t + 1, a + 1), 60);
        
    }else {invertirImagenAutobus(), vuelta()}
}


  function invertirImagenAutobus() {
      autobus1.style.transform = `scaleX(-1)`;
      coche1.style.transform = `scaleX(-1)`;
  }
  function vuelta (x=119, y=70){
    if (x>=-25){
        autobus1.style.marginLeft= (x) + `vw`;
        setTimeout(() => vuelta(x - 1), 60);
    }else{vueltacoche()}
    }

function vueltacoche(y=119){{
  coche1.style.marginLeft= (y)+ `vw`;
  setTimeout(() => vueltacoche(y - 1), 60);
  autobus1.style.display= `none`;
}
}

movimiento()



// try{invertirImagenAutobus()}catch(error){console.error(error)}

// try{vuelta()}catch(error){console.error("novuelve")}



