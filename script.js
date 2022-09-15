; (function () {
    'use strict'
  
    var palabras = [
      'ALURA',
      'HTML',
      'PHP',
      'JAVASCRIPT',
      'ORACLE',
      'NETBEANS'
    ]
  
    // variable para almacenar la configuracion actual
    var juego = null
    //Para saber si se envio alguna alerta
    var finalizado = false
  
  
    var $html = {
      hombre: document.getElementById('hombre'),
      adivinado: document.querySelector('.adivinado'),
      errado: document.querySelector('.errado'),
      explosion:document.getElementById('explosion')
    }
  
  
  
    function dibujar(juego) {
      // Actualizar la imagen del encarcelado
      var $elem
  
      $elem = $html.hombre
      var estado = juego.estado
     
      if (estado === 8) {
        estado = juego.previo
      }
      $elem.src = './imagenes/estados/0' + estado + '.png'
      
  
      // Creamos las letras adivinadas
      var palabra = juego.palabra
      var adivinado = juego.adivinado
      $elem = $html.adivinado
      // borramos los elementos anteriores
      $elem.innerHTML = ''
      for (let letra of palabra) {
        let $span = document.createElement('span')
        let $txt = document.createTextNode('')
        if (adivinado.has(letra)) {
          $txt.nodeValue = letra
        }
        $span.setAttribute('class', 'letra adivinada')
        $span.appendChild($txt)
        $elem.appendChild($span)
      }
  
      //letras erradas
      var errado = juego.errado
      $elem = $html.errado
      // se eliminan los elementos anteriores
      $elem.innerHTML = ''
      for (let letra of errado) {
        let $span = document.createElement('span')
        let $txt = document.createTextNode(letra)
        $span.setAttribute('class', 'letra errada')
        $span.appendChild($txt)
        $elem.appendChild($span)
      }
    }
  
    function adivinar(juego, letra) {
      var estado = juego.estado
      // Si  se perdio, o gano, no hay que hacer nada
      if (estado === 1 || estado === 8) {
        return
      }
  
      var adivinado = juego.adivinado
      var errado = juego.errado
      // Si ya hemos adivinado o errado la letra, no hay que hacer nada
      if (adivinado.has(letra) || errado.has(letra)) {
        return
      }
  
      var palabra = juego.palabra
      var letras = juego.letras
      var estado = juego.estado
     
    
    
  
      
  
      // Si es letra de la palabra
      if (letras.has(letra)) {
        // agregamos a la lista de letras adivinadas
        adivinado.add(letra)
  
        // actualizamos las letras restantes
        juego.restante--
  
        //Se debe indicar si se gano
        if (juego.restante === 0) {
          juego.previo = juego.estado
          juego.estado = 8
        }
      } else {
        // Si no es la letra, el hombre se encarcela
        juego.estado--
        // Agregamos la letra, a la lista de letras erradas
        errado.add(letra)
       
      }
    }
  var $explosion = $html.explosion
  
    window.onkeypress = function adivinarLetra(e) {
      var letra = e.key
      letra = letra.toUpperCase()
      if (/[^A-ZÑ]/.test(letra)) {
        return
      }
      adivinar(juego, letra)
      var estado = juego.estado
      if (estado === 8 && !finalizado) {
        setTimeout(alertaGanado, 1000)
      
        finalizado = true
      } else if (estado === 1 && !finalizado) {
        let palabra = juego.palabra
        let fn = alertaPerdido.bind(undefined, palabra)
        setTimeout(fn, 1000)
  
        finalizado = true
      }
      dibujar(juego)
    }
    window.iniciarJuego = function iniciarJuego() {
      document.querySelector('.logoInicio').style.display = "none";
      document.querySelector('.botonesInicio').style.display = "none";
      document.querySelector('.juego').style.visibility = "visible";
    }
    window.agregarPalabra = function agregarPalabra() {
      let dato = document.getElementById("texto").value;
      document.getElementById("texto").style.visibility = "visible";
      palabras.push(dato);
      document.getElementById('texto').value = '';
      console.log(palabras)
    }
    window.nuevoJuego = function nuevoJuego() {
      var palabra = palabraAleatoria()
      juego = {}
      juego.palabra = palabra
      juego.estado = 7
      juego.incorrecto=7
      juego.estadoIncorrecto= 7
      juego.adivinado = new Set()
      juego.errado = new Set()
      finalizado = false
  
      var letras = new Set()
      for (let letra of palabra) {
        letras.add(letra)
      }
      juego.letras = letras
      juego.restante = letras.size
  
      dibujar(juego)
  
    }
  
    window.desistir = function desistir() {
      
    var $elem=$html.hombre
    var $explosion=$html.explosion
    var palabra = juego.palabra
  swal({
    title:'Desististe',
    text: 'La palabra era ' + palabra,
    button: 'cerrar',
    dangerMode:true,
    icon:'https://img.wattpad.com/2ecab4707ac27cf1a27e00e44888a710b125e50c/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5937795956686b57444b367377513d3d2d3232392e313530373535393332666465333234643230373335333733313234392e676966'
  
  });
   $elem.src='imagenes/estados/01.png'
  
  
    }
  
  
    function palabraAleatoria() {
      var index = ~~(Math.random() * palabras.length)
      return palabras[index]
    }
  
    function alertaGanado() {
      swal({
        title:'Felicidades!',
        text:'Has ganado',
      icon:'https://acegif.com/wp-content/uploads/thumbs-up-78.gif',
      button:'Cerrar',
      dangerMode:'true'
  
    });
      nuevoJuego()
    }
  
    function alertaPerdido(palabra) {
  
      swal({
        title:'lo siento!',
        text:'has perdido la palabra era ' + palabra,
        icon:'https://c.tenor.com/Ff2re2ArPSAAAAAM/perdimos-derrota.gif',
        button:'cerrar',
        dangerMode:'true'
      });
      nuevoJuego()
    
  
    }
  
    nuevoJuego()
  
  
  
  }())