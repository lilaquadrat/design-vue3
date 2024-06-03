<script setup lang="ts">

import type Iframemap from '@/interfaces/Iframemap.interface';
import type Textblock from '@/interfaces/textblock.interface';
import { computed, onBeforeMount, ref, type Ref, } from 'vue';

const props = defineProps<Iframemap & {
    width?: string;
    height?: string;
    showMaps: string;
    textblock?: Textblock;
    variant?: string[];
}>();
const mapType = computed(() => (props.src.match('^https://(www.)?google.com/maps') ? 'google.com/maps' : 'basic'));
const mapId = computed(() => (mapType.value !== 'google.com/maps' ? false : new URL(props.src)));
const loadIframe = ref<boolean>(false);
const loadIframeElement = () => {
  loadIframe.value = true
};

onBeforeMount(() => {
  mapIframe()

})

function mapIframe () {
  if (!mapId.value) return;

  return {
    width : '100%',
    height: '100%',
    mapId : mapId.value,
  }
}
</script>
<template>
    <section class="lila-location-partial" :class="[variant, { loadIframe }]">
    
        <section class="iframe" v-if="loadIframe">
            <iframe title="iframe" v-if="src" :src="src"></iframe>
        </section>
        <section class="confirm-container" v-if="!loadIframe" :variant="variant">
            <div class="text-container">
                <lila-textblock-partial v-if="textblock" v-bind="textblock" />
                <lila-button-group-partial gap center>
                    <lila-button-partial colorScheme="colorScheme1" @click="loadIframeElement">
                        {{ showMaps }}
                    </lila-button-partial>
                </lila-button-group-partial>
            </div>
        </section>
    </section>
</template>
<style lang="less" scoped>
.lila-location-partial {
    .confirm-container {
        // background: @color2;backgroundbackground => unser Grauton unterscheidet sich vom GoogelMaps Original Grauton
        background: #E2E3DD;// Google Maps original Grauton
        text-align: center;
        align-content: end;
        justify-content: center;
        height: 0;
        padding-top: 56.25%; /* Aspect Ratio 16:9 */
        position: relative;

        .text-container {
          
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            :deep(.lila-textblock) {
                padding-bottom: 20px;
            }
        }

    }

    .iframe {
        padding-top: 56.25%;
        position: relative;
        display: block;

        iframe {

            display: block;
            border: 0;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
        }
    }

    &.square {
        .confirm-container {
            padding-top: 100%;
        }

        .iframe {
            padding-top: 100%;
        }
    }

}
</style>
