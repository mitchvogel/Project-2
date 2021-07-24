var city_url = "http://127.0.0.1:5000/api/citydata"

d3.json(city_url).then(function(data) {
   console.log(data);
});