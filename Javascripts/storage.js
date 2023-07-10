function createNewRide(){

    const rideID = Date.now();

    const rideRecord = {
        data: [],
        startTime: rideID,
        stopTime: null
    }
    saveRideRecord(rideID, rideRecord);
    return rideID;
}

function getRideRecord(rideID){

    return JSON.parse(localStorage.getItem(rideID));

}

function getAllRides(){

    return Object.entries(localStorage);

}

function saveRideRecord(rideID, rideRecord){

    localStorage.setItem(rideID, JSON.stringify(rideRecord));

}

function addPosition(rideID, position){

    const rideRecord = getRideRecord(rideID);
    const newData = {

        accurancy: position.coords.accurancy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timeStamp: position.timeStamp

    }

    rideRecord.data.push(newData);
    saveRideRecord(rideID, rideRecord);

}

function updateStopTime(rideID){

    const rideRecord = getRideRecord(rideID);
    rideRecord.stopTime = Date.now();
    saveRideRecord(rideID, rideRecord);

}