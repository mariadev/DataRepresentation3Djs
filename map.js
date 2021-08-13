
function drawMap(featureCollection) {
    var features = featureCollection.features;
    var svg = d3.select('.map')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g');

    var center = d3.geoCentroid(featureCollection); 

    var projection = d3.geoMercator()
        .fitSize([width, height], featureCollection) 
        .center(center) 
        .translate([width / 2, height / 2])

    var pathProjection = d3.geoPath().projection(projection);
    var features = featureCollection.features;

    var createdPath = svg.selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', (d) => pathProjection(d))
        .attr("opacity", function (d, i) {
            d.opacity = 1
            return d.opacity
        });

    createdPath.on('mouseover', handleMouseOverM);
    createdPath.on('mouseout', handleMouseOutM);
    createdPath.on('click', function (event, d) {
        d3.select(this);
        d3.select(".axis > *").remove()
        window.barrioSele = d.properties.name;

    });

    function fillColor(d) {
        var price = d.properties.avgprice || 0; //Si no tengo ningun valor en la variable avgprice, asigno un 0
        return scaleColor(price);
      }

    var scaleColor = d3.scaleOrdinal(colourPalette);
    createdPath.attr('fill', fillColor);

    //Tooltip
    var tooltipM = d3.select("div").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px");

    function handleMouseOverM(event, d) {
        d3.select(this).attr("fill", "pink");
        tooltipM
            .transition()
            .duration(200)
            .style("visibility", "visible")
            .style("left", event.pageX + 20 + "px")
            .style("top", event.pageY - 30 + "px")
            .text(`Area: ${d.properties.name}, Price: ${d.properties.avgprice} Eur`);
    }

    function handleMouseOutM(event, d) {
        createdPath.attr('fill', fillColor);
        tooltipM.transition().duration(200).style("visibility", "hidden");

    }

}


