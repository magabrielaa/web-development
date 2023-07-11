(async function (e) {
    const url = "http://api.open-notify.org/iss-now.json"
    const httpResponse = await fetch(url)
    const data = await httpResponse.json()
    lon = data.iss_position.longitude
    lat = data.iss_position.latitude
    console.log(lon, lat)
    var bb8Icon = L.icon({
        iconUrl: 'images/vader.png',
        iconSize:     [80, 80], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    var map = L.map('map').setView([lat, lon], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

    L.marker([lat, lon], {icon: bb8Icon}).addTo(map)
        .bindPopup('Right above here...<br> Save the rebellion!')
        .openPopup();  
}
)()



