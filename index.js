var margin = { top: 0, right: 0, bottom: 0, left: 0 };
var width = 355.6;
var height = 215.9;

var sankey = d3
  .sankeyCircular()
  .nodeWidth(3)
  .nodePadding(30)
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
  .attr("width", width + margin.left + margin.right + "mm")
  .attr("height", height + margin.top + margin.bottom + "mm");

var g = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var linkG = g
  .append("g")
  .attr("fill", "none")
  .attr("stroke-opacity", 0.3)
  .selectAll("path");

var nodeG = g
  .append("g")
  .attr("font-family", "monospace")
  .attr("font-size", 3)
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
    return `images/${d.type}.svg`;
  });

var link = linkG.data(sankeyLinks).enter().append("g");

link
  .append("path")
  .attr("d", function (link) {
    return link.path;
  })
  .style("stroke-width", function (d) {
    return Math.max(0.3, d.width);
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
  .arrowLength(4)
  .gapLength(75)
  .arrowHeadSize(1.5)
  .strokeWidth(0.7)
  .path(function (link) {
    return link.path;
  });

var arrowsG = linkG.data(sankeyLinks).enter().append("g").call(arrows);
