async function lineChart() {

  // 1. Access data

  const dataset = await d3.json("./../../../my_weather_data.json")

  const yAccessor = d => d.humidity
  const dateParser = d3.timeParse("%Y-%m-%d");
  function xAccessor(d) {
    return dateParser(d.date);
  }
  // 2. Create chart dimensions

  const width = 600
  let dimensions = {
    width: width,
    height: width*0.6,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // 3. Draw canvas and create a bounding box

  const wrapper = d3.select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
  const bounds = wrapper.append("g")
    .attr("class", "rect")
    .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

  // 4. Create scales

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()

  //convert datapoints into X and Y value
  const lineGenerator = d3.line()
      .x(d=>xScale(xAccessor(d)))
      .y(d=>yScale(yAccessor(d)))

  var tool = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
  //convert X and Y into path
  const line = bounds.append("path")
    .attr("d", lineGenerator(dataset))
    .attr("fill", "none")
    .attr("stroke", "#abc78a")
    .attr("stroke-width", 2)
    .on('mouseover', function (d, i) {
      d3.select(this).transition()
        .duration('100')
        .attr("r", 7);
      //makes tooltip(class) appear
      tool.transition()
        .duration(100)
        .style("opacity", 1);
      tool.html("humidity:" + d3.format(".2F")(yAccessor(d)))
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
  //Create x-axis and y-axis
  const xAxisGen = d3.axisBottom().scale(xScale);
  const yAxisGen = d3.axisLeft().scale(yScale);
  const axisX = bounds.append("g").call(xAxisGen).style("transform", `translateY(${dimensions.boundedHeight}px)`)
  const axisY = bounds.append("g").call(yAxisGen).style("transform", `translateX(${dimensions.margin.left}px)`)
}
lineChart()
