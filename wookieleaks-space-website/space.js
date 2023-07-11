
document.addEventListener("DOMContentLoaded", setupListeners)

function setupListeners() {
    const button = document.querySelector("#my-button")
    button.addEventListener("click", peopleInSpace)
}

(async function (e) {
    const url = nasaURL("planetary/apod")
    const httpResponse = await fetch(url)
    const data = await httpResponse.json()
    console.log(data)
    const picture = data.url
    const explanation = data.explanation
    const title = data.title
    const img = document.createElement('img') //save image to a variable
    const para = document.createElement('p') //create paragraph element
    const node = document.createTextNode(explanation); //add text
    const span = document.createElement('h3') 
    const txt = document.createTextNode(title)
    span.appendChild(txt)
    para.appendChild(node) // append node to paragraph element
    img.classList.add("pod")
    img.src = picture
    para.classList.add("description")
    span.classList.add("pod-title")
    document.getElementById("pod-pic").appendChild(img)
    document.getElementById("pod-title").appendChild(span)
    document.getElementById("pod-desc").appendChild(para)
    
  })()
  
function nasaURL(resource){
    const api_key = "uncGeyuWQTcLB9caUSe8VJcZXL6iMe1MnNpSdOlX"
    const base_url = `https://api.nasa.gov/${resource}`
    console.log(`${base_url}?api_key=${api_key}`)
    return `${base_url}?api_key=${api_key}`
  }


(async function (e) {
    const url = nasaURL("neo/rest/v1/neo/browse")
    const httpResponse = await fetch(url)
    const data = await httpResponse.json()
    near_earth = data.near_earth_objects
    console.log("ASTEROID DATA",near_earth)
    dates = {}
    near_earth.forEach(e => {
        const asteroid_name = e.name
        dates[asteroid_name] = {}
    
        const approach_data = e.close_approach_data
        const dates_arr = []
         approach_data.forEach(e => {
            
            year = parseInt(e.close_approach_date.slice(0, 4))
            dates_arr.push(year)
    
            dates[asteroid_name]["year"] = dates_arr
         })
    })
    console.log(dates)
    this_year = 2022

    for (const asteroid in dates) {
        arr = dates[asteroid].year
        min = findClosest(2022,arr)
        dates[asteroid]["min"] = min
    }

    min = 3000
    for (const asteroid in dates) {
        arr_min = dates[asteroid]["min"]
        if (arr_min < min && arr_min >= 2022) {
            min = arr_min
        }
    }

    closestAsteroid = ""
    for (const asteroid in dates) {
        if (dates[asteroid]["min"] == min){
            closestAsteroid = asteroid
        }
    }
    console.log("CLOSEST ASTEROID IS", closestAsteroid)
    const h2 = document.createElement('h2') 
    const txt = document.createTextNode(closestAsteroid)
    h2.classList.add("closest-asteroid-name")
    h2.appendChild(txt)
    document.getElementById("closest").appendChild(h2)

    closestYear = 0
    closestMonth = 0
    closestDay = 0

    near_earth.forEach(e => {
        if(e.name ==closestAsteroid){
            console.log("PRINT IT", e.name)

            magnitude = e.absolute_magnitude_h 
            hazardous = e.is_potentially_hazardous_asteroid
            diameter = e.estimated_diameter.kilometers
            minDiameter = diameter.estimated_diameter_min.toFixed(2)
            maxDiameter = diameter.estimated_diameter_max.toFixed(2)
    
            e.close_approach_data.forEach(e => {
            
            year = parseInt(e.close_approach_date.slice(0, 4))
  
            if(year == min) {
                closestYear = min
                closestMonth = parseInt(e.close_approach_date.slice(5, 7))
                closestDay = parseInt(e.close_approach_date.slice(8, 10))
            }  
         })
            
        }
    })
    
    let danger = ""
    if (hazardous == true) {
        danger = "Yes"
    } else{
        danger = "No"
    }

    closestDiameter = `Between ${minDiameter} and ${maxDiameter} km `
    closestDate = `${closestMonth}/${closestDay}/${closestYear} `
    const para = document.createElement('p') 
    para.classList.add("info")
    const node = document.createTextNode(closestDate); 
    para.appendChild(node) 
    document.getElementById("when").appendChild(para)
    const para2 = document.createElement('p') 
    const node2 = document.createTextNode(danger); 
    para2.appendChild(node2) 
    para2.classList.add("info")
    document.getElementById("hazardous").appendChild(para2)
    const para3 = document.createElement('p') 
    const node3 = document.createTextNode(closestDiameter); 
    para3.appendChild(node3) 
    para3.classList.add("info")
    document.getElementById("diameter").appendChild(para3)

}) ()

