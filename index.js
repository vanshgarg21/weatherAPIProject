/*const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccesContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");

//initial variables need
const API_Key="45a5e4d0d83096f2be6ac99c4fc7b9f7";
let currentTab=userTab;
currentTab.classList.add("current-Tab");
getfromSessionStorage();

//ek kam or pending haii??

function switchTab(clickedTab)
{
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-Tab");
    currentTab=clickedTab;
    currentTab.classList.add("current-Tab");

    if(!searchForm.classList.contains("Active")){
        userInfoContainer.classList.remove("Active");
        grantAccesContainer.classList.remove("Active");
        searchForm.classList.add("Active");
    }
    else{
        searchForm.classList.remove("Active");
        userInfoContainer.classList.remove("Active");
        getfromSessionStorage();
    }
    }
    
}


userTab.addEventListener("click",()=>{
    //pass clicked Tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>{
    //pass clicked Tab as input parameter
    switchTab(searchTab);
});

//check if coordinates stores in session storage
function getfromSessionStorage(){
 const localCoordinates=sessionStorage.getItem("user-coordinates");
 if(!localCoordinates){
    //agr local coordinates nhi mile mtlb coord. save nhi hai
    grantAccesContainer.classList.add("Active");
 }
 else{
   const coordinates=JSON.parse(localCoordinates);
   fetchUserweatherInfo(coordinates);
 }
}

 async function fetchUserweatherInfo(coordinates)
{
    const {lat,lon}=coordinates;//syntax understand krna hai 
    grantAccesContainer.classList.remove("Active");
    //make loader visible
    loadingScreen.classList.add("Active");

    //API call

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
         );
         const data= await response.json();

         loadingScreen.classList.remove("Active");
         userInfoContainer.classList.add("Active");
         renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("Active");
        //hw
    }
}

function renderWeatherInfo(weatherInfo)
{
    //firstl we have to fetch elemnts
    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const description=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windSpeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data=humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    
     cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    description.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.main?.temp ;
    windSpeed.innertext = weatherInfo?.wind?.speed ;
    humidity.innertext = weatherInfo?.main?.humidity ;
    cloudiness.innerText = weatherInfo?.clouds?.all ;

}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
        alert("NO location support available");
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserweatherInfo(userCoordinates);

}

const grantAccessButton=document.querySelector(".data.grantAccess");
grantAccessButton.addEventListener("click",getLocation());

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
    fetchUserweatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("Active");
    userInfoContainer.classList.remove("Active");
    grantAccesContainer.classList.remove("Active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("Active");
        userInfoContainer.classList.add("Active");
        renderWeatherInfo(data);
    }
    catch(err) {
        //hW
        loadingScreen.classList.remove("Active");
        alert("error 404");
    }
}*/
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


//initially vairables need????

let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        //HW
      console.log("your information is not found");
    }

}

function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;  //display block may dal diya
    humidity.innerText =` ${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText =` ${weatherInfo?.clouds?.all} %`;


}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
        console.log("position not supported");
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

 
const errorShow=document.querySelector("[data-error]");
const errorMessage=document.querySelector("[data-errorText]");
async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    errorShow.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        if(!data?.sys)
        {
            throw data;
        }
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }
    catch(err) {
        //hW
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
        errorShow.classList.add("active");
        errorMessage.innerText=`${err?.message}`;   
    }
}

const refreshBtn=document.querySelector("[error-btn]");
refreshBtn.addEventListener("click",()=>{
    location.reload();
})