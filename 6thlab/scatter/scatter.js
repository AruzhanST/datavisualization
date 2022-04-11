async function scatterPlot() {

  // 1. Access data

  const dataset = await d3.json("./../../../my_weather_data.json")

  // 2. Create chart dimensions

  const width = 600
  let dimensions = {
    width: width,
    height: width * 0.6,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // 3. Draw canvas

  const wrapper = d3.select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
    .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

  // init static elements
  bounds.append("g")
    .attr("class", "dot")
    .attr("class", "x-axis")
    .style("transform", `translateY(${dimensions.boundedHeight}px)`)

  const yAccessor = d => d.humidity;
  const dateParser = d3.timeParse("%Y-%m-%d");
  function xAccessor(d) {
    return dateParser(d.date);
  }

  // 4. Create scales

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()

  var tool = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
  let viz = bounds.selectAll("dot")
    .data(dataset)
    .enter().append("circle")
    .attr("r", 5)
    .attr("cx", function(d) {
      return xScale(xAccessor(d));
    })
    .attr("cy", function(d) {
      return yScale(d.humidity);
    })
    .attr("stroke", "#6495ed")
    .attr("stroke-width", 1)
    .attr("fill", "#FFFFFF")

    .on('mouseover', function (d, i) {
      d3.select(this).transition()
        .duration('100')
        .attr("r", 7);
      //makes tooltip(class) appear
      tool.transition()
        .duration(100)
        .style("opacity", 1);
      tool.html("humidity:" + d3.format(".2f")(i.humidity))
       .style("left", (event.pageX + 10) + "px")
       .style("top", (event.pageY - 15) + "px");
    })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
        .duration('200')
        .attr("r", 5);
      //makes tooltip(class) disappear
      tool.transition()
        .duration('200')
        .style("opacity", 0);
    });

  let xAxisGen = d3.axisBottom().scale(xScale);
  let yAxisGen = d3.axisLeft().scale(yScale);
  const axisX = bounds.append("g").call(xAxisGen).style("transform", `translateY(${dimensions.boundedHeight}px)`)
  const axisY = bounds.append("g").call(yAxisGen).style("transform", `translateX(${dimensions.margin.left}px)`)
}
scatterPlot()
