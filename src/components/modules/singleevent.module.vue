<script setup lang="ts">
import { onBeforeMount, ref, defineProps, computed } from 'vue';
import { useInview } from '../../plugins/inview';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type Textblock from '../../interfaces/textblock.interface';
import type Link from '../../interfaces/link.interface';
import type Video from '../../interfaces/video.interface';
import type Picture from '../../interfaces/picture.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
    textblock: Textblock;
    picture?: Picture;
    video?: Video;
    link: Link;
    details: Textblock;
    // startDate: string;
    // endDate: string;
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });

</script>
<template>
    <section ref="element" :id="id" :class="[props.variant, inviewState]" class="lila-singleevent-module lila-module">

        <section class="content-wrapper">
            <section class="video-container">
                <lila-video-partial v-if="video" v-bind="video" />
                <lila-textblock-partial v-if="details" v-bind="details" />
            </section>
            <lila-textblock-partial class="informations-container" v-if="textblock" v-bind="textblock" />
        </section>
    </section>
</template>

<style lang="less" scoped>
.lila-singleevent-module {

    .module;
    display: block;
    margin: 0 auto;

    .content-wrapper {
        background: pink;
        display: grid;
        //margin: 131px 0 181px 0;
        // height: 828px;
        max-width: 1200px;
        height: 568px;
        padding: 0 40px;
        gap: 44px;
        grid-template-columns: 1fr 1fr;
        ;

        .video-container {
            grid-column-start: 1;

            :deep(.youtube-video) {
                width: 556px;
                height: auto;
             
                min-height: 450px;
            }

        }

        .informations-container {}
    }
}
</style>

