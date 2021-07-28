var mapboxAccessToken = "pk.eyJ1IjoiamVubmllY2luZWxsaSIsImEiOiJja3F4d3VpMXEwdThnMnhxeXd6czhvNDByIn0.RVdoXt5ylCwQgYW7Z3WyBA";
var map = L.map('map').setView([37.8, -96], 5);



// add light tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
}).addTo(map);

// //  add states data to the map
L.geoJson(statesData).addTo(map);

//  assign our data route to a variable
var url = "/api/statecombineddata";

// grab the data with d3
d3.json(url).then(function(data) {

      for (var i=0; i<data.length; i++) {
         for (var j=0; j<data.length; j++) {
            if (data[i].state === statesData.features[j].properties.name) {
               statesData.features[j].properties.agg_median_price = data[i].agg_median_price;
            }
         };
         console.log(statesData);
      }

      var median = data.map(object => object.agg_median_price);
      var min = Math.min.apply(null, median);
      var max = Math.max.apply(null, median);
  
      console.log('min, max:', min, max);

    // create function that assign colors
    function getColor(d) {
      return d < 95985.32089552238  ? "#BFBFFF":
             d < 100000 ? "#89CFF1":
             d < 200000 ? "#6EB1D6":
             d < 300000? "#5293BB":
             d < 400000 ? "#3776A1":
             d < 500000 ? "#1B5886":
             d < 623932.5447761194 ? "#003A6B":
                            "#003A6B"                                   
  }     

    // create style function 
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.agg_median_price),
            weight: 1,
            opacity: 0.8,
            color: 'white',
            fillOpacity: 0.7
        };
    }


    //  add styles to our map
    L.geoJson(statesData, { style: style }).addTo(map);

    //  add the legend to the map
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        // create a div for the legend
        var div = L.DomUtil.create('div', 'info legend');
            div.innerHTML += "<p>Average Median Price</p>";
            grades = [95985.32089552238, 100000, 200000, 300000, 400000, 500000, 623932.5447761194]
            labels = [];
            grades1 = ["0-95", "95-100", "100-200", "200-300", "300-400", "400-500", "500+"]

        
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + 
                grades1[i] + '<br>' ;
        }        
        return div;
    };
    
    legend.addTo(map);
    
    // add mouseover event for each feature to style and show popup
    function onEachFeature(feature, layer) {
        layer.on('mouseover', function(e) {
            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 1
            });
        
            layer.openPopup();
        }).on('mouseout', function(e) {
            geojson.resetStyle(e.target);
            layer.closePopup();
        });
        
        // create the popup variable
        var popup = "<h2>" + (feature.properties.name) + "</h2>" + 
        "<p><strong>Average Median Price: </strong>" + feature.properties.agg_median_price + "</p>";
        // add the popup to the map and set location
        layer.bindPopup(popup, { className: 'popup', 'offset': L.point(0, -20) });
    }

    //  add the style and onEachFeature function to the map
    geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

});