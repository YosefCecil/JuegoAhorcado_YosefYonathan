function app() {
    var canvas = document.getElementById("lienzo");

    /* Atributos de canvas */
    canvas.width = 800;
    canvas.height = 600;

    /* Estilos de canvas */
    canvas.style.border = "2px solid black";
    canvas.style.backgroundImage = "url('./img/bgAhorcado.png')"

    /* Contexto del canvas */
    var context = canvas.getContext("2d");

    /* Objeto del juego del gato */
    const ahorcado =
    {

        categoria: "Animales",
        palabras: 
        [
            ["LORO", "LEON", "GATO", "PERICO", "PERRO", "CERDO", "DELFIN", "ARDILLA", "ARMADILLO", "GUACAMAYA"]
        ],

        estados: 
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],

        letra: -1,
        letraSeleccionada: "",
        fila: 0,
        elemento: 0,
        posicionX: 0,
        posicionY: 0,
        aciertos: 0,
        victorias: 0,
        intentos: 6,
        validarMovimiento: false,
        juegofinalizado: 0,
        img: new Image(),

        dasboard: function ()
        {

            context.clearRect(160, 20, 52, 30);
            context.clearRect(300, 20, 145, 30);
            context.clearRect(750, 20, 32, 30);
            context.clearRect(246, 36, 52, 30);

            context.fillStyle = "#000000"
            context.font = "21px Arial";
            context.fillText("Victorias:", 50, 35);
            context.fillText(ahorcado.victorias, 160, 35);
            context.fillText("Categoria:", 300, 35);
            context.fillText(ahorcado.categoria, 420, 35); 
            context.fillText("Intentos restantes:", 550, 35);
            context.fillText(ahorcado.intentos, 750, 35); 
            
        },
        pintarLineas: function() 
        {
            context.clearRect(400, 184, 490, 15);

            var cantidadLetras = ahorcado.palabras[0][ahorcado.victorias].length;
            var inicioLinea = 250;
            var finLinea = 290;
            for (a = 0; a < cantidadLetras; a++) 
            {
                context.beginPath();
                context.strokeStyle = '#000000';
                context.moveTo(inicioLinea, 520)
                context.lineTo(finLinea, 520);
                context.stroke();

                inicioLinea += 60;
                finLinea += 60;
            }
        },
        seleccionar: function (e) 
        {
            var x = e.offsetX;
            var y = e.offsetY;

            var coordenadas = document.getElementById("posicion");
            coordenadas.innerHTML = "coordenadas:  X: " + x + " Y: " + y;

            var contLetras = 0;
            var posicionX1 = 306;
            var posicionX2 = 352;
            var posicionY1 = 69;
            var posicionY2 = 128;
            ahorcado.letra = -1;

            if (ahorcado.juegofinalizado == 0) 
            {
                for (fila = 0; fila < 3; fila++) 
                {
                    for (elemento = 0; elemento < 9; elemento++) 
                    {
                        if (x > posicionX1 & x < posicionX2 & y > posicionY1 & y < posicionY2 & ahorcado.estados[fila][elemento] == 0) 
                        {
                            context.fillStyle = "rgb(130, 145, 131, 0.1)";
                            context.fillRect(posicionX1, posicionY1, 45, 61);
                            ahorcado.letra = contLetras;
                            ahorcado.fila = fila;
                            ahorcado.elemento = elemento;
                            ahorcado.posicionX = posicionX1;
                            ahorcado.posicionY = posicionY1;
                            ahorcado.validarMovimiento = true;
                        }
                        else if (ahorcado.estados[fila][elemento] == 0) 
                        {
                            context.clearRect(posicionX1, posicionY1, 45, 61);
                        };
                        posicionX1 += 51;
                        posicionX2 += 51;
                        contLetras++;
                    }
                    posicionX1 = 306;
                    posicionX2 = 352;
                    posicionY1 += 65;
                    posicionY2 += 65;
                }
            };

            if (ahorcado.juegofinalizado != 0) 
            {
                ahorcado.validarMovimiento = false;
            }

            if (x > 534 & x < 606 & y > 388 & y < 450) 
            {
                ahorcado.validarMovimiento = true;
                ahorcado.letra = 27;
            }
            if (x > 580 & x < 760 & y > 540 & y < 572  & ahorcado.juegofinalizado == 1) 
            {
                ahorcado.validarMovimiento = true;
                ahorcado.letra = 28;
            }
            if (x > 54 & x < 203 & y > 540 & y < 572 & ahorcado.juegofinalizado == 2) 
            {
                ahorcado.validarMovimiento = true;
                ahorcado.letra = 29;
            }        
        },
        activarEstados: function ()
        {

            if (ahorcado.validarMovimiento) 
            {
                if (ahorcado.letra == 27) 
                {
                    ahorcado.limpiar();
                }
                else if(ahorcado.letra == 28)
                {
                    ahorcado.siguientePalabra();
                }
                else if(ahorcado.letra==29)
                {
                    ahorcado.repetirPalabra();
                }
                else 
                {
                    ahorcado.letraElegida();
                    ahorcado.analizar();
                }
            }
        },
        letraElegida: function () 
        {
            ahorcado.letraSeleccionada = "";

            switch (ahorcado.letra) {
                case 0:
                    ahorcado.letraSeleccionada = "A";
                    break;
                case 1:
                    ahorcado.letraSeleccionada = "B";
                    break;
                case 2:
                    ahorcado.letraSeleccionada = "C";
                    break;
                case 3:
                    ahorcado.letraSeleccionada = "D";
                    break;
                case 4:
                    ahorcado.letraSeleccionada = "E";
                    break;
                case 5:
                    ahorcado.letraSeleccionada = "F";
                    break;
                case 6:
                    ahorcado.letraSeleccionada = "G";
                    break;
                case 7:
                    ahorcado.letraSeleccionada = "H";
                    break;
                case 8:
                    ahorcado.letraSeleccionada = "I";
                    break;
                case 9:
                    ahorcado.letraSeleccionada = "J";
                    break;
                case 10:
                    ahorcado.letraSeleccionada = "K";
                    break;
                case 11:
                    ahorcado.letraSeleccionada = "L";
                    break;
                case 12:
                    ahorcado.letraSeleccionada = "M";
                    break;
                case 13:
                    ahorcado.letraSeleccionada = "N";
                    break;
                case 14:
                    ahorcado.letraSeleccionada = "Ñ";
                    break;
                case 15:
                    ahorcado.letraSeleccionada = "O";
                    break;
                case 16:
                    ahorcado.letraSeleccionada = "P";
                    break;
                case 17:
                    ahorcado.letraSeleccionada = "Q";
                    break;
                case 18:
                    ahorcado.letraSeleccionada = "R";
                    break;
                case 19:
                    ahorcado.letraSeleccionada = "S";
                    break;
                case 20:
                    ahorcado.letraSeleccionada = "T";
                    break;
                case 21:
                    ahorcado.letraSeleccionada = "U";
                    break;
                case 22:
                    ahorcado.letraSeleccionada = "V";
                    break;
                case 23:
                    ahorcado.letraSeleccionada = "W";
                    break;
                case 24:
                    ahorcado.letraSeleccionada = "X";
                    break;
                case 25:
                    ahorcado.letraSeleccionada = "Y";
                    break;
                case 26:
                    ahorcado.letraSeleccionada = "Z";
                    break;
            }
        },
        analizar: function () 
        {

            for (numeroLetra = 0; numeroLetra < 27; numeroLetra++) 
            {
                if (ahorcado.letra == numeroLetra) 
                {
                    var verificar = false;
                    var limiteLetra = 1;
                    for (comparar = 0; comparar < ahorcado.palabras[0][ahorcado.victorias].length; comparar++) 
                    {

                        if (ahorcado.letraSeleccionada == ahorcado.palabras[0][ahorcado.victorias].slice(comparar, limiteLetra)) 
                        {
                            context.fillStyle = "#09F714 "
                            context.fillRect(ahorcado.posicionX, ahorcado.posicionY, 45, 61);
                            ahorcado.estados[ahorcado.fila][ahorcado.elemento] = 1;
                            ahorcado.pintarPalabra();
                            verificar = true;
                            break;
                        } 
                        else 
                        {
                            context.fillStyle = "red";
                            context.fillRect(ahorcado.posicionX, ahorcado.posicionY, 45, 61);
                            ahorcado.estados[ahorcado.fila][ahorcado.elemento] = 1;
                        }
                        limiteLetra++;
                    }
                    if (verificar == false) 
                    {
                        ahorcado.intentos -= 1;
                        ahorcado.pintarAhorcado();
                    }
                    ahorcado.dasboard();
                }
            }
            if (ahorcado.intentos == 0) 
            {
                ahorcado.pierde();
            }

            if (ahorcado.aciertos == ahorcado.palabras[0][ahorcado.victorias].length) 
            {
                ahorcado.gana();
            }
        },
        pintarPalabra: function () 
        {

            var limiteLetra = 1;
            var posicionLetra = 265;
            context.fillStyle = "#000000";
            context.font = "35px Arial";

            for (inicioLetra = 0; inicioLetra < ahorcado.palabras[0][ahorcado.victorias].length; inicioLetra++) 
            {

                if (ahorcado.letraSeleccionada == ahorcado.palabras[0][ahorcado.victorias].slice(inicioLetra, limiteLetra)) 
                {
                    context.fillText(ahorcado.letraSeleccionada, posicionLetra, 510);
                    ahorcado.aciertos += 1;
                }
                limiteLetra++;
                posicionLetra += 58;
            }
        },
        pintarAhorcado: function () 
        {

            context.clearRect(120, 175, 160, 250);
            context.drawImage(ahorcado.img, 140, 185, 160, 250);

            switch (ahorcado.intentos) 
            {
                case 5:
                    ahorcado.img.src = "./img/woody2.png";
                    break;
                case 4:
                    ahorcado.img.src = "./img/woody3.png";
                    break;
                case 3:
                    ahorcado.img.src = "./img/woody4.png";
                    break;
                case 2:
                    ahorcado.img.src = "./img/woody5.png";
                    break;
                case 1:
                    ahorcado.img.src = "./img/woody6.png";
                    break;
            }
        },
        gana: function () {
            ahorcado.dasboard();
            Swal.fire(
                {
                    imageUrl: './img/ganaste.png',
                    imageHeight: 350,
                    imageWith: 450,
                    imageAlt: 'A tall imag',
                    title: 'Has ganado',
                });

            for (a = 0; a < 3; a++) {
                for (b = 0; b < 9; b++) {
                    ahorcado.estados[a][b] = 0;
                }
            };

            context.fillStyle = "#92FAC1"
            context.fillRect(580, 540, 180, 32);
            context.fillStyle = "#411178"
            context.font = "bold 15px sans-serif";
            context.fillText("SIGUIENTE PALABRA", 594, 560);
            ahorcado.juegofinalizado = 1;
            ahorcado.victorias++;
            ahorcado.dasboard();
        },
        pierde: function () 
        {
            Swal.fire(
                {
                    imageUrl: './img/perdiste.png',
                    imageHeight: 350,
                    imageWith: 450,
                    imageAlt: 'A tall imag',
                    title: 'Has perdido, suerte para la próxima. Reinicia la palabra o el juego.',
                });

            for (a = 0; a < 3; a++) {
                for (b = 0; b < 9; b++) {
                    ahorcado.estados[a][b] = 0;
                }
            };

            context.fillStyle = "#4B574C"
            context.fillRect(54, 540, 180, 32); //455, 455
            context.fillStyle = "red"
            context.font = "bold 15px sans-serif";
            context.fillText("REINICIAR PALABRA", 70, 560);
            ahorcado.juegofinalizado = 2;
        },
        siguientePalabra: function()
        {
            if(ahorcado.victorias == ahorcado.palabras[0].length)
            {
                Swal.fire(
                    {
                        imageUrl: './img/gameover.gif',
                        imageHeight: 350,
                        imageWith: 450,
                        imageAlt: 'A tall imag',
                        title: 'Gracias por jugar. Reinicia el juego.',
                    });            
                    ahorcado.play();
                    ahorcado.juegofinalizado=3;
                }
            else
            {
                ahorcado.juegofinalizado = 0;        
                ahorcado.play();
                ahorcado.pintarLineas();
            }
        },
        repetirPalabra: function()
        {
            ahorcado.juegofinalizado = 0;
            ahorcado.play();
            ahorcado.pintarLineas();
        },
        limpiar: function () 
        {
            ahorcado.victorias = 0
            ahorcado.juegofinalizado = 0;

            ahorcado.play();
        },
        play: function () 
        {
            for (a = 0; a < 3; a++) 
            {
                for (b = 0; b < 9; b++) 
                {
                    ahorcado.estados[a][b] = 0;
                }
            }
            canvas.addEventListener("mousedown", ahorcado.activarEstados, false);
            context.clearRect(0, 60, 800, 600);
            ahorcado.img.src = "./img/woody1.png";
            ahorcado.intentos = 6;
            ahorcado.aciertos = 0;
            ahorcado.letraSeleccionada = "";
            ahorcado.validarMovimiento = true;
            ahorcado.pintarLineas();
            ahorcado.dasboard();
        }
    }
    canvas.addEventListener("mousemove", ahorcado.seleccionar);
    ahorcado.play(true);
    ahorcado.pintarLineas();
}

window.onload = function () 
{
    app();
}