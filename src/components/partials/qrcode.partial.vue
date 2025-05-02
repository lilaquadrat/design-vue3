<script setup lang="ts">
import QRCode from 'qrcode';
import { ref, onMounted } from 'vue';

const props = defineProps<{
    content: string
}>();
const qrCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {

  renderQRCode();

});

const renderQRCode = () => {

  if (qrCanvas.value) {

    QRCode.toCanvas(qrCanvas.value, props.content, {
      errorCorrectionLevel: 'M',
      margin              : 5,
      width               : 250,
    })
    
  }

};

</script>
<template>
  <div class="qrcode">
    <canvas ref="qrCanvas" />
  </div>
</template>