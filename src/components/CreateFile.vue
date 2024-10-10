<script setup lang="ts">
import {computed, ref} from 'vue';
import {message} from "ant-design-vue";
import {URL} from "../api/url.ts";
import axios from "axios";

const title = ref<string>('');
const content = ref<string>('');
const isFileLoading = ref<boolean>(false);

const buttonText = computed(() => isFileLoading.value ? 'Uploading...' : 'Create file');

const createFile = async () => {
  isFileLoading.value = true;

  const bodyParams = {
    title: title.value,
    content: content.value
  };

  title.value = '';
  content.value = '';

  try {
    await axios.post(URL + 'document/create', bodyParams);
    message.success('Successful uploaded');
  } catch (error) {
    title.value = bodyParams.title;
    content.value = bodyParams.content;
    message.error('Failed to upload');
  } finally {
    isFileLoading.value = false;
  }
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