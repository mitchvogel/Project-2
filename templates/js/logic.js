var city_url = "/api/citydata"

d3.json(city_url).then(function(data) {
   console.log(data);
});