<template>
    <div>
      <!-- Your template here -->
    </div>
  </template>
  
  <script lang="ts">
  import Picture from '@interfaces/picture.interface';
  import LinkGroupElement from '@interfaces/LinkGroupElement.interface';
  import {
    defineComponent, PropType, watchEffect, ref,
  } from 'vue';
  
  export default defineComponent({
    name: 'MenuModule',
    props: {
      name: {
        type: String,
        required: true,
      },
      picture: {
        type: Object as PropType<Picture>,
        required: true,
      },
      elements: {
        type: Array as PropType<(LinkGroupElement & { active: boolean })[]>,
        required: true,
      },
    },
    setup(props) {
      const elementsArray = ref<(LinkGroupElement & { active: boolean })[]>([]);
      const open = ref(false);
      const media = ref<string>('');

      watchEffect(() => {
        media.value = 'your media store state value here';
      });
  
      function isLeft() {
        return variant.value?.includes('left');
      }
  
      function updateElements() {
        elementsArray.value = [];
        props.elements?.forEach((element) => {
          const newElement = { ...element, active: false };

          if (newElement.links) {
            if (!newElement.links[0]?.text?.length) {
              delete newElement.links;
            }
          }

          elementsArray.value.push(newElement);
        });
      }
  
      function type(element: LinkGroupElement & { active: boolean }): 'router-link' | 'button' {
        if (element.link.text) return 'router-link';
        return 'button';
      }
  
      function toggle() {
        open.value = !open.value;
      }
  
      function toggleElement(element: LinkGroupElement & { active: boolean }) {
        element.active = !element.active;
      }
  
      function closeAll() {
        props.elements?.forEach((element) => {
          element.active = false;
        });
      }
  
      function checkInview() {
        // your checkInview logic here
      }
  
      updateElements();
  
      return {
        elementsArray,
        open,
        media,
        isLeft,
        type,
        toggle,
        toggleElement,
        closeAll,
        checkInview,
      };
    },
  });
  </script>
  