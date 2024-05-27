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
          <v-btn
            icon="mdi-history"
            variant="text"
            density="compact"
            @click="dialog = true"
          />
          <v-dialog
            v-model="dialog"
            max-width="290"
          >
            <v-card theme="light">
              <v-card-title class="headline">
                警告⚠
              </v-card-title>
              <v-card-text>是否清空当前所写的所有代码?</v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  text
                  @click="dialog = false"
                >
                  取消
                </v-btn>
                <v-btn
                  color="red darken-1"
                  text
                  @click="(clearCode(), dialog = false)"
                >
                  确定
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

export default {
  name: 'FrontendPluginView',
  data() {
    return {
      dialog: false,
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
      cssBase: '/* css code here */',
      jsBase: '//js code here',
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
      const js =  `
    <script>
      window.onerror = function(message, source, lineno, colno, error) {
      };
      try {
        ${jsEditor}
      } catch (error) {
      }
    </scr` + 'ipt>';
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
          value: cssContent == 'null' ? this.cssBase : cssContent ?? this.cssBase,
          language: 'css',
          theme: this.theme,
          automaticLayout: true,
        }
      );
      const jsEditor = monaco.editor.create(
        document.getElementById('jsEditor'),
        {
          value: jsContent== 'null' ? this.jsBase : jsContent ?? this.jsBase,
          language: 'javascript',
          theme: this.theme,
          automaticLayout: true,
        }
      );
      this.previewFrame = document.getElementById('preview');
      this.updatePreview(this.htmlBase, this.cssBase, this.jsBase);
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
      if (this.htmlContent && this.cssContent && this.jsContent) {
        this.updatePreview(this.htmlContent, this.cssContent, this.jsContent);
        this.isLoading = false;
      } else if (localStorage.getItem('htmlContent') && localStorage.getItem('cssContent') && localStorage.getItem('jsContent')){
        this.updatePreview(localStorage.getItem('htmlContent'), localStorage.getItem('cssContent'), localStorage.getItem('jsContent'));
        this.isLoading = false;
      } else {
        this.updatePreview(this.htmlBase, this.cssBase, this.jsBase);
        this.isLoading = false;
      }

    },
    //清空代码
    clearCode() {
      window.removeEventListener('beforeunload', this.saveEditorContent);
      localStorage.removeItem('htmlContent');
      localStorage.removeItem('cssContent');
      localStorage.removeItem('jsContent');
      this.$router.go(0);
    }
  },
};
</script>
<style lang="scss" scoped>
main {
  display: flex;
  overflow-y: auto;
  height: 100vh;
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
      width: 15.25em;
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