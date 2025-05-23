<template>
  <section v-if="notEmpty" ref="element" class="lila-highlight" :class="[variant]">
    <pre :key="keyhelper">
      <div class="codeContainer">
        <lila-button-partial class="copyCode transparent" @click="copyCode()">Copy</lila-button-partial>
        <code ref="codeElement">{{ props.code }}</code>
      </div>
    </pre>
    <textarea v-show="copyMode" ref="copyTextarea" :value="props.code" />
  </section>
</template>
<script setup lang="ts">
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import less from 'highlight.js/lib/languages/less';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import markdown from 'highlight.js/lib/languages/markdown';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import yaml from 'highlight.js/lib/languages/yaml';

import { computed, nextTick, onMounted, ref, watch } from 'vue';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('less', less);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('json', json);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('yaml', yaml);

const props = defineProps<{
  code: string;
  variant?: string[];
}>();
const keyhelper = ref<string>(Date.now().toString());
const copyMode = ref<boolean>(false);
const notEmpty = computed((): boolean => !!props.code);
const codeElement = ref<HTMLElement>();
const copyTextarea = ref<HTMLTextAreaElement>();

watch(props, (state, prevstate) => {

  if (state.code != prevstate.code) {
    keyhelper.value = Date.now().toString();

    nextTick().then(() => {
      if(codeElement.value && notEmpty.value) hljs.highlightElement(codeElement.value);
    });

  }
});

onMounted(() => {

  if (notEmpty.value && codeElement.value) {
    hljs.highlightElement(codeElement.value);
  }

});

function copyCode () {
  copyMode.value = true;

  requestAnimationFrame(() => {

    if(copyTextarea.value) {

      copyTextarea.value.select();
      document.execCommand('copy');
      
    }

    copyMode.value = false;
  })
}
</script>

<style lang="less">
.lila-highlight {
  overflow: hidden;
  width: 100%;

  .copy-element {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  &.darkmode .copyCode {
    color: white;
  }

  pre {
    white-space: nowrap;

    .codeContainer {
      position: relative;

      .copyCode {
        position: absolute;
        right: 15px;
        top: 5px;
      }
    }

    code.hljs {
      display: block;
      overflow-y: auto;
      white-space: pre;

      .multi(padding, 12, 4, 8, 4);
    }
  }

  .hljs {
    background: rgb(255, 255, 255);
    color: #24292e;
  }

  .hljs-doctag,
  .hljs-keyword,
  .hljs-meta .hljs-keyword,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-type,
  .hljs-variable.language_ {
    color: #d73a49;
  }

  .hljs-title,
  .hljs-title.class_,
  .hljs-title.class_.inherited__,
  .hljs-title.function_ {
    color: #6f42c1;
  }

  .hljs-attr,
  .hljs-attribute,
  .hljs-literal,
  .hljs-meta,
  .hljs-number,
  .hljs-operator,
  .hljs-selector-attr,
  .hljs-selector-class,
  .hljs-selector-id,
  .hljs-variable {
    color: #005cc5;
  }

  .hljs-meta .hljs-string,
  .hljs-regexp,
  .hljs-string {
    color: #032f62;
  }

  .hljs-built_in,
  .hljs-symbol {
    color: #e36209;
  }

  .hljs-code,
  .hljs-comment,
  .hljs-formula {
    color: #6a737d;
  }

  .hljs-name,
  .hljs-quote,
  .hljs-selector-pseudo,
  .hljs-selector-tag {
    color: #22863a;
  }

  .hljs-subst {
    color: #24292e;
  }

  .hljs-section {
    color: #005cc5;
    font-weight: 700;
  }

  .hljs-bullet {
    color: #735c0f;
  }

  .hljs-emphasis {
    color: #24292e;
    font-style: italic;
  }

  .hljs-strong {
    color: #24292e;
    font-weight: 700;
  }

  .hljs-addition {
    background-color: #f0fff4;
    color: #22863a;
  }

  .hljs-deletion {
    background-color: #ffeef0;
    color: #b31d28;
  }

  // highlight.js standard css code (github-dark.css)

  &.darkmode {
    .hljs {
      background: #0d1117;
      color: #c9d1d9;
    }

    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta .hljs-keyword,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable.language_ {
      color: #ff7b72;
    }

    .hljs-title,
    .hljs-title.class_,
    .hljs-title.class_.inherited__,
    .hljs-title.function_ {
      color: #d2a8ff;
    }

    .hljs-attr,
    .hljs-attribute,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-operator,
    .hljs-selector-attr,
    .hljs-selector-class,
    .hljs-selector-id,
    .hljs-variable {
      color: #79c0ff;
    }

    .hljs-meta .hljs-string,
    .hljs-regexp,
    .hljs-string {
      color: #a5d6ff;
    }

    .hljs-built_in,
    .hljs-symbol {
      color: #ffa657;
    }

    .hljs-code,
    .hljs-comment,
    .hljs-formula {
      color: #8b949e;
    }

    .hljs-name,
    .hljs-quote,
    .hljs-selector-pseudo,
    .hljs-selector-tag {
      color: #7ee787;
    }

    .hljs-subst {
      color: #c9d1d9;
    }

    .hljs-section {
      color: #1f6feb;
      font-weight: 700;
    }

    .hljs-bullet {
      color: #f2cc60;
    }

    .hljs-emphasis {
      color: #c9d1d9;
      font-style: italic;
    }

    .hljs-strong {
      color: #c9d1d9;
      font-weight: 700;
    }

    .hljs-addition {
      background-color: #033a16;
      color: #aff5b4;
    }

    .hljs-deletion {
      background-color: #67060c;
      color: #ffdcd7;
    }
  }
}
</style>
