const rideListElement = document.querySelector("#rideList");
const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {

    const ride = JSON.parse(value);
    ride.id = id;

    const firstPosition = ride.data[0];
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

    const itemElement = document.createElement("li");
    itemElement.id = ride.id;

    const cityDiv = document.createElement("div");
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`;


    const maxSpeedDiv = document.createElement("div");
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)}Km/h`;

    const distanceDiv = document.createElement("div");
    distanceDiv.innerText = `Max Distance: ${getDistance(ride.data)}Km`;

    const durationDiv = document.createElement("div");
    durationDiv.innerText = getDuration(ride);

    const dateDiv = document.createElement("div");
    dateDiv.innerText = getStartDate(ride);
    
    itemElement.appendChild(cityDiv);
    itemElement.appendChild(maxSpeedDiv);
    itemElement.appendChild(distanceDiv);
    itemElement.appendChild(durationDiv);
    itemElement.appendChild(dateDiv);

    rideListElement.appendChild(itemElement);

})

async function getLocationData(latitude, longitude) {

    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`;

    const response = await fetch(url);
    return await response.json();

}

function getMaxSpeed(positions) {

    var maxSpeed = 0;
    positions.forEach(position => {
        if (position != null && position.speed > maxSpeed) {
            maxSpeed = position.speed;
        }
    })

    return (maxSpeed * 3.6).toFixed(2);

}

function getDistance(positions){

    const earthRadiusKm = 6371;
    let totalDistance = 0;
    for(let i = 0; i< positions.length - 1; i++){

        const p1 = {latitude: positions[i].latitude, 
            longitude: positions[i].longitude
        }
        const p2 = {latitude: positions[i + 1].latitude, 
            longitude: positions[i + 1].longitude
        }

        const deltaLatitude = toRad(p2.latitude - p1.latitude);
        const deltaLongitude = toRad(p2.longitude - p1.longitude);

        const a = Math.sin(deltaLatitude / 2) * 
        Math.sin(deltaLatitude / 2) + 
        Math.sin(deltaLongitude / 2) * 
        Math.sin(deltaLongitude / 2) * 
        Math.cos(toRad(p1.latitude)) * 
        Math.cos(toRad(p2.latitude));

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const distance = earthRadiusKm * c;

        totalDistance += distance;

    }

    function toRad(degree){
        return degree * Math.PI / 180
    }
    return totalDistance.toFixed(2);
}

function getDuration(ride){

    const interval = ((ride.stopTime - ride.startTime) / 1000).toFixed(2);

    if(interval < 60){

        return `Duration: ${interval} Seg`;

    }

    else if(interval >= 3600){

        return `Duration: ${(interval/3600).toFixed(2)} Hr's`;        

    }

    else if(interval >= 60){

        return `Duration: ${(interval/60).toFixed(2)} Min`;
    }
    

}

function getStartDate(ride){

    const d = new Date(ride.startTime);

    const day = d.toLocaleDateString("en-US", {day: "numeric"});
    const month = d.toLocaleDateString("en-US", {month: "short"});
    const year = d.toLocaleDateString("en-US", {year: "numeric"});

    const hour = d.toLocaleTimeString("en-US", {hour: "2-digit", hour12: false});
    const minute = d.toLocaleTimeString("en-US", {minute: "2-digit"});

    return `${hour}:${minute} - ${month}/${day}/${year}`;

}
