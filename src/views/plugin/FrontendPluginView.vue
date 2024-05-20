<template>
  <main>
    <div class="frontend">
      <v-tabs 
        v-model="tab"
      >
        <v-tab
          value="html"
          @click="isShowHtml = true; isShowCss = false; isShowJs = false;"
        >
          html
        </v-tab>
        <v-tab
          value="css"
          @click="isShowHtml = false; isShowCss = true; isShowJs = false;"
        > 
          css
        </v-tab>
        <v-tab
          value="javaScript"
          @click="isShowHtml = false; isShowCss = false; isShowJs = true;"
        >
          js
        </v-tab>
      </v-tabs>
      <div class="editors">
        <!-- html -->
        <div
          v-show="isShowHtml"
          id="htmlEditor"
          class="editor"
        />
        <!-- css -->
        <div
          v-show="isShowCss"
          id="cssEditor"
          class="editor"
        />
        <!-- js -->
        <div
          v-show="isShowJs"
          id="jsEditor"
          class="editor"
        />
      </div>
    </div>
    <div class="view">
      <v-tabs>
        <v-tab class="preview">
          view
        </v-tab>
      </v-tabs>
      <iframe id="preview" />
    </div>
  </main>
</template>
<script>
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';


export default {
  name: 'FrontendPluginView',
  data() {
    return {
      htmlEditor: null,
      previewFrame: null,
      tab: null,
      isShowHtml: true,
      isShowCss: true,
      isShowJs: true,
    };
  },
  mounted() {
    this.isShowCss = false;
    this.isShowJs = false;
    this.basicFrontendSyntax();
  },
  methods: {
    //iframe预览
    updatePreview(htmlEditor, cssEditor, jsEditor) {
      const html = htmlEditor.getValue();
      const css = '<style>' + cssEditor.getValue() + '</style>';
      const js = '<script>' + jsEditor.getValue() + '</scr' + 'ipt>';

      this.previewFrame.contentWindow.document.open();
      this.previewFrame.contentWindow.document.write(html + css + js);
      this.previewFrame.contentWindow.document.close();
    },
    //基本前端语法编辑框
    basicFrontendSyntax() {
      //其他语言
      self.MonacoEnvironment = {
        getWorker(_, label) {
          if (label === 'json') {
            return new jsonWorker();
          }
          if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker();
          }
          if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker();
          }
          if (label === 'typescript' || label === 'javascript') {
            return new tsWorker();
          }
          return new editorWorker();
        },
      };
      const htmlEditor = monaco.editor.create(
        document.getElementById('htmlEditor'),
        {
          value: '<h1>Hello, world!</h1>',
          language: 'html',
          theme: 'vs-dark',
        }
      );
      const cssEditor = monaco.editor.create(
        document.getElementById('cssEditor'),
        {
          value: 'body { background-color: #f0f0f0; }',
          language: 'css',
          theme: 'vs-dark',
        }
      );
      const jsEditor = monaco.editor.create(
        document.getElementById('jsEditor'),
        {
          value: 'console.log("Hello, world!");',
          language: 'javascript',
          theme: 'vs-dark',
        }
      );
      //创建iframe
      this.previewFrame = document.getElementById('preview');
      //分别把三个合为一个
      htmlEditor.onDidChangeModelContent(() =>
        this.updatePreview(htmlEditor, cssEditor, jsEditor)
      );
      cssEditor.onDidChangeModelContent(() =>
        this.updatePreview(htmlEditor, cssEditor, jsEditor)
      );
      jsEditor.onDidChangeModelContent(() =>
        this.updatePreview(htmlEditor, cssEditor, jsEditor)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
main {
  display: flex;
  height: 100%;
  background: white;
}
.frontend {
  flex: 1;
}
.view{
  flex: 1;
}
.v-tabs{
  border-bottom: 1px solid #585858;
}
</style>