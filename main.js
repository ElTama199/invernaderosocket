var Socket = new WebSocket('ws://nodeinvernadero.ddns.net:81');
var ultimo;

var riegoultimo;
Socket.onmessage = function (e) {
  var datos = e.data;
  datos = JSON.parse(datos);
  var temp = datos.Temperature;
  var hum = datos.Humedad;
  var estado = datos.led;
 var riego = datos.riego;
  var dad = datos.tierra;
  var prueba = "<h2>Humedad de la Tierra</h2><h3 id ='prueba'>" + dad + "</h3>";
   document.getElementById("hts").innerHTML = prueba;

if (riegoultimo!=riego) {
  
  if (riego==1) {
    var riegodad = "<h4>riego por hora</h4><input type='image' src='img/ledencendido.png' id='botonimg' onclick='riegoautomatico()';>";
    document.getElementById("riego").innerHTML = riegodad;
    riegoultimo=riego;
  } else if(riego==0){
    
    var riegodad = "<h4>riego Automatico</h4><input type='image' src='img/ledapagado.png' id='botonimg' onclick='horariego()'; >";

    document.getElementById("riego").innerHTML = riegodad;
    riegoultimo=riego;
  }

}
  if (estado != ultimo) {
    if (estado == 1) {
      var html = "<input type='image' src='img/ledencendido.png' id='botonimg' onclick='off()';>";

      ultimo = estado;
      document.getElementById("led").innerHTML = html;

    }
    else if (estado == 0) {
      var html = "<input type='image' src='img/ledapagado.png' id='botonimg' onclick='on();'> ";

      ultimo = estado;
      document.getElementById("led").innerHTML = html;

    }
  }



  var temperartura = parseInt(temp);
  var humeda = parseInt(hum);

  drawDial(temperartura, '#ff5600');
  drawHumedad(humeda, 'blue');
};

function enviarhora() {
  var hora=document.getElementById("time").value;
  alert(hora);
}
function horariego() {
  var pass = localStorage.getItem("nombre");
  var dato = "{ 'pass':'"+pass+"','status': 'cambio','valor':'hora'}";
  Socket.send(dato);
}


function riegoautomatico() {
  var pass = localStorage.getItem("nombre");
  var dato = "{ 'pass':'"+pass+"','status': 'cambio','valor':'automatico'}";
  Socket.send(dato);
}




function login() {
  var pass = document.getElementById("pass").value;
  localStorage.setItem("nombre",pass);
  
}

function on() {
  var pass = localStorage.getItem("nombre");
  var dato = "{ 'pass':'"+pass+"','status': 'led','valor':'on'}";
  Socket.send(dato);
}
function off() {
  var pass = localStorage.getItem("nombre");
  var dato = "{'pass':'"+pass+"','status':'led','valor': 'off'}";
  Socket.send(dato);
}
drawDial(0, '#ff5600');
function drawDial(distancia, color) {
  var dialCanv = document.getElementById('dial');
  var ctx = dialCanv.getContext("2d");
  dialCanv.height = dialCanv.offsetHeight * 2;
  dialCanv.width = dialCanv.offsetWidth * 2;
  var centerX = dialCanv.width / 2;
  var centerY = dialCanv.height / 2;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(centerX, centerY.height / 2);
  ctx.arc(centerX, centerY, centerY * 0.8, Math.PI * 1.5, (Math.PI * 2 * (100 / 100)) + (Math.PI * 1.5), false);
  ctx.lineTo(centerX, centerY);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(centerX, centerY, centerY * 0.65, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.font = "bold 90px sans-serif";
  ctx.fillStyle = color;
  ctx.textBaseline = "center";
  ctx.textAlign = "center";
  ctx.fillText(parseInt(distancia) + " C", centerX, centerY * 1.1);
}
drawHumedad(0, 'blue');
function drawHumedad(hume, color) {
  var humcanvas = document.getElementById('humedad');
  var ctx = humcanvas.getContext("2d");
  humcanvas.height = humcanvas.offsetHeight * 2;
  humcanvas.width = humcanvas.offsetWidth * 2;
  var centerX = humcanvas.width / 2;
  var centerY = humcanvas.height / 2;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(centerX, centerY.height / 2);
  ctx.arc(centerX, centerY, centerY * 0.8, Math.PI * 1.5, (Math.PI * 2 * (100 / 100)) + (Math.PI * 1.5), false);
  ctx.lineTo(centerX, centerY);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(centerX, centerY, centerY * 0.65, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.font = "bold 90px sans-serif";
  ctx.fillStyle = color;
  ctx.textBaseline = "center";
  ctx.textAlign = "center";
  ctx.fillText(parseInt(hume) + "%", centerX, centerY * 1.1);
}


drawHumedad(50, 'blue');