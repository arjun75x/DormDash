import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function BarChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    d3.select(chartRef.current)
      .attr("width", 425)
      .attr("height", 200)
      .style("border-top", "solid rgba(0, 0, 0, 0.26)");
  }, []);

  useEffect(() => {
    const draw = () => {
      const maxVal = d3.max(data);
      const svg = d3.select(chartRef.current);
      const yScale = d3
        .scaleLinear()
        .domain([0, maxVal === 0 ? 1 : maxVal])
        .range([195, 20]);

      const rectangles = svg.selectAll("rect").data(data);

      rectangles
        .transition()
        .duration(300)
        .attr("height", (data) => 200 - yScale(data))
        .attr("y", (data) => yScale(data));

      rectangles
        .enter()
        .append("rect")
        // .on("mouseover", (data, i) => {
        //   d3.select(tooltipRef.current).style("opacity", 1);
        //   d3.select(tooltipHeadingRef.current).text(
        //     i === 0
        //       ? "Average of Everyone"
        //       : hasLowest && i === 1
        //       ? "Lowest Non-Zero Average"
        //       : `Selection ${i + 1}`
        //   );
        //   d3.select(tooltipEarningsRef.current).text(
        //     `Average expected earnings: $${data}`
        //   );
        //   d3.select(tooltipCountRef.current).text(
        //     `Number who fit criteria: ${num}`
        //   );
        // })
        // .on("mouseout", () => d3.select(tooltipRef.current).style("opacity", 0))
        // .on("mousemove", () =>
        //   d3
        //     .select(tooltipRef.current)
        //     .style("left", `${d3.event.pageX + 10}px`)
        //     .style("top", `${d3.event.pageY + 10}px`)
        // )
        .attr("fill", "#9c27b0")
        .attr("x", (_, i) => i * 17 + 7)
        .attr("y", () => 200)
        .attr("width", 16)
        .attr("height", 0)
        .attr("rx", "4px")
        .transition()
        .duration(300)
        .attr("height", (data) => 200 - yScale(data))
        .attr("y", (data) => yScale(data));

      rectangles
        .enter()
        .append("rect")
        .attr("fill", "#9c27b0")
        .attr("x", (_, i) => i * 17 + 7)
        .attr("y", () => 198)
        .attr("width", 16)
        .attr("height", 2);
    };

    draw();
  }, [data]);

  return (
    <Box>
      <svg ref={chartRef}></svg>
    </Box>
  );
}

export default BarChart;
