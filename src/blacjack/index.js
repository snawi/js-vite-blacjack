import _ from 'underscore'





//VARIABLES

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'K', 'Q'];

let puntosJugador = 0;
let puntosComputadora = 0



// referencias del html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');



/* console.log(btnPedir) */

const puntosmall = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas')
/* console.log(divCartasJugador) */

const computadoraCartas = document.querySelector('#computadoraCartas')
/* console.log(divCartasJugador) */


//___________________________________________________________________





// esta funcion crea un nuevo deck o baraja
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo)
        }
    }

    for( let tipo of tipos) {
        for( let esp of especiales){
            deck.push( esp + tipo );
        }
    }


    /* console.log(deck) */

    deck = _.shuffle( deck )

    console.log(deck)

    return deck;

}

crearDeck()



//nota cuando se repiten lineas son sintomas de que podemos recortarlo
// utilizamos una liberira externa para varajiar el arreglo deck




//esta funcion me permite tomar una carta
const pedirCarta = () => {

    if( deck.length === 0){
        throw 'Ya no hay mas cartas en el deck'
    }


    const carta = deck.pop()

    

    return carta;
}

/* for( let i= 0; i <= 100; i++){
    pedirCarta();
} */


// esta funcion me permite saber el valor de la carta
const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length -1);
    
    return ( isNaN( valor)) ?
            ( valor === 'A') ? 11 : 10
            : valor * 1;


}

//_____________________________________________________________________________________


// turno de la computadora

const turnoComputadora = ( puntosMinimos ) => {

    do{
        const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta( carta );
    /* console.log(puntosJugador) */
    puntosmall[1].innerText = puntosComputadora;
    /* console.log(carta) */

    // agregar la imagen
    const imgCarta = document.createElement('img');
    imgCarta.src = `public/assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta')
    computadoraCartas.append( imgCarta )
    
    if( puntosMinimos > 21){
        break;
    }


    }while((puntosComputadora < puntosMinimos) && ( puntosMinimos <=21 ))


}






const valor = valorCarta(pedirCarta())




//__________________________________________________________________
/* funcion para el boton nuevoJuego */

btnNuevo.addEventListener('click', () => {
    deck = []
});





//____________________________________________________________________

//evento del boton pedir, se lee asi cuando se haga click en ese boton has esto, colocamos un callback es una funcion


btnPedir.addEventListener('click', () => {



    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    /* console.log(puntosJugador) */
    puntosmall[0].innerText = puntosJugador;
    /* console.log(carta) */

    // agregar la imagen
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta')
    divCartasJugador.append( imgCarta )


    // preguntar si se pasa del 21 pierde y bloqueamos el boton
    if( puntosJugador > 21 ) {
        /* console.log('lo siento perdiste') */
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora( puntosJugador )
    }else if( puntosJugador === 21){
        btnPedir.disabled = true
        btnDetener.disabled = true
        /* console.log('felicitaciones ganaste') */
        turnoComputadora( puntosJugador )
    }


})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true
    btnDetener.disabled = true

    turnoComputadora( puntosJugador)
})


//______________________________________________________________________


const ensayo = document



























