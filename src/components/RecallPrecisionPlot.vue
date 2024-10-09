<script setup lang="ts">
import {onMounted} from "vue";
import * as d3 from "d3";

const data = [
  { recall: 1.0, precision: 1.0 },
];

onMounted(() => {
  createPlot(data);
});

const createPlot = (data: any) => {
  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([0, 1])
      .range([height, 0]);

  svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(10));

  svg.append('g')
      .call(d3.axisLeft(y).ticks(10));

  svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text('Recall');

  svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 10)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .text('Precision');

  // Line generator
  const line = d3.line()
      //@ts-ignore
      .x(d => x(d.recall))
      //@ts-ignore
      .y(d => y(d.precision))
      .curve(d3.curveStepAfter);

  svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr('d', line);

  // Add points
  svg.selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      //@ts-ignore
      .attr('cx', d => x(d.recall))
      //@ts-ignore
      .attr('cy', d => y(d.precision))
      .attr('r', 4)
      .attr('fill', 'black');
};
</script>

<template>
  <div>
  <div id="chart" class="chart-container"></div>
  <div class="math-calculations">
    <p>Полнота (recall) -- <code>100%</code> (найд. рел. док. / рел. док.)</p>
    <p>Точность (precision) -- <code>100%</code> (найд. рел. док. / все рел. док.)</p>
  </div>
  </div>
</template>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.math-calculations {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5%;
  font-size: 20px;
  margin-top: 10%;
}
</style>