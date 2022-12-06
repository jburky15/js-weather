const container = document.querySelector('.container')
const weatherBox = document.querySelector('.weather-box')
const details = document.querySelector('.weather-details')
const search = document.querySelector('.search-box button')
const err = document.querySelector('.not-found')

search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value

    if (city === '')
        return;

    fetch(`/api?&units=imperial&q=${city}`)
        .then(res => res.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px'

                weatherBox.style.display = 'none'
                details.style.display = 'none'

                err.style.display = 'block'
                err.classList.add('fadeIn')

                return
            }

            const image = document.querySelector('.weather-box img')
            const tempurature = document.querySelector('.weather-box .tempurature')
            const description = document.querySelector('.weather-box .description')
            const humidity = document.querySelector('.weather-details .humidity span')
            const wind = document.querySelector('.weather-details .wind span')

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png'
                    break

                case 'Rain':
                    image.src = 'images/rain.png'
                    break

                case 'Snow':
                    image.src = 'images/snow.png'
                    break

                case 'Clouds':
                    image.src = 'images/clouds.png'
                    break

                case 'Haze':
                    image.src = 'images/haze.png'
                    break

                default:
                    image.src = ''
            }

            tempurature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`
            description.innerHTML = `${json.weather[0].description}`
            humidity.innerHTML = `${parseInt(json.main.humidity)}<span>%</span>`
            wind.innerHTML = `${parseInt(json.wind.speed)}<span> MPH</span>`

            weatherBox.style.display = ''
            details.style.display = ''
            weatherBox.classList.add('fadeIn')
            details.classList.add('fadeIn')

            err.classList.remove('fadeIn')
            container.style.height = '600px'
        })
})
