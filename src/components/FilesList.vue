<script setup lang="ts">
import {message} from "ant-design-vue";
import {computed, ref, watch} from "vue";
import axios from 'axios';
import {URL} from "../api/url.ts";
import {NGROK_HEADER} from "../api/ngrokHeader.ts";

// The default data for testing UI without server
const list = ref([
  {title: 'Title', content: 'Content'},
  {title: 'Title', content: 'Content'},
]);

const getFileList = async () => {
  list.value = [];
  try {
    const res = await axios.get(URL + 'document/all-titles', NGROK_HEADER);

    const titles: string[] = res.data.titles;
    await axios.post(URL + 'document/initialize_docs', titles);

    const { data } = await axios.get(URL + 'document/get-files-and-content', NGROK_HEADER);
    Object.keys(data.files).forEach((item) => {
      list.value.push({
        title: item,
        content: data.files[item],
      });
    });

  } catch (err) {
    console.error(err)
  }
}

const searchQuery = ref('');
const searchList = ref<string[]>([]);
const search = async () => {
  try {
    const { data } = await axios.post(URL + 'search/find-by-words', { search_words: [ ...searchQuery.value.split(' ') ] });

    const keys = Object.keys(data);

    if (keys.length > 0) {
      keys.forEach((wordKey) => {
        Object.keys(data[wordKey]).forEach((titleKey) => {
          searchList.value.push(titleKey);
        })
      });
    } else {
      message.error('Data was not found');
    }
  } catch (e) {}
}

watch(searchQuery, (newVal) => {
  if (!newVal) searchList.value = [];
});


const listToShow = computed<typeof list.value>(() => {
  if (searchList.value.length > 0) {
    return list.value.filter((item) => searchList.value.includes(item.title));
  } else {
    return list.value;
  }
});

getFileList();
</script>

<template>
  <div class="files-list">
    <a-input-search
        v-model:value="searchQuery"
        placeholder="Type the title here"
        style="width: 200px; margin-bottom: 3%"
        size="middle"
        @search="search"
    />

    <a-list
        item-layout="horizontal"
        :data-source="listToShow"
    >
      <template #renderItem="{ item }">
        <a-list-item class="list-item">
          <template #actions>
<!--            <a href="#">load</a>-->
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