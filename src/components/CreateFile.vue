<script setup lang="ts">
import { ref } from 'vue';

const title = ref<string>('');
const content = ref<string>('');
</script>

<template>
  <div class="create-file-wrapper">
    <div style="width: 800px">
      <a-input v-model:value="title" placeholder="Title" />
    </div>

    <div style="width: 800px">
      <a-textarea v-model:value="content" placeholder="Content" :rows="14" />
    </div>

    <a-button size="large" type="primary" :loading="false">Loading</a-button>

  </div>
</template>

<style scoped>
.create-file-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  gap: 20px;
}
</style>