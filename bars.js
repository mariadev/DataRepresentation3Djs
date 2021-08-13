

function createBars(featureCollection) {

    var features = featureCollection.features;
    var heightAxis = 800;
    var marginbottom = 100;
    var margintop = 50;
    var average = features[0].properties.avgbedrooms

    var svgAxis = d3.select('.bar')
        .append('svg')
        .attr('width', width)
        .attr('height', heightAxis + marginbottom + margintop)
        .append('g')
        .attr("transform", "translate( " + margintop + "," + margintop + ")");

    svgAxis.append("text")
        .attr("transform",
            "translate(" + ((width - 100) / 2) + " ," +
            (height) + ")")
        .style("text-anchor", "middle")
        .text("Num de habitaciones");

    var scaleY = d3.scaleLinear()
        .domain(0, 1000)
        .range([height, 0]);

    var axisY = d3.axisLeft(scaleY).ticks(4);
    scaleY.domain([0, d3.max(average, (d) => d.total)]).nice();

    var num_bed = [];
    var total_pro = [];
    var inputA = [];
    featureCollection.features.forEach((d) => {
        if (d.properties.name == window.barrioSele) {

            d.properties.avgbedrooms.forEach((g) => {
                inputA.push(g);
                num_bed.push(g.bedrooms);
                total_pro.push(+g.total);
            });

        }
    });

    var scaleX = d3.scaleBand()
        .domain(num_bed)
        .range([0, width - 100])
        .padding(0.1);

    var scaleY = d3.scaleLinear()
        .domain([0, Math.max.apply(null, total_pro)])
        .range([heightAxis, 0]);

    var axisX = d3.axisBottom(scaleX);

    var rect = svgAxis
        .selectAll('rect')
        .data(inputA)
        .enter()
        .append('rect')
        .attr("fill", "#BDB2FF");

    rect
        .attr("x", function (d) {
            return scaleX(d.bedrooms);
        })
        .attr('y', d => {
            return scaleY(0)
        })
        .attr("width", scaleX.bandwidth())
        .attr("height", function () {
            return heightAxis - scaleY(0); 
        });

    rect
        .transition()
        .duration(1000)
        .delay(function (d, i) {
            return (i * 1000)
        })
        .attr('y', d => {
            return scaleY(d.total)
        })
        .attr("height", function (d) {
            return heightAxis - scaleY(d.total); 
        });

    var text = svgAxis.selectAll('text')
        .data(inputA)
        .enter()
        .append('text')
        .text(d => d.total)
        .attr("x", function (d) {
            return scaleX(d.bedrooms) + scaleX.bandwidth() / 2;
        })
        .attr('y', d => {
            return scaleY(d.total)
        })
        .style("opacity", 0)


    text
        .transition()
        .duration(500)
        .delay(d3.max(inputA, function (d, i) {
            return i;
        }) * 1000 + 1000)
        .style("opacity", 1);

    svgAxis.append("g")
        .attr("transform", "translate(0," + heightAxis + ")")
        .call(axisX);

    svgAxis.append("g")
        .attr('transform', 'translate(0, -67)')
        .call(axisY);

    svgAxis.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("dx", -35)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Num de propiedades");

};