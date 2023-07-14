const parameters = new URLSearchParams(window.location.search);
const rideID = parameters.get("id");
const ride = getRideRecord(rideID);

document.addEventListener("DOMContentLoaded", async () => {

    const firstPosition = ride.data[0];
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

    const dataElement = document.createElement("div");
    dataElement.className = "flex-fill d-flex flex-column"

    const cityDiv = document.createElement("div");
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`;
    cityDiv.className = "text-success mb-2"

    const maxSpeedDiv = document.createElement("div");
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)}Km/h`;
    maxSpeedDiv.className = "h5";

    const distanceDiv = document.createElement("div");
    distanceDiv.innerText = `Max Distance: ${getDistance(ride.data)}Km`;

    const durationDiv = document.createElement("div");
    durationDiv.innerText = getDuration(ride);

    const dateDiv = document.createElement("div");
    dateDiv.innerText = getStartDate(ride);
    dateDiv.className = "text-secondary mt-2"

    dataElement.appendChild(cityDiv);
    dataElement.appendChild(maxSpeedDiv);
    dataElement.appendChild(distanceDiv);
    dataElement.appendChild(durationDiv);
    dataElement.appendChild(dateDiv);

    document.querySelector("#data").appendChild(dataElement);

    const deleteButton = document.querySelector("#deleteButton");
    deleteButton.addEventListener("click", () => {

        localStorage.removeItem(rideID);
        window.location.href = "./";

    });

    const map = L.map("mapDetail");
    map.setView([firstPosition.latitude, firstPosition.longitude], 16);
    L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
        subdomains: 'abcd',
        minZoom: 10,
        maxZoom: 50,
        ext: 'png'
    }).addTo(map);

    const positionsArray = ride.data.map((position => {
        return [position.latitude, position.longitude]
    }))

    const polyLine = L.polyline(positionsArray, {color: "#f00"});
    polyLine.addTo(map);

    map.fitBounds(polyLine.getBounds());

});