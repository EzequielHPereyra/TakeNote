const form = document.querySelector('#formulario');
const tweetList = document.querySelector('#lista-tweets');
let tweets = [];

eventListener();

function eventListener() {
    form.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];

        console.log(tweets);

        crearHtml();
    })
}


function agregarTweet(e) {
    e.preventDefault();
   

    const tweet = document.querySelector('#tweet').value;
   
    if( tweet === '') {
        error('Un mensaje no puede ir vacio');
        return;
    } 

        const tweetObj = {
            id: Date.now(),
            tweet
        }

       tweets = [...tweets, tweetObj];

      crearHtml();

      form.reset();
}

function error (error) {
    const mensajeError = document.createElement ('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout ( () => {
        mensajeError.remove();
    }, 2500);
}

function crearHtml() {
    clearHtml();

    if ( tweets.length > 0 ) {
        tweets.forEach( tweet => {
            const btnEliminar = document.createElement ('a');
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerText = 'X';
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);
            tweetList.appendChild(li);
        });
    }
   sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet (id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHtml();
}


function clearHtml () {
    while (tweetList.firstChild) {
        tweetList.removeChild(tweetList.firstChild);
    }
}

