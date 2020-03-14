var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
osm = L.tileLayer(osmUrl, {maxZoom: 10, attribution: osmAttrib});
var map = L.map('map').setView([0, 0], 2).addLayer(osm);

renderData();

function renderInfo({confirmed, deaths, recovered, provincestate, countryregion}) {
if (provincestate) {
    return `
        <div>
            <p><strong>${provincestate} - ${countryregion}</strong></p>    
            <p>Infectados: ${confirmed}</p>
            <p>Recuperados: ${recovered}</p>    
            <p>Muertes: ${deaths}</p>    

        </div>
    `;
} else {
    return `
        <div>
            <p><strong>${countryregion}</strong></p>    
            <p>Infectados: ${confirmed}</p>
            <p>Recuperados: ${recovered}</p>    
            <p>Muertes: ${deaths}</p>    

        </div>
    `;
}
}
async function getData() {
    const res = await fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest');
    const data = await res.json();
    return data;
}

const customIcon = new L.Icon({
    iconUrl: './assets/M.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50]
});
async function renderData() {

const data = await getData();
console.log(data);

    data.forEach(item => {
        // console.log(item);

        if(item.confirmed > 0){
            L.marker([item.location.lat, item.location.lng], {icon: customIcon})
            .addTo(map)
            .bindPopup(renderInfo(item))
        }

    });

}
