const makeSankey = () => {
  document.querySelector("#chart").innerHTML = "";

  let margin = { top: 0, right: 12, bottom: 0, left: 12 };
  let width = 355.6;
  let height = 215.9;

  let sankey = d3
    .sankeyCircular()
    .nodeWidth(3)
    .nodePadding(30)
    .nodePaddingRatio(0.8)
    .size([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom,
    ])
    .nodeId(function (d) {
      return d.name;
    })
    .nodeAlign(d3.sankeyJustify)
    .iterations(1024)
    .circularLinkGap(2);

  let svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + "mm")
    .attr("height", height + "mm");

  let g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let linkG = g
    .append("g")
    .attr("fill", "none")
    .attr("stroke-opacity", 0.3)
    .selectAll("path");

  let nodeG = g
    .append("g")
    .attr("font-family", "Arial")
    .attr("font-size", 3)
    .selectAll("g");

  if (window.nodesTable === undefined || window.linksTable === undefined) {
    return;
  }

  const nodesData = window.nodesTable.getData();
  const linkTypeData = window.linksTypeTable.getData();
  const linksData = window.linksTable.getData();

  const _nodes = nodesData.map((arr) => ({
    id: arr[0],
    name: arr[1],
    color: arr[2],
  }));
  const _linkType = linkTypeData.map((arr) => ({
    id: arr[0],
    name: arr[1],
    color: arr[2],
  }));
  const _links = linksData
    .filter(
      (arr) =>
        nodesData.find((node) => node[0] == arr[0]) &&
        nodesData.find((node) => node[0] == arr[1])
    )
    .map((arr) => ({
      source: nodesData.find((node) => node[0] == arr[0])[1],
      target: nodesData.find((node) => node[0] == arr[1])[1],
      value: parseFloat(arr[3]) * (arr[4] === "ton/año" ? 1000 : 1),
      color: (
        _linkType.find((linkType) => linkType.id == arr[2]) || {
          color: "black",
        }
      ).color,
    }));

  //run the Sankey + circular over the data
  let sankeyData = sankey({
    nodes: _nodes,
    links: _links,
  });
  let sankeyNodes = sankeyData.nodes;
  let sankeyLinks = sankeyData.links;

  let depthExtent = d3.extent(sankeyNodes, function (d) {
    return d.depth;
  });
  let node = nodeG.data(sankeyNodes).enter().append("g");

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
      return d.color;
    })
    .style("opacity", 1);

  node
    .append("text")
    .attr("x", function (d) {
      return (d.x0 + d.x1) / 2;
    })
    .attr("y", function (d) {
      return d.y0 - 2;
    })
    .attr("text-anchor", "middle")
    .text(function (d) {
      return d.name;
    });

  /*
node
  .append("image")
  .attr("height", 15)
  .attr("x", function (d) {
    return (d.x0 + d.x1) / 2 - 5;
  })
  .attr("y", function (d) {
    return d.y0 - 20;
  })
  .attr("href", function (d) {
    return `images/${d.type}.svg`;
  });
  */

  let link = linkG.data(sankeyLinks).enter().append("g");

  link
    .append("path")
    .attr("d", function (link) {
      return link.path;
    })
    .style("stroke-width", function (d) {
      return Math.max(0.3, d.width);
    })
    .style("stroke", function (link, i) {
      return link.color;
    });

  let arrows = pathArrows()
    .arrowLength(4)
    .gapLength(40)
    .arrowHeadSize(1.5)
    .strokeWidth(0.5)
    .path(function (link) {
      return link.path;
    });

  let arrowsG = linkG.data(sankeyLinks).enter().append("g").call(arrows);
};
