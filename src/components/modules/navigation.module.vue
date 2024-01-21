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
const triggerMenuOverlay = ref<HTMLElement>();
const overlayContent = ref<Link[]>();
const isOverflow = ref<boolean>(false);
const activeKey = ref<string>('');

watch(() => resized.value, () => {

  attachTo.value = undefined;
  open.value = false;
  closeAll();
  checkOverflow();

});
watch(() => props.elements, () => updateElements());
watch(() => attachTo.value, () => {

  if(!useTriggerMenu.value && attachTo.value) requestAnimationFrame(() => calculateOptionsStyle())

});
watch(() => triggerMenuOverlay.value, () => {

  if(triggerMenuOverlay.value && open.value) {
    requestAnimationFrame(() => calculateOptionsStyle())
  }

});
watch(() => media.value, () => {

  closeAll();
  open.value = false;

});

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


function toggle (): void {

  open.value = !open.value;
  if(!open.value) closeAll();

}

function openElement (event: Event, element: LinkGroupElement & { active: boolean }) {

  open.value = false;
  attachTo.value = undefined;

  if(element.active) {

    element.active = false;
    open.value = false;

  } else {

    closeAll();

    element.active = true;
    open.value = true;
    activeKey.value = Date.now().toString();
    attachTo.value = event.target as HTMLElement;
    overlayContent.value = element.links;

  }


}

function toggleTriggerElement (event: Event, element: LinkGroupElement & { active: boolean }) {

  if(element.active) {

    element.active = false;

  } else {

    closeAll();
    element.active = true;

  }

}


function closeAll () {

  elementsArray.value?.forEach((element) => {
    element.active = false;
  });

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

  const overlayElement = useTriggerMenu.value ? triggerMenuOverlay.value : overlay.value;

  if(!overlayElement) return;

  const bounds = overlayElement.getBoundingClientRect();
  const targetBounds = useTriggerMenu.value ? linksContainer.value?.getBoundingClientRect() : attachTo.value?.getBoundingClientRect();

  if(!targetBounds) return;

  let left = targetBounds.left;
  let top = targetBounds.top + targetBounds.height;
  const body = document.querySelector('body') as HTMLBodyElement;
  const positionLeft = targetBounds.left + bounds.width + 50 > body.offsetWidth;


  if(positionLeft) {

    left = targetBounds.left - bounds.width + targetBounds.width;
    if(!useTriggerMenu.value) left += 10;

  } else {

    //match the padding of the attachTo element and the links inside the overlay
    if(!useTriggerMenu.value) left -= 10;
    
  }

  if(media.value === 'wide' && useTriggerMenu.value) {
    left -= 20;
  }

  // add one px to prevent overlaying border or box-shadow
  top += 1;

  style.value = {
    top : `${top}px`,
    left: `${left}px`,
  };

};

