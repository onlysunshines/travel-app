function handleSubmit(event) {
    event.preventDefault()

    // const formdata = new FormData();
    // formdata.append("placename=", `${document.getElementById("inputPlace").value}`);
    // formdata.append("&username=", `${process.env.API_KEY_GEO}`);

    let input = `${document.getElementById("inputPlace").value}`;
    const user = `${process.env.API_KEY_GEO}`;
    
    console.log(process.env.API_KEY_GEO);
    console.log(document.getElementById("inputPlace").value);

    const requestOptions = {
      //mode: 'no-cors',
      method: 'POST',
      //body: formdata,
      redirect: 'follow'
    };
    
    async function derp() {
        const response = await fetch("http://api.geonames.org/postalCodeSearchJSON?placename=" + `${document.getElementById("inputPlace").value}` + "&username=" + `${process.env.API_KEY_GEO}`, requestOptions)
        const jsonData = await response.json()
        const resultArray = jsonData.postalCodes[0];
        
        console.log(resultArray);
        console.log(resultArray.postalCode);
        console.log(resultArray.countryCode);
        console.log(resultArray.lat);
        console.log(resultArray.lng);
        console.log(process.env.API_KEY_WEA)

        let field = document.getElementById("date")
        let date = new Date(field.value);

        console.log(date)
          
        function isToday() {
            let date = document.getElementById("date").value;
              
            let inpDate = new Date(`${date}T00:00`);
            let currDate = new Date();
              
            if(inpDate.setHours(0, 0, 0, 0) == 
                    currDate.setHours(0, 0, 0, 0))
            {
                return console.log("trigger current weather api");
            } 
            else {
                return console.log("trigger forecast weather api")
            }         
        }
        
        isToday();

        const secondResponse = await fetch("https://api.weatherbit.io/v2.0/current?lat=" + `${resultArray.lat}` + "&lon=" + `${resultArray.lng}` + "&key=" + `${process.env.API_KEY_WEA}`, requestOptions)
        const secondJsonData = await secondResponse.json()
        const secondResultArray = secondJsonData
        let convert = secondResultArray.data[0].app_temp 
        let converted = Math.round(convert * 9 / 5 + 32);
        
        console.log(secondJsonData)
        console.log(secondResultArray.data[0].app_temp)
        console.log(converted)

        // const thirdResponse = await fetch("https://api.weatherbit.io/v2.0/forecast/daily?lat=" + `${resultArray.lat}` + "&lon=" + `${resultArray.lng}` + "&key=" + `${process.env.API_KEY_WEA}`, requestOptions)
        // const thirdJsonData = await thirdResponse.json()
        // const thirdResultArray = thirdJsonData
                
        // console.log(thirdResponse)
        // console.log(thirdResultArray)
            
        //const checkUsage = await fetch("https://api.weatherbit.io/v2.0/subscription/usage?key=" + `${process.env.API_KEY_WEA}`, requestOptions)

        //console.log(checkUsage.body)

        const fourthResponse = await fetch("https://pixabay.com/api/?key=" + `${process.env.API_KEY_PIX}` + "&q=" + `${document.getElementById("inputPlace").value}`, requestOptions)
        const fourthJsonData = await fourthResponse.json()
        const fourthResultArray = fourthJsonData

        console.log(fourthResponse)
        console.log(fourthResultArray.hits[0])
        
        const results = document.getElementById("results").innerHTML = 
                ("Postal Code: " + resultArray.postalCode) + "<br />"
              + ("Country Code: " + resultArray.countryCode) + "<br />"
              + ("Current Weather: " + converted) + " Fahrenheit" + "<br />"
              + ("Forcasted Weather: " + converted) + " Fahrenheit" + "<br />"
              + ("Inspiration: " + fourthResultArray.hits[0].fullHDURL) + "<br />"
              
              ;
            
            console.log(results);

    }
        derp();

}

export { handleSubmit }
