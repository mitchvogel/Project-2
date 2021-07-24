var state_combined_url = "/api/statecombineddata";
var state_url = "/api/statedata";
var city_url = "/api/citydata";

d3.json(state_combined_url).then(function(data) {
   //console.log(data);

   state_names = [];
   avg = [];

   for (var i=0; i<data.length; i++) {

      state_names.push(data[i].state);
      avg.push(data[i].agg_median_price);

   }
   
   const labels = state_names;
   const scatter_data = {
     labels: labels,
     datasets: [{
       label: 'Aggregate Median Household Prices',
       data: avg,
       showLine: false,
       pointBackgroundColor: 'black',
       pointRadius: 5
     }]
   };

   var ctx = document.getElementById('scatterChart').getContext('2d');

   var scatterChart = new Chart(ctx, {
      type: 'line',
      data: scatter_data,
      options: {
         scales: {
            yAxes: [{
               ticks: {
                  fontColor: 'black'
               }
            }],
            xAxes: [{
               ticks: {
                  fontColor: 'black'
               }
            }]
         }
         
   
      
      }
   });
});

// d3.json(state_url).then(function(data) {
//    console.log(data);
// });

// d3.json(city_url).then(function(data) {
//    console.log(data);
// });