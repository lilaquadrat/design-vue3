<script setup lang="ts">
import type Picture from '@interfaces/picture.interface';

defineProps<{
  alt: string;

  src: string;

  copyright?: string;
  source?: Picture['source'];

  noLoadAnimation?: boolean;

  fit?: boolean;

  center?: boolean;

}>();

</script>
<template>
  <div class="lila-figure" ref="element">
    <section class="picture-container">
      <img :src="src" :alt="alt" style="max-width: 100%; height: auto;" width="600" />
  
      <figcaption v-if="copyright">{{ copyright }}</figcaption>
    </section>
  </div>
</template>