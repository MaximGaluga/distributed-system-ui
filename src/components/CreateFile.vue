<script setup lang="ts">
import {computed, ref} from 'vue';
import {message} from "ant-design-vue";

const title = ref<string>('');
const content = ref<string>('');
const isFileLoading = ref<boolean>(false);

const buttonText = computed(() => isFileLoading.value ? 'Uploading...' : 'Create file');

const createFile = () => {
  isFileLoading.value = true;
  setTimeout(() => {
    isFileLoading.value = false
    message.success('Successful uploaded');
  }, 3000);
}
</script>

<template>
  <div class="create-file-wrapper">
    <div style="width: 800px">
      <a-input v-model:value="title" placeholder="Title" />
    </div>

    <div style="width: 800px">
      <a-textarea v-model:value="content" placeholder="Content" :rows="14" />
    </div>

    <a-button
        size="large"
        type="primary"
        :loading="isFileLoading"
        @click="createFile"
        :disabled="isFileLoading"
    >
      {{ buttonText }}</a-button>

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