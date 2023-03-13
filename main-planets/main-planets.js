const fetchData = () => {
  fetch(
    "https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,eq,true"
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("fetch result: ", res);
      createCards(res.bodies);
    
    })
    .catch((error) => console.log(error));
};

fetchData();

function createCards(array) {
  console.log(array);

  const container = document.getElementById("planet-cards");
  container.textContent = ""
  
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

    const moons = document.createElement("li");
    const discoveryDate = document.createElement("li");
    const avgTemp = document.createElement("li");
    const radius = document.createElement("li");
    const farthestFromSun = document.createElement("li");
    const closestToSun = document.createElement("li");

    if (array[i].moons === null) {
      moons.innerHTML = "Moons: " + "0";
    } else {
      moons.innerHTML = "Moons: " + array[i].moons.length;
    }

    if (array[i].discoveryDate === "") {
      discoveryDate.innerHTML = "";
    } else {
      discoveryDate.innerHTML = "Discovery Date: " + array[i].discoveryDate;
    }

    avgTemp.innerHTML =
      "Average Temperature: " + KelvinToCelsius(array[i].avgTemp) + " °C";

    radius.innerHTML = "Radius: " + Math.round(array[i].meanRadius) + " km";

    farthestFromSun.innerHTML =
      "farthest from Sun: " +
      Intl.NumberFormat().format(array[i].perihelion) +
      " km";

    closestToSun.innerHTML =
      "closest to Sun: " +
      Intl.NumberFormat().format(array[i].aphelion) +
      " km";

    details.append(
      moons,
      discoveryDate,
      avgTemp,
      radius,
      farthestFromSun,
      closestToSun
    );
  }
  addEvents(array);
}

 function KelvinToCelsius(degrees) {
      const celsius = degrees - 273.15;
      const roundedCelsius = Math.round(celsius);
      return roundedCelsius;
    }


//: sort cards according to options

const addEvents = (array) => {
  const planetOptions = document.getElementById("user_options");
  planetOptions.addEventListener("change", (event) => {
    // console.log("event :>> ", event);
    // console.log("event.target.value :>> ", event.target.value);
    if (event.target.value === "most moons") {
      sortByMoons(array);
    }
    if (event.target.value === 'sort B to s') {
      sort(array, "meanRadius", false);
    }
    if (event.target.value === 'sort s to B') {
     sort(array, "meanRadius", true);
    }
    if (event.target.value === 'closest to sun') {
      sort(array,"perihelion", true);
    }
    if (event.target.value === 'farthest from sun') {
      sort(array, "aphelion", false);
    }
  });
};

const sort = (array, value, isAMinusB) => {

  
  // console.log('original array :>> ', array);
  // console.log('value :>> ', value);
  const copiedArray = [...array]

  copiedArray.sort((a, b) => {
    // console.log('value :>> ', a[value]);

    
    planet1 = a[value];
    planet2 = b[value];

    console.log(a.value);
    console.log(b.value);
    
    if (isAMinusB === true) {

      return planet1 - planet2
    } else {
      return planet2 - planet1
  }
  })
  

  createCards(copiedArray)

}



const sortByMoons = (array) => {

  console.log('original array :>> ', array);
  const copiedArray = [...array]
  

  copiedArray.sort((a, b) => {
    const aMoons = a.moons ? a.moons.length : 0
    const bMoons = b.moons ? b.moons.length : 0

    return bMoons - aMoons 
  })

createCards(copiedArray)
 
}



