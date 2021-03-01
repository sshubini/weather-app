

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=d45d73bd9864b3ae2216f9a07f82a08d`
    )
      .then(function(response){
      return response.json();
    })
      .then(function(json){
        console.log(json);
        const weather = json.weather[0].main;  
      });


