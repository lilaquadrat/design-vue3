<script setup lang="ts">
import type Picture from '@/interfaces/picture.interface';
import type LinkGroupElement from '@/interfaces/LinkGroupElement.interface';

import { computed, ref, watch } from 'vue';
import { useInview } from '@/plugins/inview';
import { useResize } from '@/plugins/resize';
import { onBeforeMount } from 'vue';
import type Link from '@/interfaces/link.interface';
import { onMounted } from 'vue';

const { media, resized } = useResize();
const props = defineProps<{
  name?: string;
  picture?: Picture;
  elements: (LinkGroupElement & { active: boolean })[];
  id?: string;
  variant: string[];
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
const elementsArray = ref<(LinkGroupElement & { active: boolean })[]>([]);
const open = ref<boolean>(false);
const style = ref();
const attachTo = ref<HTMLElement>();
const overlay = ref<HTMLElement>();
const linksContainer = ref<HTMLElement>();
const logoContainer = ref<HTMLElement>();
const links = ref<HTMLElement>();
const overlayContent = ref<Link[]>();
const isOverflow = ref<boolean>(false);

watch(() => resized.value, () => checkOverflow());
watch(() => props.elements, () => updateElements());
watch(() => attachTo.value, () => requestAnimationFrame(() => calculateOptionsStyle()),
);
watch(() => media.value, () => {
  closeAll();
  open.value = false;
},
);

const isLeft = computed(() => props.variant?.includes('left'));
const useTriggerMenu = computed(() => isOverflow.value);

onBeforeMount((): void => {
  updateElements();
});

onMounted(() => checkOverflow());

function updateElements () {
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

// function type (element: { link: { text: any } }): 'router-link' | 'button' {
//   if (element.link.text) return 'router-link';
//   return 'button';
// }

function toggle (): void {
  open.value = !open.value;
}

function toggleElement (event: Event, element: LinkGroupElement & { active: boolean }) {
  console.log('toggleevent', event);

  element.active = !element.active;
  open.value = !open.value;
  attachTo.value = event.target as HTMLElement;
  overlayContent.value = element.links;
}

function closeAll () {
  elementsArray.value?.forEach((element) => {
    element.active = false;
  });

  open.value = false;
  attachTo.value = undefined;
}

function checkOverflow () {

  if(!linksContainer.value || !logoContainer.value || !links.value) return;

  const availableWidth = linksContainer.value.clientWidth - 60;
  const logoWidth = logoContainer.value.offsetWidth;
  const linksWidth = links.value.offsetWidth;

  isOverflow.value = availableWidth < logoWidth + linksWidth;

  console.log(linksContainer.value, availableWidth, logoContainer.value, logoWidth, links.value, linksWidth, logoWidth + linksWidth);

}

const calculateOptionsStyle = () => {
  if (media.value === 'mobile') {
    style.value = {};
    return;
  }

  if (!overlay.value || !attachTo.value) return;

  console.log(attachTo.value);

  const overlayElement = overlay.value;
  const bounds = overlayElement.getBoundingClientRect();
  const targetBounds = attachTo.value.getBoundingClientRect();
  const left = targetBounds.left;
  const top = targetBounds.top + targetBounds.height;
  const body = document.querySelector('body') as HTMLBodyElement;
  const positionLeft = targetBounds.left + bounds.width + 50 > body.offsetWidth;

  // if(positionLeft) {

  //   left = targetBounds.left - bounds.width + targetBounds.width;

  // }

  style.value = {
    top : `${top}px`,
    left: `${left}px`,
  };

  // if(this.inline) {

  // style.value =  {
  // style.value =  {
  //    top: `${top}px`,
  //    left: `${bounds.left}px`,
  // };
};

</script>
<template>
  <nav ref="element" :id="id" :class="[inviewState, variant, { open, useTriggerMenu }]" class="lila-navigation-module lila-module">
    <section class="placeholder"></section>

    {{ style }} -- {{ overlay }} -- {{ open }} -- {{ isOverflow }}

    <section class="overflow-container">
      <section ref="linksContainer" class="links-container">
        <section ref="logoContainer" class="logo-container">
          <a class="logo" href="/">
            <lila-picture-partial v-if="picture" v-bind="picture" />
            <template v-if="name">{{ name }}</template>
          </a>
        </section>

        <button v-if="useTriggerMenu" class="trigger close" @click="toggle">
          <div class="placeholder"></div>
          <div class="trigger-container">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <section ref="links" class="links" v-if="!isLeft">
          <template v-for="(element, index) in elementsArray" :key="`button-${index}`" >

            <lila-link-partial :key="`link-${index}`" class="main" v-if="!element.links" v-bind="element" />

            <button :class="{ hasIcon: element.icon }" @click="toggleElement($event, element)">
              <lila-icons-partial v-if="element.icon" :type="element.icon" size="small" />
              {{ element.text }}
            </button>
            
          </template>
        </section>
      </section>

      <!-- <section class="link-group-container" v-if="isLeft">
          <section class="links">
            <template v-for="(element, index) in elementsArray">
              <lila-link-partial :key="`link-${index}`" class="main" v-if="!element.links" v-bind="element" />
              <section :key="`group-${index}`" v-if="element.links" class="link-group main">
                <button :class="{ hasIcon: element.icon }" @click="toggleElement(element)">
                  <lila-icons-partial v-if="element.icon" colorScheme="white" :type="element.icon" size="small" />
                  {{ element.text }}
                </button>
                <transition mode="out-in" name="menu">
                  <ul class="link-list" v-if="element.links && element.active">
                    <li :key="`sublinks-${index}`" v-for="(single, index) in element.links">
                      <lila-link-partial v-if="single.text" v-bind="single"></lila-link-partial>
                    </li>
                  </ul>
                </transition>
              </section>
            </template>
          </section>
        </section> -->

      <section class="action-container" @click="toggle" @keyup="toggle" v-if="isLeft"></section>
    </section>
    <teleport to="body">
      <transition name="menu">
          <lila-overlay-background-partial class="lila-navigation-module-overlay-background" v-if="overlayContent && open" background="none" @close="closeAll">
              <ul class="lila-navigation-module-overlay" v-if="overlayContent" ref="overlay" :style="style">
                <li :key="`sublinks-${index}`" v-for="(single, index) in overlayContent">
                  <lila-link-partial v-if="single.text" v-bind="single" />
                </li>
              </ul>
          </lila-overlay-background-partial>
        </transition>
    </teleport>
  </nav>
</template>
<style lang="less" scoped>

.lila-overlay-background {

  transition: opacity @aTime @aType, transform @aTime @aType;
  
  .lila-navigation-module-overlay {
    transition: opacity @aTime @aType, transform @aTime @aType;
    background-color: @white;

      position: absolute;
      .multi(padding, 2, 4);


      li {
        display: grid;
        grid-template-columns: max-content;
      margin: 0;

      a,
      button {
        .multi(padding, 0, 10);

        @media @wide {
          .multi(padding, 0, 2);
        }
      }
    }
  }
  &.menu-leave-active {

    .lila-navigation-module-overlay { 
      opacity: 0;
      transition-delay: 0.1s;
  
      transform: translateY(-10px);
    }
    
  }

  &.menu-enter-active {

    .lila-navigation-module-overlay { 

      opacity: 0;
      transition-delay: 0.1s;

      transform: translateY(-10px);
    }
  }


}

.lila-navigation-module {
  .index(8);

  position: relative;

  width: 100%;

  background-color: transparent;
  transition-delay: 0s;

  .placeholder {
    height: 40px;
  }

  &.overlay {
    .placeholder {
      display: none;
    }
  }

  .container-menu {
    width: 100%;

    // @media only screen and (min-width: 520px), print and (min-width: 520px) {
    //   width: 250px;

    //   transform: translateX(0);
    // }
  }

  .trigger {
    position: relative;
    padding: 0;

    -webkit-tap-highlight-color: transparent;
    .multi(padding-right, 8);

    @media @wide {
      padding: 0;
    }

    .placeholder {
      width: 40px;
    }

    .trigger-container {
      position: absolute;
      display: grid;

      grid-template-rows: min-content;

      gap: 4px;

      align-items: center;
      align-self: center;
      justify-self: end;
      width: 20px;
    }

    &:after {
      display: none;
    }

    span {
      display: grid;

      width: 20px;
      height: 2px;
      margin: auto;

      background-color: @color1;
      transition: all @aTime @aType;

      transform: rotate(0);
    }

    &:hover {
      span {
        background-color: @color2;
      }
    }
  }

  .overflow-container {
    display: grid;
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;

    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.13);

    @media @desktop {
      background-color: @white;
    }
  }

  // .action-container {
  //   .index(3);

  //   position: fixed;
  //   top: 0;
  //   left: 0;

  //   width: 100%;
  //   height: 100%;

  //   background-color: @white;
  //   opacity: 0;

  //   pointer-events: none;

  //   transition: opacity @animationTime @animationType;
  // }


  a,
  button {
    .font-head;

    // .multi(padding, 0, 8);
    display: grid;
    width: 100%;
    height: 40px;
    min-height: 40px;

    border: none;
    border-bottom: solid 1px @grey1;
    background: transparent;
    color: @color1;

    outline: none;

    font-size: @fontText;
    line-height: 41px;

    text-align: left;

    white-space: nowrap;
    cursor: pointer;

    // @media @wide {
      .multi(padding, 0, 2);
      .basicHover();

      border-bottom: 0;
    // }

    &:hover {
      background-color: @grey2;

      @media @wide {
        background-color: transparent;
      }
    }

    // &.lila-link {
    //   &.hasIcon {
    //     .lila-icon-partial {
    //       display: grid;
    //     }
    //   }
    // }

    // svg {
    //   fill: @color1;
    // }

    // &.hasIcon {
    //   grid-template-columns: 15px 1fr;
    //   gap: 10px;

    //   .icon-partial {
    //     display: grid;

    //     align-self: center;
    //     justify-self: center;
    //     margin-top: -2px;
    //   }
    // }
  }

  .links-container {
    display: grid;

    grid-template-columns: max-content 1fr max-content;
    max-width: @desktopWidthExt;

    justify-self: center;
    width: 100%;
    overflow: hidden;
    .multi(padding, 0, 4);

    height: 40px;

    @media @desktop {
      max-width: 100%;
    }

    @media @wide {
      max-width: @desktopWidthExt;
      padding: 0;
    }

    .links {
      display: grid;
      justify-self: end;
      justify-content: end;
      grid-auto-flow: column;
    }

  }

  &.useTriggerMenu {

    .links-container {
      .links {
        visibility: hidden;
        position: absolute;
      }
    }
  }

  // .logo::v-deep {
  //   .basicHover();

  //   width: max-content;
  //   height: 40px;
  //   padding: 0;

  //   line-height: 42px;
  //   .multi(padding-left, 8);

  //   @media @wide {
  //     padding: 0;
  //   }

  //   &:hover {
  //     background-color: transparent;
  //   }

  //   img {
  //     align-self: center;
  //     max-width: 190px;
  //     max-height: 40px;
  //     mix-blend-mode: normal;

  //     @media @tablet, @desktop {
  //       max-width: 250px;
  //     }

  //     &:hover {
  //       background-color: transparent;
  //     }
  //   }
  // }

  // &.colorScheme1 {
  //   .link-group {
  //     .link-list {
  //       background-color: transparent;

  //       @media @desktop {
  //         position: relative;

  //         left: 0;

  //         width: 100%;
  //         min-width: 100%;

  //         padding: 0;

  //         background-color: transparent;

  //         transition: none;
  //       }
  //     }
  //   }
  // }

  // &.open {
  //   .links-container {
  //     .links {
  //       display: grid;
  //       opacity: 1;
  //       pointer-events: all;
  //     }
  //   }

  //   .logo {
  //     justify-content: end;
  //   }

  //   .trigger {
  //     span {
  //       align-self: center;

  //       transform: rotate(45deg) translateY(4px);

  //       &:first-child {
  //         display: none;
  //       }

  //       &:last-child {
  //         transform: rotate(-45deg) translateY(-4.5px);
  //       }
  //     }
  //   }

  //   .action-container {
  //     opacity: 0.8;
  //     pointer-events: all;
  //   }

  //   .overflow-container {
  //     border-bottom: 0;
  //   }
  // }

  // &.left {
  //   .link-list {
  //     li {
  //       display: block;
  //       margin: 0;

  //       a,
  //       button {
  //         .multi(padding, 2, 10);
  //       }
  //     }
  //   }

  //   .links-container {
  //     position: relative;
  //     grid-template-columns: min-content 1fr;

  //     transition: transform @animationTime @animationType;
  //     transition-delay: 0.1s;

  //     .index(5);

  //     .logo-container {
  //       display: grid;
  //       grid-row-start: 1;
  //       grid-column-start: 2;
  //     }

  //     .trigger {
  //       grid-row-start: 1;
  //       grid-column-start: 1;

  //       padding: 0;

  //       .multi(padding-left, 8);

  //       @media @wide {
  //         display: grid;
  //       }

  //       .trigger-container {
  //         justify-self: start;
  //       }
  //     }

  //     .logo {
  //       display: grid;
  //       justify-self: end;
  //       padding: 0;
  //       .multi(padding-right, 8);
  //     }

  //     .links {
  //       width: 250px;
  //     }
  //   }

  //   .link-group-container {
  //     position: fixed;

  //     top: 0;
  //     left: 0;

  //     display: grid;

  //     grid-template-rows: 40px;
  //     width: 250px;

  //     height: 100vh;

  //     background-color: @grey3;

  //     box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.13);

  //     transition: transform @animationTime @animationType;
  //     transition-delay: 0.1s;

  //     transform: translateX(-250px);

  //     .index(5);

  //     .links {
  //       grid-row-start: 2;
  //     }

  //     a,
  //     button {
  //       display: grid;
  //       align-content: center;

  //       height: auto;
  //       line-height: 22px;

  //       white-space: normal;

  //       .multi(padding, 2, 8);
  //     }
  //   }

  //   &.colorScheme1 {
  //     .link-group-container {
  //       background-color: @color1;

  //       a::v-deep,
  //       button::v-deep {
  //         border-bottom: solid 1px @color3;
  //         color: @white;

  //         &:hover {
  //           background-color: @color3;
  //           opacity: 1;
  //         }

  //         // svg {
  //         //   fill: @white;
  //         // }
  //       }
  //     }
  //   }

  //   &.open {
  //     @media @wide {
  //       .links-container {
  //         transform: translateX(150px);
  //       }
  //     }

  //     .links-container {
  //       transform: translatex(250px);
  //     }

  //     .link-group-container {
  //       transform: translateX(0);
  //     }
  //   }

  //   .link-group {
  //     .link-list {
  //       @media @desktop {
  //         position: relative;

  //         left: 0;

  //         width: 100%;
  //         min-width: 100%;

  //         padding: 0;

  //         background-color: transparent;

  //         transition: none;
  //       }
  //     }
  //   }
  // }
}
</style>
