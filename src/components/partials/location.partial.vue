<script setup lang="ts">
import { computed, onBeforeMount, ref, } from 'vue';

const props = defineProps<{
    map: string,
    variant: string[]
}>();
const mapType = computed(() => (props.map?.match('^https://(www.)?google.com/maps') ? 'google.com/maps' : 'basic'));
const mapId = computed(() => (mapType.value !== 'google.com/maps' ? false : new URL(props.map)));
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
            <iframe title="iframe" v-if="map" :src="map"></iframe>
        </section>

        <section class="confirm-container" v-if="!loadIframe" :variant="variant">
            <lila-button-partial colorScheme="colorScheme1" @click="loadIframeElement">
                {{ $translate('location_module_show_map') }}
            </lila-button-partial>
        </section>
    </section>
</template>
<style lang="less" scoped>
.lila-location-partial {

.confirm-container {
  position: relative;
  display: grid;
  align-content: center;

  justify-content: center;
  background: @grey2;
  text-align: center;
  aspect-ratio: 5/4;

  .activate-map-button {
    position: absolute;
    align-self: center;
    justify-self: center;
  }
}

.iframe {
  position: relative;
  display: block;
  aspect-ratio: 5/4;
  width: 100%;

  iframe {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
}

}
</style>
