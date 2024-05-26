<template>
  <div
    v-if="request"
    class="p-2 flex flex-col"
  >
    <div class="flex">
      <!-- method -->
      <div class="w-[8rem]">
        <v-select
          v-model="request.method"
          :class="`select-text-http-${request.method}`"
          label="请求方法"
          :items="['GET', 'POST', 'PUT', 'DELETE']"
          variant="outlined"
          hide-details
          density="compact"
          theme="light"
          tile
        >
          <template #item="{ props,item }">
            <v-list-item
              v-bind="props"
              :class="'http-'+item.value"
            />
          </template>
        </v-select>
      </div>
      <!-- url & btn -->
      <v-text-field
        v-model="request.url"
        label="请求URL"
        variant="outlined"
        density="compact"
        hide-details
        tile
      >
        <template #append>
          <div class="w-full h-full flex justify-center items-center bg-primary">
            <v-btn
              variant="flat"
              tile
              :loading="loading"
              @click="sendRequest"
            >
              发送请求
            </v-btn>
          </div>
        </template>
      </v-text-field>
    </div>
    <!-- content tabs -->
    <v-tabs
      v-model="tab"
      class="mt-2"
    >
      <v-tab value="params">
        请求参数
        <v-badge
          v-if="paramsCount !== 0"
          :content="paramsCount"
          inline
        />
      </v-tab>
      <v-tab value="body">
        请求体
        <v-badge
          v-if="request.body.type === 'form-data' && formDataCount !== 0"
          :content="formDataCount"
          inline
        />
      </v-tab>
      <v-tab value="headers">
        请求头
        <v-badge
          v-if="headersCount !== 0"
          :content="headersCount"
          inline
        />
      </v-tab>
      <div class="flex justify-center items-center ml-auto mr-2 w-[15rem]">
        <v-select
          v-model="monacoTheme"
          :items="monacoThemes"
          variant="outlined"
          hide-details
          density="compact"
          theme="light"
          tile
        >
          <template #prepend>
            <span>Theme:</span>
          </template>
        </v-select>
      </div>
    </v-tabs>
    <!-- content -->
    <v-window
      id="request-content"
      v-model="tab"
      class="mt-2 flex-grow overflow-y-hidden h-0"
    >
      <v-window-item value="params">
        <the-request-param-content v-model="request.params" />
      </v-window-item>
      <v-window-item value="body">
        <the-request-body-content v-model="request.body" />
      </v-window-item>
      <v-window-item value="headers">
        <the-request-header-content v-model="request.headers" />
      </v-window-item>
    </v-window>
  </div>
  <div v-else>
    <div class="flex justify-center items-center h-full text-gray-500">
      <v-icon
        icon="mdi-information-outline"
        size="48"
      />
      <span class="ml-2">请先选择一个请求</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { backendPluginRequest } from '@/api/backend-plugin';
import mitt from '@/plugins/mitt';
import { getACopy } from '@/utils/backend-plugin';
import { ref,watch } from 'vue';

const request = defineModel({
  type: Object
});

const paramsCount = computed(() => request.value.params.filter(param => param.key !== '').length);
const formDataCount = computed(() => request.value.body.formData.filter(formData => formData.key !== '').length);
const headersCount = computed(() => request.value.headers.filter(header => header.key !== '').length);

const loading = ref(false);
const tab = ref('params');
const monacoTheme = ref('vs-dark');
const monacoThemes = ref(['vs', 'vs-dark', 'hc-black']);

watch(tab, () => {
  mitt.emit('loadJson', request.value.body.json);
});
watch(monacoTheme, (theme) => {
  mitt.emit('updateMonacoTheme', theme);
});

async function sendRequest() {
  loading.value = true;
  // clean
  const target = getACopy(request.value);
  target.params = target.params
    .filter(param => param.key !== '' && param.value !== '');
  target.headers = target.headers
    .filter(header => header.key !== '' && header.value !== '');
  target.body.formData = target.body.formData
    .filter(formData => formData.key !== '' && (formData.value !== '' || formData.files.length > 0));
  // do request
  const res = await backendPluginRequest(target).catch(err => {
    // http error
    console.log(err);
    request.value.response = err;
    mitt.emit('loadResponse', err);
  });
  if (res) {
    // http success
    request.value.response = res;
    mitt.emit('loadResponse', res);
  }
  loading.value = false;
}
</script>

<style lang="scss">
.select-text-http-GET .v-select__selection-text {
  color: #10b981 !important;
}

.select-text-http-POST .v-select__selection-text {
  color: #eab308 !important;
}

.select-text-http-PUT .v-select__selection-text {
  color: #0ea5e9 !important;
}

.select-text-http-DELETE .v-select__selection-text {
  color: #f43f5e !important;
}

#request-content {
  .v-window__container {
    height: 100%;
  }
  .v-window-item {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>