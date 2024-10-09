<script setup lang="ts">
import {onBeforeMount, ref, watch} from 'vue';
import CreateFile from "./components/CreateFile.vue";
import FilesList from "./components/FilesList.vue";
import ClassificationMatrix from "./components/ClassificationMatrix.vue";
import RecallPrecisionPlot from "./components/RecallPrecisionPlot.vue";

const activeKey = ref<string>('1');

onBeforeMount(() => {
  activeKey.value = localStorage.getItem('activeTab') ?? activeKey.value;
});

watch(() => activeKey.value, () => {
  localStorage.setItem('activeTab', activeKey.value);
});

</script>

<template>
  <div class="app-container">
    <a-tabs
        v-model:activeKey="activeKey"
        size="large"
        :tab-bar-gutter="25"
        :tab-bar-style="{marginBottom: '150px', paddingLeft: '50px', marginTop: '15px'}"
        type="card"
    >
      <a-tab-pane key="1" tab="Create file">
        <CreateFile />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Files list">
        <FilesList />
      </a-tab-pane>
      <a-tab-pane key="3" tab="Classification Matrix">
        <ClassificationMatrix />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Recall and Precision Plot">
        <RecallPrecisionPlot />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>

</style>
