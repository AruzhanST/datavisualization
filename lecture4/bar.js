async function drawBar() {
  const dataset = await d3.json("forvizz.json")
  console.table(dataset);
  // 1) Accessor
  const xAccessor = d => d;
  const yAccessor = d => d.length;

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

  const xScaler = d3.scaleLinear()
    .domain(d3.extent(dataset,xAccessor))
    .range([0,dimensions.boundedWidth])

  const binsGen = d3.bin()
    .domain(xScaler.domain())
    .value(xAccessor)
    .thresholds(35)

  const bins = binsGen(dataset);
  console.log(bins);

  const yScaler = d3.scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([dimensions.boundedHeight,0])

  const binsGroup = bounds.append("g");
  const binGroups = binsGroup.selectAll("g")
    .data(bins)
    .enter()
    .append("g");

  const barPadding = 1
  const barRect = binGroups.append("rect")
        .attr("x", d => xScaler(d.x0) + barPadding/2)
        .attr("y", d => yScaler(yAccessor(d)))
        .attr("width", d => d3.max([0, xScaler(d.x1) - xScaler(d.x0) - barPadding]))
        .attr("height", d => dimensions.boundedHeight - yScaler(yAccessor(d)))
        .attr("fill", "#cc99ff");

  // For home assignment (lab3), we had to create x and y axises, and the following is what we need:
  let xAxisGen = d3.axisBottom().scale(xScaler);
  let yAxisGen = d3.axisLeft().scale(yScaler);
  const axisX = bounds.append("g").call(xAxisGen).style("transform", `translateY(${dimensions.boundedHeight}px)`)
  const axisY = bounds.append("g").call(yAxisGen).style("transform", `translateX(${dimensions.margin.left}px)`)

  //mean
  const mean = d3.mean(dataset, xAccessor);
  console.log(mean);
  const meanLine = bounds.append("line")
    .attr("x1", xScaler(mean))
    .attr("x2", xScaler(mean))
    .attr("y1", -20)
    .attr("y2", dimensions.boundedHeight)
    .attr("stroke", "black")
    .attr("stroke-dasharray", "2px 4px")

  const meanLabel = bounds.append("text")
    .attr("x", xScaler(mean))
    .attr("y", 10)
    .text("Mean")
    .attr("fill", "maroon")
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")

  const barText = binGroups.filter(yAccessor)
    .append("text")
    .attr("x", d => xScaler(d.x0) + (xScaler(d.x1)-xScaler(d.x0))/2)
    .attr("y", d => yScaler(yAccessor(d)) - 5)
    .text(yAccessor)
    .attr("fill", "darkgreen")
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
}
drawBar()
