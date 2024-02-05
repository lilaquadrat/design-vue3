<script setup lang="ts">
import { ref, computed } from 'vue';
import { useInview } from '../../plugins/inview';
import type Textblock from '../../interfaces/textblock.interface';
import type Picture from '../../interfaces/picture.interface';
import type Video from '../../interfaces/video.interface'; 
import dayjs from 'dayjs';

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
const formattedYear = computed(() =>  {
    
    if(props.date) {
         const currentYear = dayjs(props.date).year();
         return currentYear
    }
});
const formattedDayMonth = computed(() =>  {
    if(props.date) {
        const dayMonth = dayjs(props.date).locale('de').format('DD, MMMM').toUpperCase();
        dayjs(dayMonth);
        console.log('dayMonth', dayMonth)
        return dayMonth
    }
})
</script>
<template>
    <section  
    ref="element" 
    id="id"
    class="timeline-module lila-module"
    :class="[inviewState, variant, {hasImage: picture, hasVideo: video}]">
   
    <!-- hier habe ich die Kontrolle über den Inhalt -->
    <section class="elements-container">
        <div class="date-container">
            <time v-if="date" class="year" >
                {{ formattedYear }} 
        
            </time>
            <br /> 
            <time v-if="date" class="dayMonth" >
        
                {{ formattedDayMonth }}
            </time>
        </div>

        
        <!-- wenn Bild vorhanden, anzeigen -->
        <div class="media-container">
            <lila-picture-partial v-if="picture" v-bind="picture"></lila-picture-partial>
        <!-- Wenn Video vorhanden, anzeigen -->
            <lila-video-partial v-if="video" v-bind="video"></lila-video-partial>
        </div>

        <!--  hier drüber wird der Inhalt aller Elemente angepasst -->
            <section class="text-container">
                
                <lila-textblock-partial v-bind="textblock" />
                <lila-list-partial v-if="list" v-bind="list" class="list-container"></lila-list-partial>
            </section>
    </section>

    </section>
</template>
<style lang="less" scoped>
.lila-content-module .container .lila-module:first-child {
    margin-top: 0;
}
.lila-module.timeline-module {
     
    margin: 0 auto;
    width: @moduleWidth_L;
    // height: calc(575px, 80px);
}
 .elements-container {
    display: grid;
    row-gap: 50px;
    //  height: 575px; 
     grid-template-columns: repeat(2, auto);
     grid-template-rows:  repeat(3, auto);
    //  position: relative;
    
     grid-template-areas: 
     "date-container date-container"
     "media-container text-container"
     "media-container text-container";
 }

&.date-container {
    grid-area: date-container;
    border: dotted 2px red;
    width: auto;
    
    }

&.media-container{
    grid-area: media-container;
    padding: 0 40px
}
&.text-cotainer {
    padding: 0 40px;
    border-left: solid 8px black; 
    grid-area: text-container;
}
</style>

