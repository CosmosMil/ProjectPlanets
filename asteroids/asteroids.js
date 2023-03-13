const fetchData = (urlEndingValue) => {

  fetch(
    `https://api.le-systeme-solaire.net/rest/bodies/${urlEndingValue}`
  )
    .then((res) => res.json())
    .then((res) => {
      // console.log("fetch result: ", res);
      // console.log('typof res :>> ', typeof res);
      if (!res.bodies) {
        console.log("single asteroid");
        console.log('res :>> ', res);
        const singleAsteroid = []
        singleAsteroid.push(res)

        console.log('singleAsteroid :>> ', singleAsteroid);
        createCards(singleAsteroid)
      } else {
        console.log("all asteroids");
        createCards(res.bodies)
      }
      addEvent();
    
    })
    .catch((error) => console.log(error));
};

fetchData("?filter[]=bodyType,eq,Asteroid");

function createCards(array) {
  console.log(array);

  const container = document.getElementById("asteroid-cards");
  container.textContent = ""
  
  for (let i = 0; i < array.length; i++) {
    const card = document.createElement("div");
    card.setAttribute("id", array[i].id);
    card.className = "card mb-3 rounded";
    container.append(card);

    const planetName = document.createElement("h5");
    planetName.innerHTML = array[i].id;
    planetName.className = "row g-0";

    const image = document.createElement("img");
    image.className = "img-fluid rounded";
    image.setAttribute("src", "../images/asteroid.png");
    card.append(image);

    const details = document.createElement("ul");
    details.className = "card-text";
    card.append(planetName, details);

    const discoveryDate = document.createElement("li");
    const radius = document.createElement("li");
    const farthestFromSun = document.createElement("li");
    const closestToSun = document.createElement("li");


    if (array[i].discoveryDate === "") {
      discoveryDate.innerHTML = "";
    } else {
      discoveryDate.innerHTML = "Discovery Date: " + array[i].discoveryDate;
    }


    if (array[i].meanRadius === 0) {
      radius.innerHTML = "";
    }
      else {
        radius.innerHTML = "Radius: " + Math.round(array[i].meanRadius) + " km";

      }
    
    farthestFromSun.innerHTML =
      "farthest from Sun: " +
      Intl.NumberFormat().format(array[i].perihelion) +
      " km";

    closestToSun.innerHTML =
      "closest to Sun: " +
      Intl.NumberFormat().format(array[i].aphelion) +
      " km";

    details.append(
    
      discoveryDate,
      
      radius,
      farthestFromSun,
      closestToSun
    );
  }

}

const addEvent = () => {
  const searchInput = document.getElementById('asteroid-search')
  searchInput.addEventListener('input', (event) => {
    input = event.target.value;
    console.log(input)
  });
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      fetchData(input);
    }
  })
}


