var dangerousAsteroids = [] //stores all of the raw data for each dangerous asteroid

$(document).ready(function () {

    var date

    $('#add-date').on('submit', function(event) {
        event.preventDefault();
        date = $('#date').val();
        
        $.get('/newdate', {dateKey: date}, function(dataFromServer) { //NOTE TO SELF: second parameter must be an OBJECT! 
            // console.log(date)
            // console.log(dataFromServer)
            if (dataFromServer.success){
                console.log("The request succeeded!")
                $('#ajax-results').text(dataFromServer.success)
            }
            else if (dataFromServer.failure) {
                console.log("something went wrong...")
                $('#ajax-results').text(dataFromServer.failure)
            }

            for (let days in dataFromServer.near_earth_objects) {
                for (var i = 0; i < dataFromServer.near_earth_objects[days].length; i++) { //this block of code goes through every asteroid and finds all the ones that are markeed true for 'potentially dangerous' and pushes them into dangerousAsteroids
                    if (dataFromServer.near_earth_objects[days][i].is_potentially_hazardous_asteroid === true) {
                        dangerousAsteroids.push(dataFromServer.near_earth_objects[days][i])
                    }
                }
            }

            dangerousAsteroids.sort(function (a, b) { //this sorts all the asteroids by distance to earth
                return a.close_approach_data[0].miss_distance.miles - b.close_approach_data[0].miss_distance.miles;
            });            
            
            for (var i = 0; i < dangerousAsteroids.length; i++) {
                //this block of code assigns each asteroid and all of it's attributes to a separate div
                $('#main-container').append(`
                <div class="asteroid"> 
                <img src="http://www.daily-sun.com/assets/news_images/2017/06/29/asteroids-humanity-daily-sun.jpg">
                <div class="name">Name: ${dangerousAsteroids[i].name}</div>
                <div class="diameter">Diameter: ${dangerousAsteroids[i].estimated_diameter.miles.estimated_diameter_max} miles</div>
                <div class="approach_date">Approach Date: ${dangerousAsteroids[i].close_approach_data[0].close_approach_date}</div>
                <div class="speed">Speed: ${dangerousAsteroids[i].close_approach_data[0].relative_velocity.miles_per_hour} Miles Per Hour</div>
                <div class="orbiting_body">Orbiting Body: ${dangerousAsteroids[i].close_approach_data[0].orbiting_body}</div>
                <div class="miss_distance">Miss Distance: ${dangerousAsteroids[i].close_approach_data[0].miss_distance.miles} miles</div>
                </div>
                `)
            }
            
        }); 
    })
    
    
    // These are for texting purposes (and to remind me how to find each piece of data)
    // console.log(dangerousAsteroids)
    // console.log(dangerousAsteroids[0].name)
    // console.log(dangerousAsteroids[0].estimated_diameter.miles.estimated_diameter_max)
    // console.log(dangerousAsteroids[0].close_approach_data[0].close_approach_date)
    // console.log(dangerousAsteroids[0].close_approach_data[0].relative_velocity.miles_per_hour)
    // console.log(dangerousAsteroids[0].close_approach_data[0].orbiting_body)
    // console.log(dangerousAsteroids[0].close_approach_data[0].miss_distance.miles)

        })