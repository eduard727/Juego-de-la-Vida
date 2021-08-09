

var fil = 50;
var col = 50;
var generacion = 0;
var tiempoGeneracion = 600;
var maximoEjecucion = 600;
var cantVivas = 155;

var matriz = [];
for(var f=0; f < fil; f++) {
    matriz[f] = new Array(col);
}

var txtViva = '<div class="celdaViva">&nbsp;</div>';
var txtMuerta = '<div class="celdaMuerta">&nbsp;</div>';
var txtFL = '<div class="espacio">&nbsp;</div>';

// Inicializa Matriz muerta
for (f = 0; f < fil; f++){
	for (c = 0; c < col; c++){
		matriz[f][c] = 0;
	}
}

// Inicia el proceso
function inicializa() {
	for (i = 0; i < cantVivas; i++){
		f = getRandomInt(0, fil);
		c = getRandomInt(0, col);

		matriz[f][c] = 1;
	}

	dibujarMatriz ();
	setInterval('siguiente()', tiempoGeneracion);
}


// Dibuja la matriz en pantalla
function dibujarMatriz () {
	numCelVivas = 0;
	var dibMatriz = "";
	var panelDibujo = document.getElementById("panelJuego");

	for (f = 0; f < fil; f++){
		var fila = "";
		for (c = 0; c < col; c++){
			if(matriz[f][c] == 1) {
				fila = fila + txtViva;
				numCelVivas++;
			} else
				fila = fila + txtMuerta;
		}
		fila = fila + txtFL;

		dibMatriz = dibMatriz + fila
	}

	document.getElementById("celVivas").innerHTML = "Celulas vivas: " + numCelVivas;
	document.getElementById("generacion").innerHTML = "Generacion: " + generacion;

	panelDibujo.innerHTML = dibMatriz;
}

// Siguiente generación
function siguiente() {
	if(maximoEjecucion <= 0) { return false; }
	maximoEjecucion--;
	var mTMP = [];
	for(var f=0; f < fil; f++) {
	    mTMP[f] = new Array(col);
	}

	for (f = 0; f < fil; f++){
		for (c = 0; c < col; c++){
			cantidadVivas = misVecinas(f, c);
			estado = matriz[f][c];

			// ---- Evaluación de reglas
			if ((estado == 1) & (cantidadVivas <= 1)) {
				estado = 0;
			} else {
				if((estado == 1) & (cantidadVivas >= 5)) {
					estado = 0;
				} else {
					if((estado == 0) & (cantidadVivas == 3)) {
						estado = 1;
					} else {
						if((estado == 1) & (cantidadVivas == 2)) {
							estado = 1;
						} else {
							if((estado == 1) & (cantidadVivas == 3)) {
								estado = 1;
							} else {
								if((estado == 1) & (cantidadVivas == 4)) {
									estado = 1;
								}
							}
						}
					}
				}
			}
			// ----
			mTMP[f][c] = estado;
		}
	}

	matriz = mTMP;
	generacion++;
	dibujarMatriz ();
}

// Evaluación de celulas vecinas
function misVecinas(fila, columna){
	cantidad = 0;

	if ((fila >= 1) & (columna >= 1)){
		if (matriz[fila-1][columna-1] == 1) cantidad++;
	}
	if ((fila >= 1) ) {
		if (matriz[fila-1][columna] == 1) cantidad++;
	}
	if ((fila >= 1) & (columna >= 1)) {
		if (matriz[fila-1][columna+1] == 1) cantidad++;
	}

	if (columna > 1)
	{
		if(matriz[fila][columna-1] == 1) cantidad++;
	}
	if(columna < col){
		if(matriz[fila][columna+1] == 1) cantidad++;
	}

	if ((fila < fil-1) & (columna >= 1)) {
		if(matriz[fila+1][columna-1] == 1) cantidad++;
	}
	if ((fila < fil-1)) {
		if(matriz[fila+1][columna] == 1) cantidad++;
	}
	if ((fila < fil-1) & (columna < col)) {
		if(matriz[fila+1][columna+1] == 1) cantidad++;
	}

	return cantidad;
}

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

