const getData = async () => {
    const { latitude, longitude } = positionTable;
    const geoData = {lat: latitude, lon: longitude, timeStamp: Date.now() / 1000 / 60 / 60 / 24};
    const result = await fetch('/geo', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(geoData)
    });
    const data = await result.json();
    console.log(data);   
}; 

let positionTable = {}

navigator.geolocation.getCurrentPosition(async pos => {
    const { latitude, longitude } = pos.coords;
    positionTable = { latitude, longitude }
    document.querySelector('.latitude').textContent = latitude;
    document.querySelector('.longitude').textContent = longitude;

    const myMap = L.map('map').setView([latitude, longitude], 13);
    const attribution =  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution }).addTo(myMap);
    L.marker([latitude, longitude]).addTo(myMap)
    .bindPopup('Position of geolocation guess.')
    .openPopup();
});