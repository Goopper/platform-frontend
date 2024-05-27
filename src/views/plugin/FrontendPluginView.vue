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
      </div>
      <div class="editors">
        <div
          v-show="isShowHtml"
        >
          <CustomCodeEditor 
            v-model="htmlContent"
            language="html"
          />
        </div>
        <div
          v-show="isShowCss"
        >
          <CustomCodeEditor 
            v-model="cssContent"
            language="css"
          />
        </div>
        <div
          v-show="isShowJs"
        >
          <CustomCodeEditor 
            v-model="jsContent"
            language="js"
          />
        </div>
      </div>
    </div>
    
    <div class="view">
      <div class="viewTabs">
        <v-tabs>
          <v-tab class="preview">
            view
          </v-tab>
        </v-tabs>
      </div>
      <iframe
        id="preview"
      />
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      tab: 'html',
      htmlContent: `<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>Hello 你好 !</h1>
</body>
</html>
      `,
      cssContent: '/* css code here */',
      jsContent: '//js code here',
      isShowHtml: true,
      isShowCss: true,
      isShowJs: true,
    };
  },
  watch: {
    htmlContent() {
      this.updatePreview(this.htmlContent, this.cssContent, this.jsContent);
    },
    cssContent() {
      this.updatePreview(this.htmlContent, this.cssContent, this.jsContent);
    },
    jsContent() {
      this.updatePreview(this.htmlContent, this.cssContent, this.jsContent);
    }
  },
  mounted() {
    this.isShowCss = false;
    this.isShowJs = false;
    this.previewFrame = document.getElementById('preview');
    this.updatePreview(this.htmlContent, this.cssContent, this.jsContent);
  },
  methods: {
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
      this.previewFrame.contentWindow.document.open();
      this.previewFrame.contentWindow.document.write(html + css + js);
      this.previewFrame.contentWindow.document.close();
    }
  }
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
  max-width: 50%;
  > .editors {
    flex-grow: 1;
      height: 100%;
  overflow: auto;

  }
  //编辑器选择
  .frontendTabs{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e3e3e3;
    .v-tab--selected {
      background-color: var(--custom-primary);
      color: var(--custom-secondary) !important;
    }
  }
}
//预览框
.view{
  flex: 1;
  display: flex;
  flex-direction: column;
  border: #e3e3e3 1px solid;
  height: 100%;
  max-width: 50%;
  .viewTabs{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
  .v-btn{
    margin-right: 1em;
  }
}
  #preview{
    flex-grow: 1;
    overflow: auto;
    width: 100%;
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