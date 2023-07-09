const startBTN = document.querySelector("#start");
const stopBTN = document.querySelector("#stop");
const speedElement = document.querySelector("#speed");

let watchID = null;

startBTN.addEventListener("click", () => {

    if(watchID != null){
        return
    }

    function handleSucess(position){
        speedElement.innerText = position.coords.speed ? (position.coords.speed * 3.6).toFixed(2) : 0;
    }
    
    function handleError(err){
        console.log(err.msg)
    }

    const options = {enableHighAccuracy: true};

    watchID = navigator.geolocation.watchPosition(handleSucess, handleError, options);

    startBTN.classList.add("d-none");
    stopBTN.classList.remove("d-none");

});

stopBTN.addEventListener("click", () => {

    if(watchID == null){
        return
    }
    
    navigator.geolocation.clearWatch(watchID);
    watchID = null;

    stopBTN.classList.add("d-none");
    startBTN.classList.remove("d-none");

});
