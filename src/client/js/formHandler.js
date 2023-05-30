// import { checkDate } from "./dateChecker";
// import { historical } from "./historical";

function handleSubmit(event) {
    event.preventDefault()
    
    console.log(document.getElementById("inputPlace").value);

    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    async function derp() {
        const response = await fetch("http://api.geonames.org/postalCodeSearchJSON?placename=" + `${document.getElementById("inputPlace").value}` + "&username=" + `${process.env.API_KEY_GEO}`, requestOptions)
        const jsonData = await response.json()
        const resultArray = jsonData.postalCodes[0];
          
        let startDateInput = document.getElementById("startDate").value;
        startDateInput = startDateInput.replace(/-/, '/')
                                       .replace(/-/, '/');

        let endDateInput = document.getElementById("endDate").value;
        endDateInput = endDateInput.replace(/-/, '/')
                                   .replace(/-/, '/');

        console.log(startDateInput)
        console.log(endDateInput)

        let departing = new Date(`${startDateInput}`)
        let returning = new Date(`${endDateInput}`)

        const trip = departing.getDate() - returning.getDate()
        console.log(Math.abs(trip) + 1)
        const tripLength = (Math.abs(trip) + 1)

        let inpDate = new Date(`${startDateInput}`);
        let currDate = new Date();
            
        let currDateConverted = currDate.getFullYear() + "/" + ("0" + (currDate.getMonth() + 1)).slice(-2) + "/" + currDate.getDate();
        console.log(currDateConverted)

        let timeDiff = inpDate.getTime() - currDate.getTime();
        let daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        console.log(daysDiff)
        console.log(Math.ceil(daysDiff))

        const days = document.getElementById("days").innerHTML = 
            (Math.ceil(daysDiff) + " Days Until Departure!") + "<br />";

        console.log(inpDate)
        console.log(days)
            
        const secondResponse = await fetch("https://api.weatherbit.io/v2.0/current?lat=" + `${resultArray.lat}` + "&lon=" + `${resultArray.lng}` + "&units=I" + "&key=" + `${process.env.API_KEY_WEA_2}`, requestOptions)
        const secondJsonData = await secondResponse.json()
        const secondResultArray = secondJsonData
        const currentTemp = Math.round(secondResultArray.data[0].app_temp) 

        const thirdResponse = await fetch("https://api.weatherbit.io/v2.0/forecast/daily?lat=" + `${resultArray.lat}` + "&lon=" + `${resultArray.lng}` + "&units=I" + "&days=" + `${tripLength}` + "&key=" + `${process.env.API_KEY_WEA_2}`, requestOptions)
        const thirdJsonData = await thirdResponse.json()
        const thirdResultArray = thirdJsonData
        const forecast = thirdResultArray.data
        const forecastArray = [];
            for (let i = 0; i < forecast.length; i++) {
                forecastArray.push(Math.round(forecast[i].app_max_temp))
            }
        
        console.log(forecastArray)
        console.log(thirdResultArray)
        console.log(thirdResultArray.data[0])
        console.log(thirdResultArray.data[0].datetime)
        console.log(thirdResultArray.data[0].app_min_temp)
        console.log(thirdResultArray.data[0].app_max_temp)

        function subtractYears(date, years) {
            const dateCopy = new Date(date);
          
            dateCopy.setFullYear(dateCopy.getFullYear() - years);
          
            return dateCopy;
          }
          
        const startDate = new Date(document.getElementById("startDate").value);
        const endDate = new Date(document.getElementById("endDate").value);
          
        const startResult = subtractYears(startDate, 1);
        const endResult = subtractYears(endDate, 1)
 
        const apiStartResult = startResult.getFullYear() + "-" + ("0" + (startResult.getMonth() + 1)).slice(-2) + "-" + ("0" + (startResult.getDate())).slice(-2);
        const apiEndResult = endResult.getFullYear() + "-" + ("0" + (endResult.getMonth() + 1)).slice(-2) + "-" + ("0" + (endResult.getDate())).slice(-2);

        const fourthResponse = await fetch("https://archive-api.open-meteo.com/v1/archive?latitude=" + `${resultArray.lat}` + "&longitude=" + `${resultArray.lng}` + "&start_date=" + `${apiStartResult}` + "&end_date=" + `${apiEndResult}` + "&daily=temperature_2m_max&timezone=auto&temperature_unit=fahrenheit")
        const fourthJsonData = await fourthResponse.json()
        const fourthResultArray = fourthJsonData
        const historyDaily = fourthResultArray.daily.temperature_2m_max
        const historyDailyArray = [];
            for (let i = 0; i < historyDaily.length; i++) {
                historyDailyArray.push(Math.round(historyDaily[i]))
            }

        console.log(historyDaily)
        console.log(historyDailyArray)
                  
        const fifthResponse = await fetch("https://pixabay.com/api/?key=" + `${process.env.API_KEY_PIX}` + "&q=" + `${document.getElementById("inputPlace").value}`, requestOptions)
        const fifthJsonData = await fifthResponse.json()
        const fifthResultArray = fifthJsonData

        let img = `<img src="${fifthResultArray.hits[0].fullHDURL}" class= "desImg" alt="destination img">`
        
        const results = document.getElementById("results").innerHTML =
              ("Duration of Trip: " + tripLength) + " Days" + "<br />"
            + ("Current Weather: " + currentTemp) + " °F" + "<br />"
            + ("Weather Forecast: " + forecastArray) + " °F" + "<br />"
            + ("Last Year Around This Time: " + historyDailyArray) + " °F" + "<br />" 
            + (img) + "<br />";
            
            console.log(results);
    }
    
        derp();
        // checkDate();
        // historical();
}

export { handleSubmit }
