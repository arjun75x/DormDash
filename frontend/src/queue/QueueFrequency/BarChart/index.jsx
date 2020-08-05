import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import Box from "@material-ui/core/Box";

function BarChart({ data }) {
  const chartRef = useRef();
  const axisRef = useRef();

  useEffect(() => {
    d3.select(chartRef.current)
      .attr("width", 425)
      .attr("height", 230)
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

      const xScale = d3.scaleLinear().domain([0, 24]).range([0, 408]);
      d3.select(axisRef.current).call(
        d3
          .axisBottom()
          .scale(xScale)
          .tickValues([2, 5, 8, 11, 14, 17, 20, 23])
          .tickFormat((hourInd) => {
            const hour = (hourInd + 4) % 24;
            const amOrPm = hour < 12 ? "a" : "p";

            return hour === 0
              ? `12a`
              : hour <= 12
              ? `${hour}${amOrPm}`
              : `${hour - 12}${amOrPm}`;
          })
      );

      const rectangles = svg.selectAll("rect").data(data);

      rectangles
        .transition()
        .duration(300)
        .attr("height", (data) => 200 - yScale(data))
        .attr("y", (data) => yScale(data));

      rectangles
        .enter()
        .append("rect")
        .attr("fill", "#3f51b5")
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
        .attr("fill", "#3f51b5")
        .attr("x", (_, i) => i * 17 + 7)
        .attr("y", () => 198)
        .attr("width", 16)
        .attr("height", 2);
    };

    draw();
  }, [data]);

  return (
    <Box>
      <svg ref={chartRef}>
        <g ref={axisRef} transform="translate(7, 200)" />
      </svg>
    </Box>
  );
}

export default BarChart;