</script>
<template>
  <nav ref="element" :id="id" :class="[inviewState, variant, { open, useTriggerMenu }]" class="lila-navigation-module lila-module">
    <section class="placeholder"></section>

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

        <section ref="links" class="links">
          <template v-for="(element, index) in elementsArray" :key="`button-${index}`" >

            <lila-link-partial :key="`link-${index}`" class="main" :class="{isActive: element.active}" v-if="!element.links" v-bind="element" />

            <button :class="{ hasIcon: element.icon, isActive: element.active }" @click="openElement($event, element)" >
              <lila-icons-partial v-if="element.icon" :type="element.icon" size="small" />
              {{ element.text }}
            </button>
            
          </template>
        </section>
      </section>

    </section>

    <teleport to="body">
      <transition name="menu">
          <lila-overlay-background-partial :index="5" :key="activeKey" class="lila-navigation-module-overlay-background" v-if="overlayContent && open && !useTriggerMenu" background="none" @close="toggle">
              <ul class="lila-navigation-module-overlay" v-if="overlayContent" ref="overlay" :style="style">
                <li :key="`sublinks-${index}`" v-for="(single, index) in overlayContent">
                  <lila-link-partial v-if="single.text" v-bind="single" />
                </li>
              </ul>
          </lila-overlay-background-partial>
        </transition>
    </teleport>

    <teleport to="body">
      <transition name="menu">
          <lila-overlay-background-partial :index="5" class="lila-navigation-module-overlay-background" v-if="open && useTriggerMenu" background="none" @close="toggle">
            <section ref="triggerMenuOverlay" class="lila-navigation-module-overlay useTriggerMenu" :style="style">
              <template v-for="(element, index) in elementsArray" :key="`button-${index}`" >

                <lila-link-partial :key="`link-${index}`" class="main" :class="{isActive: element.active}" v-if="!element.links" v-bind="element" />

                <section :key="`group-${index}`" v-if="element.links" class="link-group main">

                  <button :class="{hasIcon: element.icon, isActive: element.active}" @click="toggleTriggerElement($event, element)">
                    <lila-icons-partial v-if="element.icon" :type="element.icon" size="small" />
                    {{ element.text }}
                  </button>

                  <ul class="link-list" v-show="element.links && element.active">
                    <li :key="`sublinks-${index}`" v-for="(single, index) in element.links">
                      <lila-link-partial v-if="single.text" v-bind="single"></lila-link-partial>
                    </li>
                  </ul>

                </section>
              </template>
            </section>
          </lila-overlay-background-partial>
        </transition>
    </teleport>

  </nav>
</template>
<style lang="less" scoped>

.lila-navigation-module-overlay, .lila-navigation-module {
  a,
  button {
    .font-head;

    display: grid;
    width: 100%;
    height: 40px;
    min-height: 40px;
    line-height: 41px;

    border: none;
    background: transparent;
    color: @color1;

    outline: none;
    font-size: @fontText;
    text-align: left;
    white-space: nowrap;
    cursor: pointer;

    .basicHover;
    &.isActive {
      color: @color3
    }

  }
}
.lila-navigation-module {
  .index(6);

  position: relative;

  width: 100%;

  background-color: transparent;
  transition-delay: 0s;

  a, button {
    .multi(padding, 0, 2);
  }

  .logo, .trigger {
    padding: 0;
  }


  .placeholder {
    height: 40px;
  }

  &.overlay {
    .placeholder {
      display: none;
    }
  }

  .trigger {
    position: relative;
    padding: 0;

    grid-column-start: 3;
    -webkit-tap-highlight-color: transparent;

    @media @wide {
      padding: 0;
    }

    .placeholder {
      width: 40px;
    }

    .trigger-container {
      position: absolute;
      display: grid;

      grid-template-rows: max-content;

      gap: 4px;

      align-items: center;
      align-self: center;
      justify-self: end;
      width: 20px;
    }

    span {
      display: grid;

      width: 20px;
      height: 2px;

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
      grid-column-start: 3;
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

}

.lila-navigation-module-overlay {
  a, button {
    .multi(padding, 0, 4);
  }

  &.useTriggerMenu {

    width: 100%;
    @media @desktop {
      max-width: 100%;
    }

    @media @wide {
      max-width: calc(@desktopWidthExt + 40px);
      padding: 0;
    }

    a, button {
    .multi(padding, 0, 4);
  }

    .link-group {
      .link-list {
        a {
          .multi(padding, 0, 8);
        }
      }
    }

  }
}


.lila-overlay-background {
  transition: opacity @aTime @aType, transform @aTime @aType;
  
  .lila-navigation-module-overlay {
    transition: opacity @aTime @aType, transform @aTime @aType;
    background-color: @white;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.13);

    position: absolute;

    li {
      display: grid;
      grid-template-columns: 1fr;
      margin: 0;
    }
  }
  &.menu-leave-active {

    .lila-navigation-module-overlay { 
      opacity: 0;
      transition-delay: 0.1s;
  
      transform: translateY(-5px);
    }
    
  }

  &.menu-enter-active {

    .lila-navigation-module-overlay { 

      opacity: 0;
      transition-delay: 0.1s;

      transform: translateY(-5px);
    }
  }

}

</style>
