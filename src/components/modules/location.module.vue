<script setup lang="ts">

import type Iframemap from '@/interfaces/Iframemap.interface';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { useInview } from '@/plugins/inview';
import type Textblock from '@interfaces/textblock.interface';
import { ref } from 'vue';
import type LinkListWithTitle from '../../interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '../../interfaces/ListWithTitle.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
    textblock?: Textblock;
    map: Iframemap;
    links?: LinkListWithTitle
    list?: ListWithTitle

}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') })

</script>
<template>
    <section ref="element" :id="id" :class="[variant, inviewState]" class="lila-location-module lila-module">
        <lila-location-partial ref="iframeElement" v-bind="map" class="iframe-container" :variant="variant" />
        <section class="text-container">
            <lila-textblock-partial v-if="textblock" v-bind="textblock" />
            <lila-list-partial class="list-container" v-if="list" v-bind="list" />
            <lila-list-partial class="link-container" v-if="links" v-bind="links" />
        </section>
    </section>
</template>
<style lang="less" scoped>
.lila-location-module {
    .modulePadding('none');
    max-width: @moduleWidth_M;
    margin: auto;

    display: grid;

    .text-container {
        .multi(padding-top, 8);
    }

    @media @desktop {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }



    .link-container,
    .list-container {
        padding: 20px 0;
    }

    &.bright {
        .iframe-container {
            :deep(.lila-textblock) {

                h1,
                h2,
                h3,
                p {
                    color: @white
                }
            }
        }
    }
}
</style>
