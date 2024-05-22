<template>
  <main>
    <div class="frontend">
      <div class="frontendTabs">
        <!-- tab栏 -->
        <v-tabs 
          v-model="tab"
        >
          <v-tab
            value="html"
            @click="isShowHtml = true; isShowCss = false; isShowJs = false;"
          >
            <v-icon class="html">
              mdi-slash-forward
            </v-icon>
            &nbsp;html
          </v-tab>
          <v-tab
            value="css"
            @click="isShowHtml = false; isShowCss = true; isShowJs = false;"
          > 
            <v-icon class="css">
              mdi-asterisk
            </v-icon>
            &nbsp;css
          </v-tab>
          <v-tab
            value="javaScript"
            @click="isShowHtml = false; isShowCss = false; isShowJs = true;"
          >
            <v-icon class="js">
              mdi-code-braces
            </v-icon>
            &nbsp;js
          </v-tab>
        </v-tabs>
        <div class="select">
          <v-select
            v-model="theme"
            theme="light"
            :items="themes"
            variant="solo"
            density="compact"
            height="2.5em"
            hide-details
            flat
          >
            <template #prepend>
              <span>Theme : </span>
            </template>
          </v-select>
        </div>
      </div>
      <!-- 编辑器内容 -->
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
      <div class="viewTabs">
        <v-tabs>
          <v-tab class="preview">
            view
          </v-tab>
        </v-tabs>
        <v-btn 
          variant="text"
          density="compact"
          class="rotate-on-hover"
          icon="mdi-reload"
          :loading="isLoading"
          @click="reloadIframe()"
        />
      </div>
      <iframe
        id="preview"
      />
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
      previewFrame: null,
      tab: null,
      htmlBase: `<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>Hello 你好 !</h1>
</body>
</html>
      `,
      isShowHtml: true,
      isShowCss: true,
      isShowJs: true,
      isLoading:false,
      themes: ['vs','vs-dark','hc-black'],
      theme: 'vs',
      htmlContent: null,
      cssContent: null,
      jsContent: null,
    };
  },
  watch: {
    theme() {
      monaco.editor.setTheme(this.theme);
    }
  },
  async mounted() {
    this.isShowCss = false;
    this.isShowJs = false;
    this.basicFrontendSyntax();
    window.addEventListener('beforeunload', this.saveEditorContent);

  },
  //删除window和localStorage
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.saveEditorContent);
    localStorage.removeItem('htmlContent');
    localStorage.removeItem('cssContent');
    localStorage.removeItem('jsContent');
  },
  methods: {
    //iframe预览
    updatePreview(htmlEditor, cssEditor, jsEditor) {
      const html = htmlEditor;
      const css = '<style>' + cssEditor + '</style>';
      const js = '<script>' + jsEditor + '</scr' + 'ipt>';
      this.htmlContent = htmlEditor;
      this.cssContent = cssEditor;
      this.jsContent = jsEditor;
      this.previewFrame.contentWindow.document.open();
      this.previewFrame.contentWindow.document.write(html + css + js);
      this.previewFrame.contentWindow.document.close();
    },
    //基本前端语法编辑框
    basicFrontendSyntax() {
      const htmlContent = localStorage.getItem('htmlContent');
      const cssContent = localStorage.getItem('cssContent');
      const jsContent = localStorage.getItem('jsContent');
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
          value: htmlContent == 'null' ? this.htmlBase : htmlContent ?? this.htmlBase,
          language: 'html',
          theme: this.theme,
          automaticLayout: true,
        }
      );
      const cssEditor = monaco.editor.create(
        document.getElementById('cssEditor'),
        {
          value: cssContent == 'null' ? '/* css code here */' : cssContent ?? '/* css code here */',
          language: 'css',
          theme: this.theme,
          automaticLayout: true,
        }
      );
      const jsEditor = monaco.editor.create(
        document.getElementById('jsEditor'),
        {
          value: jsContent== 'null' ? '//js code here' : jsContent ?? '//js code here',
          language: 'javascript',
          theme: this.theme,
          automaticLayout: true,
        }
      );
      this.previewFrame = document.getElementById('preview');

      //创建iframe
      //分别把三个合为一个
      htmlEditor.onDidChangeModelContent(() =>
        this.updatePreview(htmlEditor.getValue(), cssEditor.getValue(), jsEditor.getValue()),
      );
      cssEditor.onDidChangeModelContent(() =>
        this.updatePreview(htmlEditor.getValue(), cssEditor.getValue(), jsEditor.getValue()),
      );
      jsEditor.onDidChangeModelContent(() =>
        this.updatePreview(htmlEditor.getValue(), cssEditor.getValue(), jsEditor.getValue()),
      );
    },
    //保存编辑器内容
    saveEditorContent() {
      localStorage.setItem('htmlContent', this.htmlContent);
      localStorage.setItem('cssContent', this.cssContent);
      localStorage.setItem('jsContent', this.jsContent);
    },
    //加载按钮
    reloadIframe() {
      this.isLoading = true;
      if (localStorage.getItem('htmlContent') && localStorage.getItem('cssContent') && localStorage.getItem('jsContent')) {
        this.updatePreview(localStorage.getItem('htmlContent'), localStorage.getItem('cssContent'), localStorage.getItem('jsContent'));
      } else if (this.htmlContent && this.cssContent && this.jsContent){
        this.updatePreview(this.htmlContent, this.cssContent, this.jsContent);
      }else {
        this.updatePreview(this.htmlBase, '/* css code here */', '//js code here');
      }

      this.isLoading = false;
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
//前端编辑器
.frontend {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: #e3e3e3 1px solid;
  border-right: none;
  > .editors {
    flex-grow: 1;
    > .editor {
      height: 100%;
    }
  }
  //编辑器选择
  .frontendTabs{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e3e3e3;
    .select{
      display: flex;
      align-items: center;
      width: 12em;
      height: 2.5em;
      padding-right: 0.75em;
      p{
        font-size: 1em;
        margin-right: 1em;
      }
    }
    .v-tab--selected {
      background-color: var(--custom-primary);
      color: var(--custom-secondary) !important;
    }
  }
}
//预览框
.view{
  flex: 1;
  border: #e3e3e3 1px solid;
  #preview{
    height: 94%;
    width: 100%;
  }
}
.viewTabs{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
  .v-btn{
    margin-right: 1em;
  }
}
.html{
  background: #f94244;
  border-radius: 0.25em;
  color: black;
  padding: 0.55em;
}
.css{
  background: #41bbff;
  border-radius: 0.25em;
  color: black;
  padding: 0.55em;
}
.js{
  background: #f7d300;
  border-radius: 0.25em;
  color: black;
  padding: 0.55em;
}
</style>