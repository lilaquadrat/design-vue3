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
const formattedDate = computed(() => {
  if(props.date) {
    const formattedYear = dayjs(props.date).year();
    const formattedDayMont = dayjs(props.date).locale('de').format('DD, MMMM').toUpperCase();

    return {
      year    : formattedYear,
      dayMonth: formattedDayMont
        
    }
  } else {
    return {
      year    : '',
      dayMonth: ''
    };
  }
   
});

</script>
<template>
    <section  
    ref="element" 
    id="id"
    class="timeline-module lila-module"
    :class="[inviewState, variant, {hasImage: picture, hasVideo: video}]">
   
    <!-- hier habe ich die Kontrolle über den Inhalt -->
    <section class="elements-container">
        <span class="middleLine"></span>
        <div class="date-container">
            <time v-if="date" class="year" >
                {{ formattedDate.year }} 
            </time>
            <br /> 
            <time v-if="date" class="dayMonth" >
                {{ formattedDate.dayMonth }}
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
                <span></span>
                <lila-textblock-partial v-bind="textblock" />
                <lila-list-partial v-if="list" v-bind="list" class="list-container"></lila-list-partial>
            </section>
    </section>

    </section>
</template>
<style lang="less" scoped>
.lila-content-module .container .lila-module:first-child {
    // margin-top: 0;
}
.lila-module.timeline-module {
     
    margin: 0 auto;
    width: @moduleWidth_L;
    height: 650px;
    .font-light();
    // height: calc(575px, 80px);
}
 .elements-container {
    display: grid;
    row-gap: 50px;
    height: 427px;
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
    display: grid;
    grid-area: date-container;
    // border: dotted 2px red;
    
    }
&.year {
    font-size: 60px;
    color:@color4;
    line-height: 62px;
    font-weight: 800;
}
&.media-container{
    grid-area: media-container;
    padding: 0 40px;
    // width:344px;
}
&.text-container {
    padding: 0 40px;
    border-left: solid 8px @color4; 
    grid-area: text-container;
    width: 778px; 
    border-radius: 20px;
    
}
</style>

