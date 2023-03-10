// Function that appends a path to selection that has sankey path data attached
// The path is formatted as dash array, and triangle paths to create arrows along the path

function pathArrows() {
  var arrowLength = 10;
  var gapLength = 50;
  var arrowHeadSize = 4;
  var strokeWidth = 1;
  var path = null;

  function appendArrows(selection) {
    let totalDashArrayLength = arrowLength + gapLength;

    let arrows = selection
      .append("path")
      .attr("d", path)
      .style("stroke-width", strokeWidth)
      .style("stroke", "black")
      .style("stroke-dasharray", arrowLength + "," + gapLength);

    arrows.each(function (arrow) {
      let thisPath = d3.select(this).node();
      let parentG = d3.select(this.parentNode);
      let pathLength = thisPath.getTotalLength();
      let numberOfArrows = Math.ceil(pathLength / totalDashArrayLength);

      // remove the last arrow head if it will overlap the target node
      if (
        (numberOfArrows - 1) * totalDashArrayLength +
          (arrowLength + (arrowHeadSize + 1)) >
        pathLength
      ) {
        numberOfArrows = numberOfArrows - 1;
      }

      let arrowHeadData = d3.range(numberOfArrows).map(function (d, i) {
        let length = i * totalDashArrayLength + arrowLength;

        let point = thisPath.getPointAtLength(length);
        let previousPoint = thisPath.getPointAtLength(length - 2);

        let rotation = 0;

        if (point.y == previousPoint.y) {
          rotation = point.x < previousPoint.x ? 180 : 0;
        } else if (point.x == previousPoint.x) {
          rotation = point.y < previousPoint.y ? -90 : 90;
        } else {
          let adj = Math.abs(point.x - previousPoint.x);
          let opp = Math.abs(point.y - previousPoint.y);
          let angle = Math.atan(opp / adj) * (180 / Math.PI);
          if (point.x < previousPoint.x) {
            angle = angle + (90 - angle) * 2;
          }
          if (point.y < previousPoint.y) {
            rotation = -angle;
          } else {
            rotation = angle;
          }
        }

        return { x: point.x, y: point.y, rotation: rotation };
      });

      let arrowHeads = parentG
        .selectAll(".arrow-heads")
        .data(arrowHeadData)
        .enter()
        .append("path")
        .attr("d", function (d) {
          return (
            "M" +
            d.x +
            "," +
            (d.y - arrowHeadSize / 2) +
            " " +
            "L" +
            (d.x + arrowHeadSize) +
            "," +
            d.y +
            " " +
            "L" +
            d.x +
            "," +
            (d.y + arrowHeadSize / 2)
          );
        })
        .attr("class", "arrow-head")
        .attr("transform", function (d) {
          return "rotate(" + d.rotation + "," + d.x + "," + d.y + ")";
        })
        .style("fill", "black");
    });
  }

  appendArrows.arrowLength = function (value) {
    if (!arguments.length) return arrowLength;
    arrowLength = value;
    return appendArrows;
  };

  appendArrows.gapLength = function (value) {
    if (!arguments.length) return gapLength;
    gapLength = value;
    return appendArrows;
  };

  appendArrows.arrowHeadSize = function (value) {
    if (!arguments.length) return arrowHeadSize;
    arrowHeadSize = value;
    return appendArrows;
  };

  appendArrows.strokeWidth = function (value) {
    if (!arguments.length) return strokeWidth;
    strokeWidth = value;
    return appendArrows;
  };

  appendArrows.path = function (pathFunction) {
    if (!arguments.length) {
      return path;
    } else {
      if (typeof pathFunction === "function") {
        path = pathFunction;
        return appendArrows;
      } else {
        path = function () {
          return pathFunction;
        };
        return appendArrows;
      }
    }
  };

  return appendArrows;
}
