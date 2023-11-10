//DOM obj för titlar som skall döljas
const mainTitle = document.querySelector(".titleSect");
//Array för att underlätta framtida kontroller
const solarSystem = [
  "Solen",
  "Merkurius",
  "Venus",
  "Jorden",
  "Mars",
  "Jupiter",
  "Saturnus",
  "Uranus",
  "Neptunus",
];
//API url
const url = "https://majazocom.github.io/Data/solaris.json";

//funktion som skapar alla objekt och ger dem klass/id. ger alla en eventlistener förutom saturnus ring.
function generateSite() {
  const container = document.getElementById("container");
  for (let i = 0; i < solarSystem.length; i++) {
    let newItem = document.createElement("div");
    if (solarSystem[i] === "Solen") {
      newItem.classList.add("sun-color");
    }
    newItem.classList.add("planet");
    newItem.id = solarSystem[i];

    newItem.addEventListener("click", (event) => {
      const clickedPlanetId = event.target.id;
      if (clickedPlanetId.length != 0) showPlanet(clickedPlanetId);
    });
    if (newItem.id === "Saturnus") {
      let line = document.createElement("div");
      line.classList.add("line");
      newItem.append(line);
    }
    container.append(newItem);
    console.log(newItem);
  }
}

//funktion körs när en planet klickas.
//Hämtar data    från URL funktionen,
//Döljer allt sen kallar den på createView som sedan skapar vyn.
async function showPlanet(planetId) {
  const data = await getPlanetData();
  const planets = document.querySelectorAll(".planet");
  planets.forEach((element) => {
    element.style.display = "none";
    mainTitle.style.display = "none";
  });
  createView(data, planetId);
  console.log(data);
}

//Funktion som hämtar data från URL och returnerar.
async function getPlanetData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error getting data");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
//Skapar vyn med många element. ger dem klasser och lägger dem där dem skall vara.
//Kallar en separat funktion för att skapa sidvyn på planeten.
function createView(input, planetId) {
  genSidePlanet(planetId);
  const container = document.getElementById("container");
  let infoCont = document.createElement("section");
  infoCont.classList.add("infoCont");
  let newTitle = document.createElement("h1");
  newTitle.classList.add("infoH1");
  let newSubTitle = document.createElement("h2");
  newSubTitle.classList.add("infoH2");
  let newPara = document.createElement("p");
  newPara.classList.add("infoPara");
  let factSect = document.createElement("section");
  factSect.classList.add("factSect");
  let subFactOne = document.createElement("div");
  subFactOne.classList.add("subFact");
  let subFactTwo = document.createElement("div");
  subFactTwo.classList.add("subFact");
  let subFactThree = document.createElement("div");
  subFactThree.classList.add("subFact");
  let subFactFour = document.createElement("div");
  subFactFour.classList.add("subFact");
  let backBtn = document.createElement("button");
  backBtn.innerText = "go back";
  backBtn.addEventListener("click", () => {
    console.log("sup");
    location.reload();
  });

  // Create subfact items
  const subFactItemOne = document.createElement("p");
  const subFactItemTwo = document.createElement("p");
  const subFactItemThree = document.createElement("p");
  const subFactItemFour = document.createElement("p");
  let moon = "";

  //Lägger in korrekt data med hjälp av Id från eventlistener.
  for (let i = 0; i < input.length; i++) {
    if (input[i].name === planetId) {
      newTitle.innerText = planetId;
      newSubTitle.innerText = input[i].latinName;
      newPara.innerText = input[i].desc;

      // Format property names in bold within <p> tags
      subFactItemOne.innerHTML = `<strong>Omkrets:</strong></br> ${input[i].circumference} km`;
      subFactItemTwo.innerHTML = `<strong>Km från solen:</strong></br> ${input[i].distance} km`;
      subFactItemThree.innerHTML = `<strong>Max Temp:</strong></br> ${input[i].temp.day}°C`;
      subFactItemFour.innerHTML = `<strong>Min Temp:</strong></br> ${input[i].temp.night}°C`;
      moon = input[i].moons;
      subFactOne.appendChild(subFactItemOne);
      subFactTwo.appendChild(subFactItemTwo);
      subFactThree.appendChild(subFactItemThree);
      subFactFour.appendChild(subFactItemFour);
      break; // Stop the loop once the planet data is found
    }
  }

  factSect.append(subFactOne, subFactTwo, subFactThree, subFactFour);
  infoCont.append(newTitle, newSubTitle, newPara, factSect, backBtn);

  infoCont.appendChild(backBtn);

  const moons = document.createElement("div");
  moons.classList.add("moon");
  if (moon.length > 0) {
    const moonsContent = document.createElement("p");
    moonsContent.innerHTML = `<strong>Månar: </strong></br> ${moon}`;
    moons.appendChild(moonsContent);
    infoCont.appendChild(moons);
  }
  container.innerHTML = "";
  container.append(infoCont);
}
//Skapar sidplaneten och ger den färgen utifrån vilken planet man klickat.
function genSidePlanet(planetId) {
  console.log(planetId);
  const sidePlanet = document.createElement("div");
  //Solens ID gör att vi får den på sidan.
  sidePlanet.setAttribute("id", "Solen");

  // Remove any existing classes from sidePlanet
  sidePlanet.className = "";

  switch (planetId) {
    case "Solen":
      sidePlanet.classList.add("sun-color"); // You can define a CSS class for "sun-color"
      break;
    case "Merkurius":
      sidePlanet.classList.add("merkurius-color"); // Define a CSS class for "merkurius-color"
      break;
    case "Venus":
      sidePlanet.classList.add("venus-color"); // Define a CSS class for "venus-color"
      break;
    case "Jorden":
      sidePlanet.classList.add("jorden-color"); // Define a CSS class for "jorden-color"
      break;
    case "Mars":
      sidePlanet.classList.add("mars-color"); // Define a CSS class for "mars-color"
      break;
    case "Jupiter":
      sidePlanet.classList.add("jupiter-color"); // Define a CSS class for "jupiter-color"
      break;
    case "Saturnus":
      sidePlanet.classList.add("saturnus-color"); // Define a CSS class for "saturnus-color"
      break;
    case "Uranus":
      sidePlanet.classList.add("uranus-color"); // Define a CSS class for "uranus-color"
      break;
    case "Neptunus":
      sidePlanet.classList.add("neptune-color"); // Define a CSS class for "neptune-color"
      break;
    default:
      // Handle the case when an unknown planetId is provided
      console.log("Unknown planetId:", planetId);
  }

  document.querySelector("body").appendChild(sidePlanet);
}
//Startar sidan
generateSite();
