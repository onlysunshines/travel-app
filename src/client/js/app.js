

/* Global Variables */
// Personal API Key for OpenWeatherMap API
let baseURL = "http://api.geonames.org/searchJSON?";
const placeName = `${document.getElementById("inputPlace").value}`;
const apiKey = `&username=${process.env.API_KEY_GEO}`;


console.log(apiKey);


// Event listener to add function to existing HTML DOM element
//document.getElementById("generate").addEventListener("click", generate);

/* Function called by event listener */
function generate(e) {
    const place = document.getElementById("inputPlace").value;
    let projectData = {};
    
    getPlace(baseURL, placeName, apiKey, projectData).then(function (data) {
        console.log(data);
        postData("/add", {
            location: name.value,
        }).then(function () {
            updateUI();
        });
    });
}

/* Function to GET Web API Data */
const getPlace = async (baseURL, newPlace, apiKey) => {
    const request = await fetch(baseURL + newPlace + apiKey);
    try {
        const allData = await request.json();
        console.log(allData);
        return allData;
    } catch(error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data)
        let response  = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

            try {
                const newData = await response.json();
                console.log(newData);
                return newData
            }catch(error) {
                console.log("error", error);
            }
}

const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        document.getElementById("placename").innerHTML = allData.name;
    } catch (error) {
        console.log("error", error);
    }
};

export { getPlace, postData, updateUI }