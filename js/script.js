// includeHeader
document.addEventListener("DOMContentLoaded", function() {
    fetch('./include/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

// includeFooter
document.addEventListener("DOMContentLoaded", function() {
    fetch('./include/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

//Map in index.html
//Get specified city data
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };  
var map = L.map('map').setView([4.193222, 108.280748], 6.4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

//Coordinates Popup
var popup = L.popup();
function onMapClick(e) {
    popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}
map.on('click', onMapClick);

//AQI Overlay for Map
var  WAQI_URL  =  "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=48082c7b86e4b16547905e3967c988f63bbe124d";  
var  WAQI_ATTR  =  'Air  Quality  Tiles  &copy;  <a  href="http://waqi.info">waqi.info</a>';  
var  waqiLayer  =  L.tileLayer(WAQI_URL,  {  attribution:  WAQI_ATTR  });
map.addLayer(waqiLayer);

//IQAir API
document.addEventListener('DOMContentLoaded', () => {
    
    const dataContainer = document.getElementById('data-container');

    // Function to fetch JSON data
    const fetchData = async () => {
        try {
            const response = await fetch('http://api.airvisual.com/v2/city?city=Melaka&state=Melaka&country=Malaysia&key=ec0f234e-476d-4374-80d2-6039403594f8'); // Replace with your JSON data URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            displayData(jsonData);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    // Function to display JSON data
    const displayData = (data) => {
        const { city, state, country, location, current } = data.data;
        const { pollution, weather } = current;

        const dataHtml = `
            <div>
                <h2>Location Information</h2>
                <p class="data"><strong>City:</strong> ${city}</p>
                <p class="data"><strong>State:</strong> ${state}</p>
                <p class="data"><strong>Country:</strong> ${country}</p>
                <p class="data"><strong>Coordinates:</strong> ${location.coordinates.join(', ')}</p>
            </div>
            <div>
                <h2>Current Pollution</h2>
                <p class="data"><strong>Timestamp:</strong> ${pollution.ts}</p>
                <p class="data"><strong>AQI US:</strong> ${pollution.aqius}</p>
                <p class="data"><strong>Main Pollutant US:</strong> ${pollution.mainus}</p>
                <p class="data"><strong>AQI CN:</strong> ${pollution.aqicn}</p>
                <p class="data"><strong>Main Pollutant CN:</strong> ${pollution.maincn}</p>
            </div>
            <div>
                <h2>Current Weather</h2>
                <p class="data"><strong>Timestamp:</strong> ${weather.ts}</p>
                <p class="data"><strong>Temperature:</strong> ${weather.tp}°C</p>
                <p class="data"><strong>Pressure:</strong> ${weather.pr} hPa</p>
                <p class="data"><strong>Humidity:</strong> ${weather.hu}%</p>
                <p class="data"><strong>Wind Speed:</strong> ${weather.ws} m/s</p>
                <p class="data"><strong>Wind Direction:</strong> ${weather.wd}°</p>
                <p class="data"><strong>Weather Icon:</strong> <img src="http://openweathermap.org/img/wn/${weather.ic}@2x.png" alt="Weather Icon"></p>
            </div>
        `;
        dataContainer.innerHTML = dataHtml;
    };

    // Fetch and display data on page load
    fetchData();
});

//Select Form
function getOption(event) {

    event.preventDefault(); // Prevent form submission

    selectElement = document.querySelector('#country');
    output =
        selectElement.options
        [selectElement.selectedIndex].value;
    document.querySelector('.output').textContent = output;
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }