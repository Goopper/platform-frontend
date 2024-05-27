<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    class="cursor-text"
    :disabled="props.disabled"
    :style="{height: '100%'}"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
  />
</template>

<script setup>
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';

const code = defineModel({
  type: String
});
const props = defineProps({
  language: {
    type: String,
    default: 'javascript'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

function getLanguage() {
  switch (props.language) {
    case 'javascript':
      return javascript();
    case 'css':
      return css();
    case 'html':
      return html();
    case 'json':
      return json();
    default:
      return javascript();
  }
}

const extensions = [getLanguage(),EditorView.lineWrapping];
</script>

<style>

</style>