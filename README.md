## DATA TYPES 
* Categorical (genres) 
* Ordinal (t-shirt sizes) 
* Quantitative (temperatures) 
* Temporal (dates) 
* Spatial (cities)


## BASIC CHARTS
* Bar chart
![Test Image 1](https://github.com/pacofeng/frontendmaster-data-visualization-for-react-developers/blob/master/img/Screen%20Shot%202020-05-31%20at%202.18.51%20AM.png)

* Histogram 
![Test Image 1](https://github.com/pacofeng/frontendmaster-data-visualization-for-react-developers/blob/master/img/Screen%20Shot%202020-05-31%20at%202.19.14%20AM.png)

* Scatterplot 
![Test Image 1](https://github.com/pacofeng/frontendmaster-data-visualization-for-react-developers/blob/master/img/Screen%20Shot%202020-05-31%20at%202.19.21%20AM.png)

* Line chart 
![Test Image 1](https://github.com/pacofeng/frontendmaster-data-visualization-for-react-developers/blob/master/img/Screen%20Shot%202020-05-31%20at%202.19.26%20AM.png)

* Tree
![Test Image 1](https://github.com/pacofeng/frontendmaster-data-visualization-for-react-developers/blob/master/img/Screen%20Shot%202020-05-31%20at%202.19.32%20AM.png)

* Node-link
![Test Image 1](https://github.com/pacofeng/frontendmaster-data-visualization-for-react-developers/blob/master/img/Screen%20Shot%202020-05-31%20at%202.19.39%20AM.png)

* Chloropleth
![Test Image 1](https://github.com/pacofeng/frontendmaster-data-visualization-for-react-developers/blob/master/img/Screen%20Shot%202020-05-31%20at%202.19.44%20AM.png)
![Test Image 1](https://github.com/pacofeng/frontendmaster-data-visualization-for-react-developers/blob/master/img/Screen%20Shot%202020-05-31%20at%202.26.01%20AM.png)

* Pie chart
![Test Image 1](https://github.com/pacofeng/frontendmaster-data-visualization-for-react-developers/blob/master/img/Screen%20Shot%202020-05-31%20at%202.19.59%20AM.png)


## SVG ELEMENTS
![Test Image 1](https://github.com/pacofeng/frontendmaster-data-visualization-for-react-developers/blob/master/img/53FD15B9-7FF2-4942-BC8F-FE60CE4C1A5B.png)


## SVG COORDINATE SYSTEM
* x = 25, y = 50
![Test Image 1](https://github.com/pacofeng/frontendmaster-data-visualization-for-react-developers/blob/master/img/Screen%20Shot%202020-05-31%20at%202.35.45%20AM.png)


## BAR CHART
* scale: mapping from data attributes (domain) to display (range)
```
d3.scaleLinear()
    .domain([min, max]) // input
    .range([min, max]); // output
```
* 使用场景
    * Quantitative    
        * Continuous domain和Continuous range:    
            * scaleLinear 
            * scaleLog 
            * scaleTime 
        * Continuous domain和Discrete range    
            * scaleQuantize 
            * Categorical    
        * Discrete domain和Discrete range    
            * scaleOrdinal 
        * Discrete domain和Continuous range    
            * scaleBand
* d3-scale: https://github.com/d3/d3-scale
* Create a bar chart with D3 scales: https://observablehq.com/@sxywu/data-visualization-for-react-developers-full
```
var data = [{"date":"2017-01-01T08:00:00.000Z","high":54,"avg":50,"low":46}];
var width = 650;
var height = 400;

var barChartData = {
    // map date to x position
    // get min and max of date
    const xExtent = d3.extent(data, d => d.date);
    const xScale = d3.scaleTime()
        .domain(xExtent)
        .range([0, width]);

    // map date to y position
    // get min and max of high temp
    const [min, max] = d3.extent(data, d => d.high);
    const yScale = d3.scaleLinear()
        .domain([Math.min(min, 0), max])
        .range([height, 0]);

    // map avg temp to color
    // get min and max of avg temp
    const colorExtent = d3.extent(data, d => d.avg).reverse();
    const colorScale = d3.scaleSequential()
        .domain(colorExtent)
        .interpolator(d3.interpolateRdYlBu);

    return data.map(d => {
        return {
            x: xScale(d.date),
            y: yScale(d.high),
            height: yScale(d.low) - yScale(d.high),
            fill: colorScale(d.avg)
        }
    });
};
```

## LINE CHART
* d3.line()
d3.line()
    .x(fn)
    .y(fn);
* d3-shape
* Create a line chart with D3 line: https://observablehq.com/@sxywu/data-visualization-for-react-developers-full
```
var data = [{"date":"2017-01-01T08:00:00.000Z","high":54,"avg":50,"low":46}];
var width = 650;
var height = 400;

var lineChartData = {
    const xExtent = d3.extent(data, d => d.date);
    const xScale = d3.scaleTime()
        .domain(xExtent)
        .range([0, width]);

    // min: low temp, max: high temp
    const highMax = d3.max(data, d => d.high);
    const lowMin = d3.min(data, d => d.low);
    const yScale = d3.scaleLinear()
        .domain([lowMin, highMax])
        .range([height, 0]);

    const highLine = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.high));

    const lowLine = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.low));

    return [
        { path: highLine(data), fill: 'red' },
        { path: lowLine(data), fill: 'blue' }
    ]
};
```

## RADIAL CHART
* d3.arc()
* Create a line chart with D3 arc: https://observablehq.com/@sxywu/data-visualization-for-react-developers-full
```
var data = [{"date":"2017-01-01T08:00:00.000Z","high":54,"avg":50,"low":46}];
var width = 650;
var height = 400;

var radialChartData = {
    const radiusScale = d3.scaleLinear()
        .domain([
            d3.min(data, d => d.low),
            d3.max(data, d => d.high)
        ]).range([0, width / 2]);

    const colorScale = d3.scaleSequential()
        .domain(d3.extent(data, d => d.avg).reverse())
        .interpolator(d3.interpolateRdYlBu);

    // get the angle for each slice
    // 2PI / 365
    const perSliceAngle = (2 * Math.PI) / data.length;
    const artGenerator = d3.arc();

    return data.map((d, i) => {
        const path = artGenerator({
            startAngle: i * perSliceAngle,
            endAngle: (i + 1) * perSliceAngle,
            innerRadius: radiusScale(d.low),
            outerRadius: radiusScale(d.high)
        });
        return { path, fill: colorScale(d.avg) }
    });
};
```

## REACT RENDERS - Architecture
* Division of responsibilities:
    * Chart component 
        * Gets passed in raw data as prop 
        * Translates raw data to screen space 
        * Renders the calculated data 
        * Manages state for interactions that don’t require redrawing of the chart (hover, click) 
    * Root component 
        * Manages updates to raw data 
        * Manages state for interactions that require redrawing of charts (filter, aggregate, sort, etc.)
* Where to calculate data: 
    * getDerivedStateFromProps 
        * Pro: simple and straightforward 
        * Con: asynchronous, race conditions if not careful 
    * render 
        * Pro: very straightforward 
        * Con: will recalculate on every lifecycle 
    * componentDidMount & componentDidUpdate 
        * Pro: no race condition 
        * Con: less straightforward

## d3 RENDERS
1. Instantiate d3 function in componentDidMount 
2. Create <g /> container in render 
3. Place d3 code in 
    * componentDidMount and/or
    * componentDidUpdate 
    
**Never ever let D3 and React manage same parts of the DOM! OR BUGS!!

## AXES
* Create axisLeft or axisBottom at beginning of React lifecycle and set corresponding scale
```
const yAxis = d3.axisLeft()
    .scale(yScale);
```
* Create an SVG group element in render
```
<g ref="group" />
```
* Call axis on the group element in componentDidUpdate
```
d3.select(this.requestAnimationFrame.group)
    .call(yAxis);
```

## TRANSITIONS
1. Select elements to transition 
2. Bind data 
3. Call transition 
4. Set the attributes to transition 

**Make sure React doesn't manage the attributes D3 is transitioning! It works, it's performant, but the code is ugly.  I don't highly recommend it.
```
// in componentDidUpdate
d3.select(this.refs.bars)
    .selectAll('rect')
    .data(this.state.bars)
    .transition()
    .attr('y', d => d.y)
    .attr('height', d => d.height)
    .attr('fill', d => d.fill);

// in render
<g ref='bars'>
    {this.state.bars.map((d, i) => (<rect key={i} x={d.x} width='2' />))}
</g>
```

## BRUSH
1. Create brush instance 
2. Define brushable area (extent) 
3. Pass in a function to execute on every brush, or brush end
```
// in componentDidMount
this.brush = d3.brush()
    .extent([[0, 0], [width ,height]]) // [[top left], [right bottom]]
    .on('end', () => ...);

d3.select(this.refs.brush)
    .call(this.brush);

// in render
<g ref='brush' />
```