let rendered = false

async function peopleInSpace (){
    const url = "http://api.open-notify.org/astros.json"
    const httpResponse = await fetch(url)
    const data = await httpResponse.json()
    numPeople = data.number
    console.log(data)

    isGameOver = false
    people = 0
    if (rendered == false){
        async function waitUntil(isGameOver = true) {
            return await new Promise(resolve => { 
              let interval = setInterval(function() {
                img = document.createElement("img")
                img.classList.add('person')
                img.src = "images/baby_yoda.jpg"
                document.getElementById("character-space").appendChild(img)
                people += 1
              
                if (people == numPeople) {
                  isGameOver == true
                  resolve(Promise)
                  clearInterval(interval)
                } }, 200);
            })}
            
        const myPromise = waitUntil(Promise)
        myPromise.then(() => { 
            txt = `${numPeople} people are out there. May the force be with them!`
            const para = document.createElement('p') 
            const node = document.createTextNode(txt); 
            para.appendChild(node) 
            para.classList.add("info")
            document.getElementById("people-in-space").appendChild(para)
            rendered = true
         })
    }  
}

(async function (e) {
    const url = "https://api.spacexdata.com/v5/launches/latest"
    const httpResponse = await fetch(url)
    const data = await httpResponse.json()
    picture = data.links.patch.large
    launchName = data.name
    dateLaunched = data.date_local
    year = parseInt(dateLaunched.slice(0, 4))
    month = parseInt(dateLaunched.slice(5, 7))
    day = parseInt(dateLaunched.slice(8, 10))
    date = `${month}/${day}/${year} `
    redditURL = data.links.reddit.launch
    crewData = data.crew

    crewMembers = []
    crewData.forEach(e => {
        console.log(e.role)
        crewMembers.push(e.role)
    })

    console.log("SPACEX", crewMembers)

    // Make the list
    ol = document.createElement('ol')
    document.getElementById('crew-list').appendChild(ol);

    crewMembers.forEach(item => {
        let li = document.createElement('li');
        ol.appendChild(li);
    
        li.innerHTML += item;
    });

    const img = document.createElement('img') 
    img.classList.add("spacex-pic")
    img.src = picture
    document.getElementById("spacex").appendChild(img)
    const span = document.createElement('span') //create paragraph element
    const node = document.createTextNode(launchName); //add text
    span.classList.add("spacex-desc")
    span.appendChild(node) 
    document.getElementById("name").appendChild(span)
    const span2 = document.createElement('span') //create paragraph element
    const node2 = document.createTextNode(date); //add text
    span2.classList.add("spacex-desc")
    span2.appendChild(node2) 
    document.getElementById("date-launched").appendChild(span2)
    a = document.createElement('a')
    link = document.createTextNode(" here")
    a.appendChild(link)
    a.title = " here"; 
    a.href = redditURL; 
    document.getElementById("reddit-url").appendChild(a); 
}
)()


function findClosest(val, arr) {
    return arr.reduce((a, b) => {
        let aDiff = Math.abs(a - val);
        let bDiff = Math.abs(b - val);

        if (aDiff == bDiff) {
            return a > b ? a : b;
        } else {
            return bDiff < aDiff ? b : a;
        }
    });
}
