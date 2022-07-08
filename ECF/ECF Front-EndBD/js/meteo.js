    
    
    
   var callBackGetSuccess= function(data){
        console.log('donnes api', data);
        var zoneMeteo = document.getElementById("zone_meteo")
        zoneMeteo.innerHTML = '<h3>'+data.location.country+", "+data.location.name+", "+data.location.region+'</h3>'+
                                '<div class="meteoinfos">'+
                            '<img id="currentWeather" src ="images/animated/cloudy-day-1.svg"/>'+
                            '<h2>'+data.current.temp_c+"°C"+'</h2>'+
                           '</div>'+
                           '<div class="infosadd">'+
                           '<div class="rangement">'+
                           '<img id="wind" src="images/wind.svg"/>'+"Vent : " +data.current.wind_kph+"Kmph"+
                           '</div>'+
                           '<div class="rangement">'+
                           "<br>"+'<img id="precip" src="images/precip.svg"/>'+"Precip : "+data.current.precip_mm+"mm"+
                           '</div>'+
                           '<div class="rangement">'+
                           "<br>"+'<img id="humidity" src="images/humidity.svg"/>'+"Humidité :   "+data.current.humidity+"%"+
                           '</div>';
   }        



    function afficherMeteo(){
        var url = 'http://api.weatherapi.com/v1/current.json?key=66f58df9af87459e88f71414222505&q=Evreux&aqi=no';


        $.get(url, callBackGetSuccess).done(function(){

        })
        .fail(function(){
        alert("error");
    })
    .always(function(){})
    }

    afficherMeteo();