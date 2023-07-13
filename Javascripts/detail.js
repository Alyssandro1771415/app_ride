const parameters = new URLSearchParams(window.location.search);
const rideID = parameters.get("id");
const ride = getRideRecord(rideID);

document.addEventListener("DOMContentLoaded", async() => {

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
});