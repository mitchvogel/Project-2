// Store urls to Flask API
var state_combined_url = "/api/statecombineddata";
var state_url = "/api/statedata";
var city_url = "/api/citydata";

// Read in state combined data
d3.json(state_combined_url).then(function(data) {
   
   // Create empty arrays to store data
   state_names = [];
   avg = [];

   // Loop through state combined data and add to empty lists
   for (var i=0; i<data.length; i++) {
      state_names.push(data[i].state);
      avg.push(data[i].agg_median_price);
   }
   
   // Create scatter chart of state combined data
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
               },
            }],
            xAxes: [{
               ticks: {
                  fontColor: 'black'
               }
            }]
         },
         title: {
            display: true,
            text: 'Aggregate Median Household Price from 2010-2020',
            fontColor: 'rgba(55, 241, 154, 0.918)',
            fontSize: 18
         },
         legend: {
            display: false
         }
      }
   });
});

// Read in state data
d3.json(state_url).then(function(data) {

   // Select the dropdown menu
   var select = d3.select("#selDataset");

   // Append the list of states to the dropdown menu
   for (var i=0; i<data.length; i++) {
      select.append("option").text(data[i].state)
   };

   // Runs when the drop down menus are selected
   function handleSubmit() {

      // Prevent page from refreshing
      d3.event.preventDefault();
  
      // Select dropdown menu
      var dropdownMenu = d3.select("#selDataset");
  
      // Select the state
      var state_selection = dropdownMenu.property("value");
      
      // Append list of cities based on state selected
      appendcitylist(state_selection);

      // Build plots with chosen state
      buildstatePlot(state_selection);
      buildcityPlot(state_selection);
   };

   // Function to create bar chart of state data
   function buildstatePlot(state_selection) {

      // Create empty list to hold state data
      state_values = [];

      // Loop through array and add to empty list
      for (var i=0; i<data.length; i++) {
         if (data[i].state === state_selection) {
            state_values.push(data[i].dec_2010);
            state_values.push(data[i].dec_2011);
            state_values.push(data[i].dec_2012);
            state_values.push(data[i].dec_2013);
            state_values.push(data[i].dec_2014);
            state_values.push(data[i].dec_2015);
            state_values.push(data[i].dec_2016);
            state_values.push(data[i].dec_2017);
            state_values.push(data[i].dec_2018);
            state_values.push(data[i].dec_2019);
            state_values.push(data[i].dec_2020);
            break;
         };
      };

      // Create bar chart of state data
      const labels = ["12/31/2010", "12/31/2011", "12/31/2012", "12/31/2013", "12/31/2014", "12/31/2015", "12/31/2016", "12/31/2017", "12/31/2018", "12/31/2019", "12/31/2020"];
      const bar_data = {
         labels: labels,
         datasets: [{
            label: 'Median Household Prices',
            data: state_values,
            backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(255, 159, 64, 0.2)',
               'rgba(255, 205, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 99, 132, 0.2)',
               'rgba(255, 159, 64, 0.2)',
               'rgba(255, 205, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
               'rgb(255, 99, 132)',
               'rgb(255, 159, 64)',
               'rgb(255, 205, 86)',
               'rgb(75, 192, 192)',
               'rgb(54, 162, 235)',
               'rgb(153, 102, 255)',
               'rgb(255, 99, 132)',
               'rgb(255, 159, 64)',
               'rgb(255, 205, 86)',
               'rgb(75, 192, 192)',
               'rgb(54, 162, 235)',
               'rgb(153, 102, 255)'
            ]
         }],
      };

      var ctx = document.getElementById('barChart').getContext('2d');

      var myBarChart = new Chart(ctx, {
         type: 'bar',
         data: bar_data,
         options: {
            scales: {
               y: {
                  beginAtZero: true
               },
               yAxes: [{
                  ticks: {
                     fontColor: 'black'
                  },
               }],
               xAxes: [{
                  ticks: {
                     fontColor: 'black'
                  }
               }]
            },
            title: {
               display: true,
               text: 'Median Household Price Per Year (2010-2020)',
               fontColor: 'rgba(55, 241, 154, 0.918)',
               fontSize: 18
            },
            legend: {
               display: false
            }
         }
      })
   };

   // Function to append list of cities to dropdown menu
   function appendcitylist(state_selection) {

      // Select city dropdown menu and remove all cities
      d3.select("#selDataset2").selectAll("option").remove();

      // Read in city data
      d3.json(city_url).then(function(city_data) {

         // Select the city dropdown menu
         var select = d3.select("#selDataset2");

         // Append the list of cities to the dropdown menu
         for (var i=0; i<city_data.length; i++) {
            if (state_selection === city_data[i].state) {
               select.append("option").text(city_data[i].city)
            }
         };
      });
   }

   // Function to create bar chart of city data
   function buildcityPlot(state_selection) {

      // Read in city data
      d3.json(city_url).then(function(city_data) {

         // Select dropdown menu
         var dropdownMenu = d3.select("#selDataset2");
  
         // Select the city
         var city_selection = dropdownMenu.property("value");

         // Create empty list to store city data
         var city_values = [];

         // Loop through city data and append to city value list
         for (var i=0; i<city_data.length; i++) {
            if (city_data[i].city === city_selection) {
               city_values.push(city_data[i].dec_2010);
               city_values.push(city_data[i].dec_2011);
               city_values.push(city_data[i].dec_2012);
               city_values.push(city_data[i].dec_2013);
               city_values.push(city_data[i].dec_2014);
               city_values.push(city_data[i].dec_2015);
               city_values.push(city_data[i].dec_2016);
               city_values.push(city_data[i].dec_2017);
               city_values.push(city_data[i].dec_2018);
               city_values.push(city_data[i].dec_2019);
               city_values.push(city_data[i].dec_2020);
               break;
            };
         };

         // Create bar chart of city data
         const labels = ["12/31/2010", "12/31/2011", "12/31/2012", "12/31/2013", "12/31/2014", "12/31/2015", "12/31/2016", "12/31/2017", "12/31/2018", "12/31/2019", "12/31/2020"];
         const bar_data = {
            labels: labels,
            datasets: [{
               label: 'Median Household Prices',
               data: city_values,
               backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
               ],
               borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)'
               ]
            }],
         };

         var ctx = document.getElementById('barChart_city').getContext('2d');

         var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: bar_data,
            options: {
               scales: {
                  y: {
                     beginAtZero: true
                  },
                  yAxes: [{
                     ticks: {
                        fontColor: 'black'
                     },
                  }],
                  xAxes: [{
                     ticks: {
                        fontColor: 'black'
                     }
                  }]
               },
               title: {
                  display: true,
                  text: 'Median Household Price Per Year (2010-2020)',
                  fontColor: 'rgba(55, 241, 154, 0.918)',
                  fontSize: 18
               },
               legend: {
                  display: false
               }
            }
         })
      });
   }

   // When a new state is selected run the function handleSubmit
   d3.select("#selDataset").on("change", handleSubmit);
   d3.select("#selDataset2").on("change", buildcityPlot);
});