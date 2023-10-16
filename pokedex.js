
const searchBar= document.getElementById('searchBar');
let imageList = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredImageList = imageList.filter((image) => {
        return (
          image.name.toLowerCase().includes(searchString)
        );
    });
    displayImages(filteredImageList);
});

const loadImage = async () => {
    try {
     
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=250&offset=0')
          .then((response) => response.json())
          .then((data) => {
            const fetchData = data.results.map((item) => {
              return fetch(item.url)
                .then((res) => res.json())
                .then((data) => {
                  return {
                    id: data.id,
                    name: data.name,
                    img: data.sprites.other['official-artwork'].front_default,
                    types: data.types,
                  };
                });
            });
            Promise.all(fetchData).then((res) => {
              imageList = res;
              displayImages(imageList);
            });
          });
      
        
    } catch (err) {
        console.error(err);
    }
};

const displayImages = (imageList) => {
    const cardHtml = imageList.map((image) => {
      return `<div class="image-card">
      <div class="card-title">
      <h2>${image.name}</h2>
      </div>
      <img src="${image.img}" alt="${image.name}"/>
      <span>${image.id}</span>

  </div>`;
    }).join('');

 document.getElementById("imageContainer").innerHTML = cardHtml;
};

loadImage();
