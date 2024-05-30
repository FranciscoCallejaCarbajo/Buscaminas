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


