    
    
    
   var callBackGetSuccess= function(data){
        console.log('donnes api', data);
        var zoneMeteo = document.getElementById("zone_meteo")
        zoneMeteo.innerHTML = '<h3>'+data.location.country+", "+data.location.name+", "+data.location.region+'</h3>'+
                                '<div class="meteoinfos">'+
                            '<img id="currentWeather" src ="images/animated/cloudy-day-1.svg"/>'+
                            '<h2>'+data.current.temperature+"°C"+'</h2>'+
                           '</div>'+
                           '<div class="infosadd">'+
                           '<div class="rangement">'+
                           '<img id="wind" src="images/wind.svg"/>'+"Vent : " +data.current.wind_speed+"Kmph"+
                           '</div>'+
                           '<div class="rangement">'+
                           "<br>"+'<img id="precip" src="images/precip.svg"/>'+"Precip : "+data.current.precip+"mm"+
                           '</div>'+
                           '<div class="rangement">'+
                           "<br>"+'<img id="humidity" src="images/humidity.svg"/>'+"Humidité :   "+data.current.humidity+"%"+
                           '</div>';
   }        



    function afficherMeteo(){
        var url = 'http://api.weatherstack.com/current?access_key=8c1e39208d86f59abc58e6dcdcb4837b&query=Evreux';


        $.get(url, callBackGetSuccess).done(function(){

        })
        .fail(function(){
        alert("error");
    })
    .always(function(){})
    }

    afficherMeteo();