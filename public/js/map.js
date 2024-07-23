let map;

function initMap() {
  // Inicializa o mapa centrado no Maranhão
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -2.529, lng: -44.3028 }, // Coordenadas de São Luís, Maranhão
    zoom: 7,
  });

  // Carrega os destinos e adiciona marcadores
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
      });
    })
    .catch(error => console.error('Erro ao carregar destinos:', error));
}
