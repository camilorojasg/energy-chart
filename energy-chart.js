/*
+ - - - - - - - - - - - - - - +
|       Energy Chart v3.0     |
|	Por Camilo R. Rojas García  |
|           24-03-2014        |
+ - - - - - - - - - - - - - - +
*/


/*
/ Crear arreglo de 'length' tamaño de valores 'value'.
*/
function crearArreglo(value, length){
	var arr = [], i = length;
	while (i--) {
		arr[i] = value;
	}
	return arr;
}

/*
/ Definir arreglo de datos
*/
var datos = crearArreglo(0, 20);
var ps = crearArreglo(0, 20);
var pr = crearArreglo(0, 20);


/*
/ Agrega un dato nuevo a la gráfica.
/ Crea una animación de posición con 'num' si 'anim' es 'true'.
*/
function crear(dato,dato_ps,dato_pr,anim,num){
	if(dato_pr < 1.4) dato = 0;
	dato_ps = dato_ps * 0.625;
	dato_pr = dato_pr * 0.625;
	dato *= 250;
	var c = document.getElementById('rt_grafica');
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,640,300);
	secs(ctx);
	lineas(ctx);

	var x_ps=-120;
	var x_pr=-120;
	var x = -120;
	var i = 0;

	if(anim){
		while(i<=18){
			datos[i] = datos[i+1];
			ps[i] = ps[i+1];
			pr[i] = pr[i+1];
			i++;
		}
		datos[19] = dato;
		ps[19] = dato_ps;
		pr[19] = dato_pr;
	}else{
		x += num;
		x_ps += num;
		x_pr += num;
	}

	i = 0;
	ctx.beginPath();
	while(i <= 19){
		x_ps += 40;
		ctx.strokeStyle="FF9999";
	ctx.moveTo(x_ps+5,275);
	ctx.lineTo(x_ps+5,275-pr[i]);
		i++;
	}

	ctx.lineWidth=8;
	ctx.stroke();

	i = 0;
	ctx.beginPath();
	while(i <= 19){
		x_pr += 40;
		ctx.strokeStyle="9999FF";
	ctx.moveTo(x_pr-5,275);
	ctx.lineTo(x_pr-5,275-ps[i]);
		i++;
	}

	ctx.lineWidth = 8;

	ctx.stroke();
	i = 0;

	ctx.beginPath();
	ctx.strokeStyle = '#00AA00';
	ctx.lineWidth = 2;
	ctx.moveTo(0,200-datos[0]);

	while(i <= 19){
		x += 40;
		ctx.lineTo(x,275-datos[i]);
		i++;
	}
	ctx.stroke();

	x =- 120;

	if(!anim){
		x += num;
		x_ps += num;
		x_pr += num;
	}

	i = 0;

	while(i <= 19){
		x += 40;
		marcador(ctx,x,datos[i]);
		i++;
	}

	textos(ctx);

	if(anim){
		setTimeout(function(){crear(0,0,0,false,-4)},20);
		setTimeout(function(){crear(0,0,0,false,-8)},40);
		setTimeout(function(){crear(0,0,0,false,-12)},60);
		setTimeout(function(){crear(0,0,0,false,-16)},80);
		setTimeout(function(){crear(0,0,0,false,-20)},100);
		setTimeout(function(){crear(0,0,0,false,-24)},120);
		setTimeout(function(){crear(0,0,0,false,-28)},140);
		setTimeout(function(){crear(0,0,0,false,-32)},160);
		setTimeout(function(){crear(0,0,0,false,-36)},180);
		setTimeout(function(){crear(0,0,0,false,-40)},200);
	}
}


/*
/ Agrega marcadores en cada dato de la gráfica.
*/
function marcador(context,x,y){
      var radius = 4;
      context.beginPath();
      context.arc(x, 275-y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = '#CCCCCC';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = '#389003';
      context.stroke();
  }


/*
/ Agregar líneas y unidades de medida.
*/
function lineas(ctx){
	ctx.beginPath();
	ctx.textBaseline="top";
	ctx.font="15px Arial"
	ctx.strokeStyle = '#DDDDDD';
	ctx.moveTo(0,275);
	ctx.lineTo(640,275);
	ctx.moveTo(0,212);
	ctx.lineTo(640,212);
	ctx.moveTo(0,150);
	ctx.lineTo(640,150);
	ctx.moveTo(0,87);
	ctx.lineTo(640,87);
	ctx.moveTo(0,25);
	ctx.lineTo(640,25);
	ctx.lineWidth = 2;
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = 8;
	ctx.moveTo(565,12);
	ctx.lineTo(575,12);
	ctx.strokeStyle = '#33AA33';
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(35,12);
	ctx.lineTo(45,12);
	ctx.strokeStyle = '#9999FF';
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(125,12);
	ctx.lineTo(135,12);
	ctx.strokeStyle = '#FF9999';
	ctx.stroke();
	ctx.setLineDash([]);

}

/*
/ Agrega textos a la gráfica
*/
function textos(ctx){
	ctx.textAlign="start";
	ctx.fillStyle = '#555555';
	ctx.fillText("400",10,25);
	ctx.fillText("300",10,87);
	ctx.fillText("200",10,150);
	ctx.fillText("100",10,212);
	ctx.fillText("0",10,275);

	ctx.textBaseline="bottom";
	ctx.textAlign="start";
	ctx.fillText("P[W]",140,20);
	ctx.textAlign="center";
	ctx.fillText("S[VA]",70,20);
	ctx.textAlign="end";
	ctx.fillText("PF",600,20);

	ctx.textBaseline="top";
	ctx.textAlign="end";
	ctx.fillText("1",630,25);
	ctx.fillText("0.75",630,87);
	ctx.fillText("0.5",630,150);
	ctx.fillText("0.25",630,212);
	ctx.fillText("0",630,275);
}


/*
/ Agregar líneas y unidades de medida.
*/
function secs(ctx){
	var cont;
	ctx.beginPath();
	ctx.setLineDash([3]);
	ctx.strokeStyle = '#BBBBBB';
	for(cont = 40; cont <= 600; cont+=40){
		ctx.moveTo(cont,0);
		ctx.lineTo(cont,300);
	}
	ctx.stroke();
	ctx.textAlign="start";
	ctx.fillText("Segundos",287,275);
	ctx.setLineDash([]);
}


/*
/ Recibe datos del socket
*/
socket = io.connect('YOUR SOCKET.IO URL');

	socket.on('peticion', function(dato){
		crear(dato.fP,dato.pA,dato.pR,true,0);
		document.formulario.voltaje.value = dato.v;
		document.formulario.corriente.value = dato.c;
		document.formulario.fP.value = dato.fP;
		document.formulario.pA.value = dato.pA;
		document.formulario.pR.value = dato.pR;
	});
