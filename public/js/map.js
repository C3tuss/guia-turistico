const backendUrl = 'https://guia-turistico-pw4m.onrender.com';

let map;
let markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -2.529, lng: -44.3028 },
    zoom: 7,
  });

  fetch(`${backendUrl}/api/destinos`)
    .then(response => response.json())
    .then(destinos => {
      destinos.forEach(destino => {
        const marker = new google.maps.Marker({
          position: destino.localizacao,
          map: map,
          title: destino.nome,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<h3>${destino.nome}</h3><p>${destino.descricao}</p><img src="${destino.imagem}" alt="${destino.nome}" style="width:100px;height:auto;">`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        markers.push(marker);
      });
    })
    .catch(error => console.error('Erro ao carregar destinos:', error));
}

function buscarDestinos() {
  const nome = document.getElementById('destinoNome').value.trim();
  if (!nome) return;

  fetch(`${backendUrl}/api/buscarDestinos?nome=${encodeURIComponent(nome)}`)
    .then(response => response.json())
    .then(destinos => {
      clearMarkers();
      clearSearchResults();

      if (destinos.length > 0) {
        const resultadoBusca = document.getElementById('resultadoBusca');
        destinos.forEach(destino => {
          const listItem = document.createElement('li');
          listItem.textContent = destino.nome;
          listItem.onclick = () => {
            map.setCenter(destino.localizacao);
            map.setZoom(10);
          };

          resultadoBusca.appendChild(listItem);

          const marker = new google.maps.Marker({
            position: destino.localizacao,
            map: map,
            title: destino.nome,
          });

          markers.push(marker);

          const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${destino.nome}</h3><p>${destino.descricao}</p><img src="${destino.imagem}" alt="${destino.nome}" style="width:100px;height:auto;">`,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
      }
    })
    .catch(error => console.error('Erro ao buscar destinos:', error));
}

function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

function clearSearchResults() {
  const resultadoBusca = document.getElementById('resultadoBusca');
  resultadoBusca.innerHTML = '';
}
