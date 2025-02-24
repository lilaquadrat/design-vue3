<script setup lang="ts">

import type Link from '@interfaces/link.interface';
import type Textblock from '@interfaces/textblock.interface';

import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';

import useMainStore from '@/stores/main.store';
import { useInview } from '@/plugins/inview';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';

defineOptions({ inheritAttrs: false });

const store = useMainStore();
const props = defineProps<ModuleBaseProps & {
  textblock: Textblock;

  links?: Link[];

  list?: string[];
}>();
const technical = ref<boolean>(true);
const visible = ref<boolean>(false);
const cookies = ref<Record<string, boolean>>({
  analytics: false
});
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});
const translations = ref<Record<string, string>>({
  confirm: 'cookies-module-confirm',
  cancel : 'cookies-module-cancel',
});
const gtag = computed(() => {

  const useWindow: any = window;

  return useWindow.gtag || function gtag () { return true; };

});
const isOverlay = computed(() => props.variant?.includes('overlay'));
const overlayPosition = computed(() => {

  if (props.variant?.includes('overlayRight')) return 'overlayRight';
  return 'overlayFull';

});

onMounted(() => {

  calcVisibilty();

  if (isOverlay.value) {

    updateSelection();

  }

});

function calcVisibilty () {

  const cookies = getCookies();

  if (props.variant?.includes('overlay')) {

    visible.value = !cookies.find((single) => single.name === 'lila-cookies');

    if (overlayPosition.value === 'overlayFull') {

      store.setFullscreen(visible.value);

    }

  } else {

    visible.value = true;

  }

}

function updateSelection () {

  const currCookies = getCookies();
  const acceptedCookie = currCookies.find((single) => single.name === 'lila-cookies-accepted');
  let accepted: string[] = [];

  if (acceptedCookie) {

    accepted = acceptedCookie.value.split(',');
    accepted.forEach((single) => {

      if (cookies.value[single] !== undefined) {

        cookies.value[single] = true;
      }

    });

  }

}

function consent (type: 'all' | 'selection') {

  const currCookies = getCookies();

  if (type === 'all') {

    Object.keys(currCookies).forEach((single) => { cookies.value[single] = true; });

  }

  if (cookies.value.analytics) {

    gtag.value('consent', 'update', {
      ad_storage       : 'granted',
      analytics_storage: 'granted',
    });

  } else {

    gtag.value('consent', 'update', {
      ad_storage       : 'denied',
      analytics_storage: 'denied',
    });

    currCookies.forEach((single) => {

      if (single.name.match(/^_ga*/)) {

        document.cookie = `${single.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None;`;

      }

    });

  }

  const cookieKeys = Object.keys(cookies).filter((single) => (cookies.value[single] ? single : null));

  cookieKeys.push('technical');

  document.cookie = `lila-cookies=1; expires=${dayjs().add(2, 'years').toString()}; SameSite=None;`;
  document.cookie = `lila-cookies-accepted=${cookieKeys.join(',')}; expires=${dayjs().add(2, 'years').toString()}; SameSite=None;`;

  calcVisibilty();

}

function getCookies () {

  const cookies = document.cookie.split(';').filter((single) => single);

  return cookies.map((single) => {

    const name = single.split('=');

    return { name: name[0].trim(), value: name[1] };

  });

}

</script>
<template>
  <section :id="props.index?.anchor || props.id" v-if="visible && isOverlay || !isOverlay" :class="[{ 'lila-module': !isOverlay, isOverlay, }, overlayPosition, inviewState]" class="lila-cookies-module">

    <lila-overlay-background-partial v-if="visible && isOverlay && overlayPosition === 'overlayFull'" background="mobile">
      <lila-dialog-partial class="lila-cookies-module-dialog" type="check" @confirm="consent('all')" @cancel="consent('selection')" :translations="translations">
        <lila-textblock-partial v-if="textblock" v-bind="textblock" />
        <section class="checkbox-container">
          <lila-checkbox-partial name="technical" disabled v-model="technical">{{$translate('cookies-module-technical-cookies')}}technisch notwendige Cookies</lila-checkbox-partial>
          <lila-checkbox-partial name="analytics" v-model="cookies.analytics">{{$translate('cookies-module-analytic-cookies')}}</lila-checkbox-partial>
        </section>
      </lila-dialog-partial>
    </lila-overlay-background-partial>

    <lila-dialog-partial v-if="visible && isOverlay && overlayPosition === 'overlayRight'" class="lila-cookies-module-dialog" type="check" @confirm="consent('all')" @cancel="consent('selection')" :translations="translations">
      <lila-textblock-partial v-if="textblock" v-bind="textblock" />
      <section class="checkbox-container">
        <lila-checkbox-partial name="technical" disabled v-model="technical">{{$translate('cookies-module-technical-cookies')}}</lila-checkbox-partial>
        <lila-checkbox-partial name="analytics" v-model="cookies.analytics">{{$translate('cookies-module-analytic-cookies')}}</lila-checkbox-partial>
      </section>
    </lila-dialog-partial>

    <template v-if="!isOverlay">

      <lila-textblock-partial v-if="textblock" v-bind="textblock" />
      <lila-list-partial v-bind="list" mode="list" />
      <lila-list-partial v-bind="links" mode="links" />

      <section class="checkbox-container">
        <lila-checkbox-partial name="technical" disabled v-model="technical">{{$translate('cookies-module-technical-cookies')}}</lila-checkbox-partial>
        <lila-checkbox-partial name="analytics" v-model="cookies.analytics">{{$translate('cookies-module-analytic-cookies')}}</lila-checkbox-partial>
      </section>
      <lila-button-group-partial gap>
        <lila-button-partial @confirmed="consent('all')" colorScheme="colorScheme1">{{ $translate(translations.confirm) }}</lila-button-partial>
        <lila-button-partial @confirmed="consent('selection')" colorScheme="transparent">{{ $translate(translations.cancel) }}</lila-button-partial>
      </lila-button-group-partial>
    </template>

  </section>
</template>
<style lang="less" scoped>

.lila-cookies-module-dialog,
.lila-cookies-module.lila-module {

  .checkbox-container {

    display: grid;
    gap: 10px;

    :deep(.lila-label-parent-container) {

      .label-container {
        display: none;
      }
    }
  }

}

.lila-cookies-module {

  &.isOverlay.overlayRight {

    .lila-cookies-module-dialog {

      position: fixed;
      top: 20px;
      right: 20px;
      bottom: 20px;
      left: 20px;
      display: grid;

      @media @tablet,
      @desktop {
        top: inherit;
        right: 20px;
        bottom: 20px;
        left: inherit;
      }

    }
  }

  &.lila-module {

    .module;

    display: grid;
    gap: 40px;

    max-width: @moduleWidth_S;

    .lila-label-parent-container:deep(.label-container) {
        display: none;
    }

  }

}
</style>
