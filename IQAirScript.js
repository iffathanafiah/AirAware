//IQAir API

//List supported countries
var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  body: formdata,
  redirect: 'follow'
};

fetch("http://api.airvisual.com/v2/countries?key=ec0f234e-476d-4374-80d2-6039403594f8", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

//List supported states in a country
var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  body: formdata,
  redirect: 'follow'
};

fetch("http://api.airvisual.com/v2/states?country=Malaysia&key=ec0f234e-476d-4374-80d2-6039403594f8", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  var formdata = new FormData();

//List supported cities in a state
var requestOptions = {
  method: 'GET',
  body: formdata,
  redirect: 'follow'
};

fetch("http://api.airvisual.com/v2/cities?state=Melaka&country=Malaysia&key=ec0f234e-476d-4374-80d2-6039403594f8", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

//Get nearest city data (IP geolocation)
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
fetch("http://api.airvisual.com/v2/nearest_city?key=ec0f234e-476d-4374-80d2-6039403594f8", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

//Get nearest city data (GPS coordinates)
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
      
fetch("http://api.airvisual.com/v2/nearest_city?lat=2.2139&lon=102.3278&key=ec0f234e-476d-4374-80d2-6039403594f8", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

//Get specified city data
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
          
fetch("http://api.airvisual.com/v2/city?city=Melaka&state=Melaka&country=Malaysia&key=ec0f234e-476d-4374-80d2-6039403594f8", requestOptions)
    .then(response => response.text())
    .then(citydata => {console.log(citydata)
    return citydata;
    })
    .catch(error => console.log('error', error));

if(citydata){
  const aqi = data.data.current.pollution.aqius;
  const city = data.data.city;
  document.getElementById('aqi').textContent = `AQI: ${aqi}`;
  document.getElementById('city').textContent = `City: ${city}`;
}
else {
  document.getElementById('aqi').textContent = 'AQI: -';
  document.getElementById('city').textContent = 'Location: -';
}