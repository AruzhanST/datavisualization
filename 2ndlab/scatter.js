console.log("Hello world!");

async function scatterPlot() {
  console.log("scatterPlot");
  const data = await d3.json("./my_weather_data.json");
  //console.log(data);
  const yAcc = d => d.humidity;
  const dateParser = d3.timeParse("%Y-%m-%d");
  function xAcc(d) {
    return dateParser(d.date);
  }

  let dimensions = {
    width: window.innerWidth*1,
    height: 300,
    margin: {
      top: 30,
      left: 30,
      bottom: 30,
      right: 30
    }
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  let wrapper = d3.select("#wrapper").append("svg");
  wrapper.attr("width", dimensions.width);
  wrapper.attr("height", dimensions.height);
  let container = wrapper.append("g");
  container.attr("transform", `translate(${dimensions.margin.left},${dimensions.margin.top})`);
  // let xScale = d3.scaleLinear()
  //   .domain(d3.extent(data, xAcc))
  //   .range([dimensions.margin.left, dimensions.boundedWidth]);

  let xScale = d3.scaleTime()
    .domain(d3.extent(data, xAcc))
    .range([0, dimensions.boundedWidth])

  let yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAcc))
    .range([dimensions.boundedHeight, dimensions.margin.top]);
  let viz = container.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d=>xScale(xAcc(d)))
    .attr("cy", d=>yScale(yAcc(d)))
    .attr("r","5px")
    .attr("fill","#AA1111");
  let xAxisGen = d3.axisBottom().scale(xScale);
  let yAxisGen = d3.axisLeft().scale(yScale);
  const axisX = container.append("g").call(xAxisGen).style("transform", `translateY(${dimensions.boundedHeight}px)`)
  const axisY = container.append("g").call(yAxisGen).style("transform", `translateX(${dimensions.margin.left}px)`)
}
scatterPlot()





async function scatterPlot0() {
  const data0 = await d3.json("./my_weather_data.json");
  const yAcc0 = d0 => d0.dewPoint;
  const dateParser0 = d3.timeParse("%Y-%m-%d");
  function xAcc0(d0) {
    return dateParser0(d0.date);
  }

  let dimensions0 = {
    width: window.innerWidth*1,
    height: 300,
    margin: {
      top: 30,
      left: 30,
      bottom: 30,
      right: 30
    }
  }
  dimensions0.boundedWidth = dimensions0.width - dimensions0.margin.left - dimensions0.margin.right;
  dimensions0.boundedHeight = dimensions0.height - dimensions0.margin.top - dimensions0.margin.bottom;

  let wrapper0 = d3.select("#wrapper0").append("svg");
  wrapper0.attr("width", dimensions0.width);
  wrapper0.attr("height", dimensions0.height);
  let container0 = wrapper0.append("g");
  container0.attr("transform", `translate(${dimensions0.margin.left},${dimensions0.margin.top})`);

  let xScale0 = d3.scaleTime()
    .domain(d3.extent(data0, xAcc0))
    .range([0, dimensions0.boundedWidth])

  let yScale0 = d3.scaleLinear()
    .domain(d3.extent(data0, yAcc0))
    .range([dimensions0.boundedHeight, dimensions0.margin.top]);
  let viz0 = container0.selectAll("circle")
    .data(data0)
    .enter()
    .append("circle")
    .attr("cx", d0=>xScale0(xAcc0(d0)))
    .attr("cy", d0=>yScale0(yAcc0(d0)))
    .attr("r","7px")
    .attr("fill","#AA1111");
  let xAxisGen0 = d3.axisBottom().scale(xScale0);
  let yAxisGen0 = d3.axisLeft().scale(yScale0);
  const axisX0 = container0.append("g").call(xAxisGen0).style("transform", `translateY(${dimensions0.boundedHeight}px)`)
  const axisY0 = container0.append("g").call(yAxisGen0).style("transform", `translateX(${dimensions0.margin.left}px)`)
}
scatterPlot0()





async function scatterPlot1() {
  const data1 = await d3.json("./my_weather_data.json");
  const yAcc1 = d1 => d1.temperatureLow;
  const dateParser1 = d3.timeParse("%Y-%m-%d");
  function xAcc1(d1) {
    return dateParser1(d1.date);
  }

  let dimensions1 = {
    width: window.innerWidth*1,
    height: 300,
    margin: {
      top: 30,
      left: 30,
      bottom: 30,
      right: 30
    }
  }
  dimensions1.boundedWidth = dimensions1.width - dimensions1.margin.left - dimensions1.margin.right;
  dimensions1.boundedHeight = dimensions1.height - dimensions1.margin.top - dimensions1.margin.bottom;

  let wrapper1 = d3.select("#wrapper1").append("svg");
  wrapper1.attr("width", dimensions1.width);
  wrapper1.attr("height", dimensions1.height);
  let container1 = wrapper1.append("g");
  container1.attr("transform", `translate(${dimensions1.margin.left},${dimensions1.margin.top})`);

  let xScale1 = d3.scaleTime()
    .domain(d3.extent(data1, xAcc1))
    .range([0, dimensions1.boundedWidth])

  let yScale1 = d3.scaleLinear()
    .domain(d3.extent(data1, yAcc1))
    .range([dimensions1.boundedHeight, dimensions1.margin.top]);
  let viz1 = container1.selectAll("circle")
    .data(data1)
    .enter()
    .append("circle")
    .attr("cx", d1=>xScale1(xAcc1(d1)))
    .attr("cy", d1=>yScale1(yAcc1(d1)))
    .attr("r","7px")
    .attr("fill","#AA1111");
  let xAxisGen1 = d3.axisBottom().scale(xScale1);
  let yAxisGen1 = d3.axisLeft().scale(yScale1);
  const axisX1 = container1.append("g").call(xAxisGen1).style("transform", `translateY(${dimensions1.boundedHeight}px)`)
  const axisY1 = container1.append("g").call(yAxisGen1).style("transform", `translateX(${dimensions1.margin.left}px)`)
}
scatterPlot1()
