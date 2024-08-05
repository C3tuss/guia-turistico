let map;
let markers = []; // Array para armazenar os marcadores

function initMap() {
  // Inicializa o mapa centrado no Maranhão
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -2.529, lng: -44.3028 }, // Coordenadas de São Luís, Maranhão
    zoom: 7,
  });

  // Carregar os destinos e adicionar marcadores
  fetch('/api/destinos')
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

          // Carregar atrativos para o destino clicado
          fetch(`/api/atrativos/${destino._id}`)
            .then(response => response.json())
            .then(atrativos => {
              let atrativosContent = '<h4>Atrações</h4><ul>';
              atrativos.forEach(atrativo => {
                atrativosContent += `<li><b>${atrativo.nome}</b> (${atrativo.tipo}): ${atrativo.descricao} <br> <i>Dicas:</i> ${atrativo.dicas}</li>`;
              });
              atrativosContent += '</ul>';
              infoWindow.setContent(`<h3>${destino.nome}</h3><p>${destino.descricao}</p><img src="${destino.imagem}" alt="${destino.nome}" style="width:100px;height:auto;">${atrativosContent}`);
              infoWindow.open(map, marker);
            })
            .catch(error => console.error('Erro ao carregar atrativos:', error));
        });

        markers.push(marker); // Adiciona o marcador ao array
      });
    })
    .catch(error => console.error('Erro ao carregar destinos:', error));
}

function buscarDestinos() {
  const nome = document.getElementById('destinoNome').value.trim();
  console.log('Buscando destinos com nome:', nome);

  if (!nome) {
    console.log('Nome do destino não fornecido.');
    return;
  }

  fetch(`/api/buscarDestinos?nome=${encodeURIComponent(nome)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      return response.json();
    })
    .then(destinos => {
      console.log('Destinos recebidos:', destinos);

      if (!Array.isArray(destinos)) {
        throw new Error('A resposta da API não é um array');
      }

      // Limpa a lista de resultados da busca
      clearSearchResults();

      if (destinos.length > 0) {
        const resultadoBusca = document.getElementById('resultadoBusca');

        destinos.forEach(destino => {
          const listItem = document.createElement('li');
          listItem.textContent = destino.nome;
          listItem.onclick = () => {
            // Centraliza o mapa no destino clicado
            map.setCenter(destino.localizacao);
            map.setZoom(10); // Ajuste o nível de zoom conforme necessário
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
  // Remove todos os marcadores do mapa e limpa a lista
  markers.forEach(marker => marker.setMap(null));
  markers = []; // Limpa o array de marcadores
}

function clearSearchResults() {
  // Limpa a lista de resultados da busca
  const resultadoBusca = document.getElementById('resultadoBusca');
  resultadoBusca.innerHTML = '';
}