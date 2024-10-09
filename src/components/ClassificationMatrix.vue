<script setup lang="ts">
import * as d3 from "d3";
import {onMounted} from "vue";

const data = [
  { rowTitle: "найдено системой", relevant: "10", nonRelevant: "100" },
  { rowTitle: "не найдено системой", relevant: "0", nonRelevant: "0" }
];

onMounted(() => {
  createTable(data);
});

const createTable = (data: any) => {
  // Clear any existing table
  d3.select("#table").select("table").remove();

  const table = d3.select("#table").append("table");

  // Create table header
  const thead = table.append("thead");
  thead.append("tr")
      .selectAll("th")
      .data([" ", "релевантны", "не релевантны"])
      .enter()
      .append("th")
      .text(d => d);

  // Create table body
  const tbody = table.append("tbody");

  //@ts-ignore
  data.forEach(d => {
    const row = tbody.append("tr");
    row.append("td").text(d.rowTitle);
    row.append("td").text(d.relevant);
    row.append("td").text(d.nonRelevant);
  });
};

</script>

<template>
  <div class="classification-matrix">
    <div id="table"></div>
  </div>
</template>

<style>
.classification-matrix table {
  border-collapse: collapse;
  width: 80%;
  margin: 20px auto;
}
.classification-matrix th, td {
  border: 1px solid black;
  padding: 10px;
  text-align: center;
}
.classification-matrix th {
  writing-mode: vertical-rl; /* Rotate header text */
  transform: rotate(180deg);
}
</style>