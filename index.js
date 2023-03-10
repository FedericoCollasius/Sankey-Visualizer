var margin = { top: 30, right: 30, bottom: 30, left: 30 };
var width = 800;
var height = 600;

var sankey = d3
  .sankeyCircular()
  .nodeWidth(10)
  //.nodePadding(30)
  .nodePaddingRatio(0.8)
  .size([width, height])
  .nodeId(function (d) {
    return d.name;
  })
  .nodeAlign(d3.sankeyJustify)
  .iterations(1024)
  .circularLinkGap(2);

var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var g = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var linkG = g
  .append("g")
  .attr("class", "links")
  .attr("fill", "none")
  .attr("stroke-opacity", 0.3)
  .selectAll("path");

var nodeG = g
  .append("g")
  .attr("class", "nodes")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .selectAll("g");

//run the Sankey + circular over the data
let sankeyData = sankey(data);
let sankeyNodes = sankeyData.nodes;
let sankeyLinks = sankeyData.links;

console.log(sankeyLinks);

let depthExtent = d3.extent(sankeyNodes, function (d) {
  return d.depth;
});

var node = nodeG.data(sankeyNodes).enter().append("g");

node
  .append("rect")
  .attr("x", function (d) {
    return d.x0;
  })
  .attr("y", function (d) {
    return d.y0;
  })
  .attr("height", function (d) {
    return d.y1 - d.y0;
  })
  .attr("width", function (d) {
    return d.x1 - d.x0;
  })
  .style("fill", function (d) {
    return (
      {
        well: "#4975ff",
        tank: "#002fc3",
        coso: "#ff00ff",
        cooling_tower: "#ff00ff",
        boiler: "#ff00ff",
        plant: "#ff00ff",
      }[d.type] || "black"
    );
  })
  .style("opacity", 1);

node
  .append("text")
  .attr("x", function (d) {
    return (d.x0 + d.x1) / 2;
  })
  .attr("y", function (d) {
    return d.y0 - 12;
  })
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle")
  .text(function (d) {
    return d.name;
  });

node
  .append("image")
  .attr("height", 50)
  .attr("x", function (d) {
    return (d.x0 + d.x1) / 2 - 15;
  })
  .attr("y", function (d) {
    return d.y0 - 70;
  })
  .attr("href", function (d) {
    return `./images/${d.type}.svg`;
  });

var link = linkG.data(sankeyLinks).enter().append("g");

link
  .append("path")
  .attr("class", "sankey-link")
  .attr("d", function (link) {
    return link.path;
  })
  .style("stroke-width", function (d) {
    return Math.max(1, d.width);
  })
  .style("stroke", function (link, i) {
    return {
      steam: "red",
      industrial: "cyan",
      potable: "green",
      drain: "yellow",
    }[link.type];
  });

let arrows = pathArrows()
  .arrowLength(10)
  .gapLength(150)
  .arrowHeadSize(4)
  .path(function (link) {
    return link.path;
  });

var arrowsG = linkG
  .data(sankeyLinks)
  .enter()
  .append("g")
  .attr("class", "g-arrow")
  .call(arrows);
