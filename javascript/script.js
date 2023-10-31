const sun = document.getElementById("sun")
const mercury = document.getElementById("mercury")
const venus = document.getElementById("venus")
const earth = document.getElementById("earth")
const mars = document.getElementById("mars")
const jupiter = document.getElementById("jupiter")
const saturn = document.getElementById("saturn")
const uranus = document.getElementById("uranus")
const neptune= document.getElementById("neptune")



const url = 'https://majazocom.github.io/Data/solaris.json';

async function getPlanetData(url){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Error getting data")
        }
        const data = await response.json();
        console.log(data)
    }
    catch(error){
        console.error(error)
    }
}
getPlanetData(url)

