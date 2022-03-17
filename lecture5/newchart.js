async function drawLineChart() {
  const dataset = await d3.json("./my_weather_data.json")

  const width = 600
  let dimensions = {
    width: width,
    height: width*0.6,
    margin: {
      top: 20,
      right: 30,
      bottom: 20,
      left: 30,
    },
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // 3) Draw canvas
  const wrapper = d3.select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
    .style("translate", `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);

  //init static elements
  bounds.append("g")
    .attr("class", "path")
  bounds.append("line")
    .attr("class", "mean")
  bounds.append("g")
    .attr("class", "x-axis")
    .style("transform", `translateY(${dimensions.boundedHeight}px)`)
    .append("text")
    .attr("class", "x-axis-label")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)

  const drawChart = metric => {
    //Accessor
    const metricAccessor = d => d[metric];
    const yAccessor = d => d.length;

    const exitTransition = d3.transition().duration(600)
    const updateTransition = exitTransition.transition().duration(600)

    const yScaler = d3.scaleLinear()
    .domain(d3.extent(dataset,yAccessor))
    .range([dimensions.boundedHeight,0]);

    const xScaler = d3.scaleLinear()
    .domain(d3.extent(dataset, metricAccessor))
    .range([0, dimensions.boundedWidth])

    const lineGenerator = d3.line()
    .x(d=>xScaler(metricAccessor(d)))
    .y(d=>yScaler(yAccessor(d)))

    const line = bounds.selectAll(".path")
      .attr("x",0)
      .attr("width", dimensions.boundedWidth)
      .attr("y", yScaler(32))
      .attr("height", dimensions.boundedHeight - yScaler(32))
      .attr("fill", "#eeeeee")
      .attr("d", lineGenerator(dataset))
      .attr("fill", "none")
      .attr("stroke", "#af9999")
      .attr("stroke-width", 2)

    const yAxisGenerator = d3.axisLeft()
    .scale(yScaler);

    const xAxisGenerator = d3.axisBottom()
    .scale(xScaler);

    // const yAxis = bounds.append("g").call(yAxisGenerator);
    // const xAxis = bounds.append("g").call(xAxisGenerator)
    // .style("transform",`translateY(${dimensions.boundedHeight}px)`)

    const mean = d3.mean(dataset, metricAccessor);
    console.log(mean);
    const meanLine = bounds.selectAll(".mean")
      .transition(updateTransition)
      .attr("x1", xScaler(mean))
      .attr("x2", xScaler(mean))
      .attr("y1", -15)
      .attr("y2", dimensions.boundedHeight)
  }

  const metrics = [
    "windSpeed",
    "moonPhase",
    "dewPoint",
    "humidity",
    "uvIndex",
    "windBearing",
    "temperatureMin",
    "temperatureMax"
  ]
  let mIndex = 0

  drawChart(metrics[mIndex])
  const button = d3.select("body")
    .append("button")
    .text("Change Metric")

  button.node().addEventListener("click", onClick)

  function onClick() {
    mIndex = (mIndex + 1) % metrics.length
    drawChart(metrics[mIndex])
    console.log(mIndex)
  }
}
drawLineChart()
