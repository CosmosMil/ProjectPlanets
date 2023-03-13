const fetchData = () => {

    let urlsArray = ['https://api.le-systeme-solaire.net/rest/bodies/{soleil}', 'https://api.le-systeme-solaire.net/rest/bodies/{lune}']
    const promisesArray = urlsArray.map((url) => {
        return fetch(url).then((response) => { return response.json() }).then((result) => {
            
            console.log('results :>> ', result);
            return result;
        })
    })
    console.log('promisesArray :>> ', promisesArray);
    Promise.all(promisesArray)
        .then((res) => {
            console.log('res :>> ', res);
            createCards(res);
        }).catch((error) => console.log(error));
};

fetchData();

function createCards(array) {
  console.log(array);

  const container = document.getElementById("sun-moon-cards");
  
  for (let i = 0; i < array.length; i++) {
    const card = document.createElement("div");
    card.setAttribute("id", array[i].englishName);
    card.className = "card mb-3 rounded";
    container.append(card);

    const planetName = document.createElement("h5");
    planetName.innerHTML = array[i].englishName;
    planetName.className = "row g-0";

    const image = document.createElement("img");
    image.className = "img-fluid rounded";
    image.setAttribute("src", "../images/" + array[i].englishName + ".png");
    card.append(image);

    const details = document.createElement("ul");
    details.className = "card-text";
    card.append(planetName, details);

    const radius = document.createElement("li");


    radius.innerHTML = "Radius: " + Math.round(array[i].meanRadius) + " km";

    details.append(
      radius
    );
  }
}
 