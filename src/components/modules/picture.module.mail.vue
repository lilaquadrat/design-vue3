<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import type Picture from '@interfaces/picture.interface';
import type Textblock from '@interfaces/textblock.interface';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  picture: Picture
  textblock: Textblock
}>();
const showText = computed((): boolean => {
  if (!props.textblock) return false;

  return Object.keys(props.textblock).some((single) => {
    const singleTyped = single as keyof Textblock;

    return props.textblock[singleTyped]?.length;
  });
});

</script>
<template>
  <table :id="id" v-if="props.picture" border="0" cellspacing="0" cellpadding="0" style="padding-bottom: 40px;">
    <tbody>
      <tr>
        <td>
          <lila-picture-partial v-bind="picture" />
        </td>
      </tr>
      <tr v-if="showText" class="position-container">
        <td style="padding: 20px;">
          <lila-textblock-partial v-bind="textblock" />
        </td>
      </tr>
    </tbody>
  </table>
</template>