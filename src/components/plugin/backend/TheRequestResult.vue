<template>
  <div class="flex flex-col">
    <v-tabs
      v-model="tab"
      selected-class="bg-primary text-white"
      class="border-b bg-[#fafafa]"
    >
      <v-tab value="json">
        JSON
      </v-tab>
      <v-tab value="headers">
        Headers
      </v-tab>
    </v-tabs>
    <v-window
      v-if="response"
      id="response-content"
      v-model="tab"
      class="flex-grow overflow-y-hidden h-0"
      :class="{'p-2': tab === 'headers'}"
    >
      <v-window-item value="json">
        <the-response-json-content
          v-if="response.data"
          :response="JSON.stringify(response.data, null, 4)"
        />
        <div
          v-else
          class="flex flex-col justify-center items-center flex-grow h-0 text-gray-500 my-auto"
        >
          <v-icon
            icon="mdi-information-outline"
            size="48"
          />
          <p>{{ response.code }}</p>
          <p>{{ response.message }}</p>
        </div>
      </v-window-item>
      <v-window-item value="headers">
        <the-response-header-content
          v-if="headers"
          :headers="headers"
        />
        <div
          v-else
          class="flex flex-col justify-center items-center flex-grow h-0 text-gray-500 my-auto"
        >
          <v-icon
            icon="mdi-information-outline"
            size="48"
          />
          <p>{{ response.code }}</p>
          <p>{{ response.message }}</p>
        </div>
      </v-window-item>
    </v-window>
    <div
      v-else
      class="flex flex-col justify-center items-center flex-grow h-0 text-gray-500 my-auto"
    >
      <v-icon
        icon="mdi-information-outline"
        size="48"
      />
      <span>空</span>
    </div>
  </div>
</template>

<script setup>
import { ref,computed,watch } from 'vue';
import mitt from '@/plugins/mitt';

const request = defineModel({
  type: Object
});
const response = ref(request.value.response);
const tab = ref('json');

watch(request, () => {
  response.value = request.value.response;
});

const headers = computed(() => {
  if (response.value === null) {
    return null;
  }
  if (response.value.headers) {
    return response.value.headers;
  }
  if (response.value.response && response.value.response.headers) {
    return response.value.response.headers;
  }
  return null;
});

mitt.on('loadResponse', (resp) => {
  response.value = resp;
});
</script>

<style lang="scss">
#response-content {
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