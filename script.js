document.addEventListener('DOMContentLoaded', () => {

    // Include Header
    fetch("./include/header.html")
    .then(response => {
        return response.text();
    })
    .then(data => {
        document.querySelector("header").innerHTML = data;
    });
    
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
                <p><strong>City:</strong> ${city}</p>
                <p><strong>State:</strong> ${state}</p>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>Coordinates:</strong> ${location.coordinates.join(', ')}</p>
            </div>
            <div>
                <h2>Current Pollution</h2>
                <p><strong>Timestamp:</strong> ${pollution.ts}</p>
                <p><strong>AQI US:</strong> ${pollution.aqius}</p>
                <p><strong>Main Pollutant US:</strong> ${pollution.mainus}</p>
                <p><strong>AQI CN:</strong> ${pollution.aqicn}</p>
                <p><strong>Main Pollutant CN:</strong> ${pollution.maincn}</p>
            </div>
            <div>
                <h2>Current Weather</h2>
                <p><strong>Timestamp:</strong> ${weather.ts}</p>
                <p><strong>Temperature:</strong> ${weather.tp}°C</p>
                <p><strong>Pressure:</strong> ${weather.pr} hPa</p>
                <p><strong>Humidity:</strong> ${weather.hu}%</p>
                <p><strong>Wind Speed:</strong> ${weather.ws} m/s</p>
                <p><strong>Wind Direction:</strong> ${weather.wd}°</p>
                <p><strong>Weather Icon:</strong> <img src="http://openweathermap.org/img/wn/${weather.ic}@2x.png" alt="Weather Icon"></p>
            </div>
        `;
        dataContainer.innerHTML = dataHtml;
    };

    // Fetch and display data on page load
    fetchData();
});