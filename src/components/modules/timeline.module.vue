<script setup lang="ts">
import { ref } from 'vue';
import { useInview } from '../../plugins/inview';
import type Textblock from '../../interfaces/textblock.interface';
import type Picture from '../../interfaces/picture.interface';
import type Video from '../../interfaces/video.interface';

const props = defineProps<{
    picture?: Picture;
    video?: Video;
    textblock?: Textblock;
    list?: string[];
    date?: string;
    variant?: string[]
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});

</script>
<template>
    <section  
    ref="element" 
    id="id"
    class="timeline-module lila-module"
    :class="[inviewState, variant, {hasImage: picture, hasVideo: video}]">
   
    <!-- hier habe ich die Kontrolle über den Inhalt -->
    <section class="content-container">
        <time v-if="date">{{ date }}</time>
        <!-- wenn Bild vorhanden, anzeigen -->
        <lila-picture-partial v-if="picture" v-bind="picture"></lila-picture-partial>

        <!-- Wenn Video vorhanden, anzeigen -->
        <lila-video-partial v-if="video" v-bind="video"></lila-video-partial>

        <!--  hier drüber wird der Inhalt aller Elemente angepasst -->
            <section class="elements-container">
                
                <lila-textblock-partial v-bind="textblock" />
                <lila-list-partial v-if="list" v-bind="list" class="list-container"></lila-list-partial>
            </section>
    </section>

    </section>
</template>
<style scoped lang="less">
.lila-module.timeline-module 
.content-container {
        
        border: dotted 2px red
    
}

.elements-container  {
 background-color: yellow;
}
</style>

