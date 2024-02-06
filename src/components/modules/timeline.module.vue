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
const formattedDate = computed(() =>  {
    if(props.date) {
         const formattedYear =   dayjs(props.date).year();
         const formattedDayMont = dayjs(props.date).locale('de').format('DD, MMMM').toUpperCase();
         return {
        year: formattedYear,
        dayMonth: formattedDayMont
        
        }
    } else {
        return {
            year: '',
            dayMonth: ''
        };
    }
   
});
</script>
<template>
    <section  
    ref="element" 
    id="id"
    class="lila-timeline-parent-container"
    :class="[inviewState, variant, {hasImage: picture, hasVideo: video}]">
    
        
         
        
            <div class="content-container">
                <div class="date-container">
            <time v-if="date" class="year" >
                {{ formattedDate.year }} 
            </time>
            <br /> 
            <time v-if="date" class="dayMonth" >
                {{ formattedDate.dayMonth }}
            </time>
        </div>

            <span class="media-container">
            <lila-picture-partial v-if="picture" v-bind="picture"></lila-picture-partial>
            <lila-ideo-partial v-if="video" v-bind="video"></lila-ideo-partial>
         </span>
        <div class="separating-line"></div>
      
            <span class="text-container">
                <lila-textblock-partial v-bind="textblock" />
                <lila-list-partial v-if="list" v-bind="list" class="list-container"></lila-list-partial>
            </span>
            
        
            </div>
            
            
         
        

    </section>
</template>
<style lang="less" scoped>
.lila-timeline-parent-container {
    .module;
    .headlines;
    

    margin: 80px;
    display: grid;
    grid-template-columns: 1fr auto max-content;
    max-width: @moduleWidth_L;
    
    .content-container {
        display: grid;
        gap:50px 0;
    
    }

    .date-container {
        justify-self: end;
        padding: 0 40px;
        .font-bold;
        display: grid;

     
    .year {
            font-size: 60px;
            line-height: 62px;
            justify-self: end;
            color: @color4;
  
        }
    .dayMonth {
        font-size: 34px;
        color: @color1;
      
        
     }

    }
    .media-container {
        grid-column-start: 1;
        padding: 0 40px;
        border: red solid 2px;
    }

    .text-container {
        grid-column-start: 3;
        display: grid;
        gap: 15px;
        padding: 0 40px; 
        border: 3px dotted black; 
    } 
    .separating-line {
    position: relative;
    }
    .separating-line::after {
    content: '';
    position: absolute;
    width: 8px;
    background: @color4;
    top: 0;
    bottom: -50px;
    left: 50%;
    border-radius: 99px;
    }
    .separating-line::before  {
    content: '';
    position: absolute;
    width: 8px;
    background: @color4;
    top: -200px;
    bottom: 0;
    left: 50%;
    border-radius: 99px;
    }
 
}
</style>

