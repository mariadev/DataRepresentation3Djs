

function legend(featureCollection) {

    var features = featureCollection.features;
    var priceMax = d3.max(features, (d) => d.properties.avgprice);
    var f = d3.format(",.0f");
    var arrayAvgPrice = features.map(el => el.properties.avgprice)
    var cleanArrayAvgPrice = arrayAvgPrice.filter(el => el != undefined)
    var roundNumber = cleanArrayAvgPrice.map(el => Math.ceil(el))


    var nblegend = 10;
    var widthRect = (width / nblegend) - 2;
    var heightRect = 10;

    var scaleLegend = d3.scaleLinear()
        .domain([0, nblegend])
        .range([0, width]);

    var svgLegend = d3.select('.legend')
        .append('svg')
        .attr('width', width - 200)
        .attr('height', 50)

    var legend = svgLegend.append("g")
        .selectAll("rect")
        .data(colourPalette)
        .enter()
        .append("rect")
        .attr("width", widthRect)
        .attr("height", heightRect)
        .attr("x", (d, i) => scaleLegend(i)) // o (i * (widthRect + 2)) //No haria falta scaleLegend
        .attr("fill", (d) => d);

    var text_legend = svgLegend.append("g")
        .selectAll("text")
        .data(colourPalette)
        .enter()
        .append("text")
        .attr("x", (d, i) => scaleLegend(i)) // o (i * (widthRect + 2))
        .attr("y", heightRect * 2.5)
        .text((d, i) => "Desde " + f(priceMax * (i / numberOfCategories)) + " Eur.")
        .attr("font-size", 12)

};