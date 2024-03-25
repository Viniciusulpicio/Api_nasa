document.addEventListener("DOMContentLoaded", function() {
    getAPOD(); // Load APOD image on page load
});

// function getConselho() {
//     fetch("https://api.adviceslip.com/advice")
//         .then(response => response.json())
//         .then(data => {
//             document.querySelector(".texto_conselho").innerText = data.slip.advice;
//         })
//         .catch(error => console.error("Erro ao obter o conselho:", error));
// }

function getAPOD() {
    const chaveAPI = 'Y1N3yhCDaMQmAgq1c4OyCL6Rg7hcwtLhM53vUC4W';
    const dataAleatoria = getDataAleatoria();
    
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${chaveAPI}&date=${dataAleatoria}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.media_type === 'image') {
                const titulo = data.title;
                const descricao = data.explanation;
                const urlImagem = data.url;

                const img = document.createElement('img');
                img.src = urlImagem;
                img.alt = titulo;

                const tituloElemento = document.createElement('h3');
                tituloElemento.innerText = titulo;

                const descricaoElemento = document.createElement('p');
                descricaoElemento.innerText = descricao;

                document.getElementById('apod').innerHTML = '';
                document.getElementById('apod').appendChild(tituloElemento);
                document.getElementById('apod').appendChild(descricaoElemento);
                document.getElementById('apod').appendChild(img);
            } else {
                console.log('O APOD de hoje é um vídeo. Não é possível baixar.');
            }
        })
        .catch(error => console.error('Erro ao fazer a solicitação:', error));
}

function getDataAleatoria() {
    const inicio = new Date(1995, 5, 16); // A data mínima da API APOD
    const fim = new Date(); // A data atual
    return new Date(inicio.getTime() + Math.random() * (fim.getTime() - inicio.getTime())).toISOString().split('T')[0];
}
