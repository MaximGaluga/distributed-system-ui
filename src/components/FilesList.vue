<script setup lang="ts">
import {ref} from "vue";
import axios from 'axios';
import {URL} from "../api/url.ts";

const getFileList = async () => {
  try {
    const response = await axios.get(URL + 'document/all-titles');
  } catch (error) {

  }
}

getFileList();

const list = ref([
    { title: 'Title', content: 'Content' },
    { title: 'Title', content: 'Content' },
]);
</script>

<template>
  <div class="files-list">
    <a-input-search
        placeholder="Type the title here"
        style="width: 200px; margin-bottom: 3%"
        size="middle"
        @search=""
    />

    <a-list
        item-layout="horizontal"
        :data-source="list"
    >
      <template #renderItem="{ item }">
        <a-list-item class="list-item">
          <template #actions>
            <a href="#">load</a>
          </template>
          <a-list-item-meta>
            <template #description>
              <p class="content-desc">{{ item.content }}</p>
            </template>
            <template #title>
              <a-typography-title :level="3" href="https://www.antdv.com/">{{ item.title }}</a-typography-title>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped>
.files-list {
  margin-right: 10%;
  margin-left: 10%;
}

.list-item:hover {
  background: rgba(43, 45, 48, 0.06);
}

.content-desc {
  width: 95%;
  word-wrap: break-word;
}
</style>