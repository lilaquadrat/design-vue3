<script setup lang="ts">
import type { ParsedError } from '@/libs/ActionNotice';
import ModelsClass from '@/libs/Models.class';
import useMainStore from '@/stores/main.store';
import type { Address, ListOfModels, Location } from '@lilaquadrat/interfaces';
import StudioSDK, { type SDKResponse } from '@lilaquadrat/sdk';
import { convertCountryISO2 } from '@lilaquadrat/studio/lib/esm/frontend';
import { watch } from 'vue';
import { computed, onBeforeMount } from 'vue';
import { ref } from 'vue';


const mainStore = useMainStore();
const emit = defineEmits<{
  'update:modelValue': [value?: Address]
}>();
const props = defineProps<{
  name: string
  modelValue: Address
  placeholder: string
  disabled: boolean
  required: boolean
  error: ParsedError
}>();
const model = ref<Address>();
const selectedAddress = ref<Address>();
const loading = ref<boolean>(false);
const autocomplete = ref<any[]>();
const search = ref<string>();
const minLength = ref<number>(5);
const calculatedOptions = ref();
const open = ref<boolean>();
const anchorElement = ref<HTMLElement>();
const optionsElement = ref<HTMLElement>();


onBeforeMount(() => {

  model.value = ModelsClass.add(props.modelValue, 'address');

});

watch(search, () => update());


function select (address: Location) {

  selectedAddress.value = {
    osm_id      : +address.osm_id,
    country     : convertCountryISO2(address.address.country_code) as string,
    country_name: address.address.country,
    street      : address.address.road,
    streetNumber: address.address.house_number,
    zipcode     : address.address.postcode,
    city        : address.address.city,
  };

  emit('update:modelValue', selectedAddress.value);

  closeOptions();

}

function remove () {

  selectedAddress.value = undefined;
  emit('update:modelValue');

}

function tryOpen () {

  if (autocomplete.value) {

    open.value = true;

  }

}

function closeOptions () {

  open.value = false;

}

function calculateOptionsStyle () {


  const element = anchorElement.value as HTMLElement;
  const optionsContainer = optionsElement.value;
  const input = element.querySelector('input');
  const bounds = input.getBoundingClientRect();
  let top = bounds.top + input.offsetHeight;
  const body = document.querySelector('body');
  const positionTop = bounds.bottom + optionsContainer.offsetHeight + 50 > body.offsetHeight;

  if (positionTop) {

    top = bounds.top - 5 - optionsContainer.offsetHeight;

  }

  calculatedOptions.value = {
    top        : `${top}px`,
    left       : `${bounds.left}px`,
    'min-width': `${element.offsetWidth}px`,
    'max-width': `${element.offsetWidth}px`,
  };

}

const hasError = computed(() => !!props.error?.error);
const optionsStyle = computed(() => calculatedOptions.value);
const addressString = computed(() => {

  if (!selectedAddress.value) return null;

  return `${selectedAddress.value.street} ${selectedAddress.value.streetNumber}, ${selectedAddress.value.zipcode} ${selectedAddress.value.city}, ${selectedAddress.value.country}`;

});
const isValidSearch = computed(() => {

  if(!search.value) return false;

  return search.value?.length > minLength.value && /\d/.test(search.value)

});

async function update () {
  
  if (isValidSearch.value) {

    loading.value = true;

    const sdk = new StudioSDK('design', mainStore.apiConfig);
    const call = sdk.public.lists.address(search.value);
    let response: SDKResponse<ListOfModels<Location>>;

    try {

      // response = await this.$traceable(call, 1000);
      response = await call;

    } catch (error) {

      console.error(error);
      loading.value = false;
      open.value = true;
      return;

    }


    autocomplete.value = response.data.data;
    loading.value = false;
    open.value = true;

  }

}

</script>
<template>
  <lila-fieldset-partial class="lila-address-partial" :class="{open}" legend="address">

    <section ref="anchorElement" class="input-container">
      <div v-if="selectedAddress" class="selected">
        <div class="address-elements-container">
          <span class="address-element">{{selectedAddress.street}} {{ selectedAddress.streetNumber }},</span>
          <span class="address-element">{{selectedAddress.zipcode}} {{ selectedAddress.city }},</span>
          <span class="address-element">{{selectedAddress.country_name}}</span>
        </div>
        <lila-button-partial class="remove-button" colorScheme="transparent" icon="close" @click="remove" />
      </div>

      <lila-input-partial @focus="tryOpen" v-model="search" v-if="!selectedAddress" placeholder="type your street and number">
        {{$translate('address search')}}
      </lila-input-partial>
      <lila-indicator-partial v-if="loading" small />
      <lila-description-partial v-if="!selectedAddress">
        {{$translate('provide at least your street and housenumber to find your address. city and zipcode increase accuracy.')}}
      </lila-description-partial>
    </section>

    <lila-input-partial placeholder="address addition">
      {{$translate('address addition')}}
    </lila-input-partial>

    <lila-input-labels-partial :error="hasError" :required="required" :disabled="disabled">
      <slot/>
    </lila-input-labels-partial>

    <lila-overlay-background-partial v-if="open" background="none" @mounted="calculateOptionsStyle" @close="closeOptions">
      <section ref="optionsElement" class="options-container address-container" :style="optionsStyle">
        <h4 class="no-matching" v-if="!autocomplete.length && isValidSearch && !loading">{{ $translate('no matching addresses') }}</h4>

        <button class="single-address" type="button" v-for="(single, index) in autocomplete" :key="`single-address-${index}`" @click="select(single)">
          {{ single.address.road }} {{ single.address.house_number }}, {{ single.address.postcode }} {{ single.address.city }}, {{ single.address.country }}
        </button>

      </section>
    </lila-overlay-background-partial>

  </lila-fieldset-partial>
</template>
<style lang="less" scoped>

.lila-address-partial {

  .selected {
    display: grid;

    grid-template-rows: max-content max-content max-content;
    grid-template-columns: 1fr 35px;
    gap: 5px;
    align-items: start;
    min-height: @buttonHeight;

    .remove-button {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 2;
    }

    .address-elements-container {
      display: grid;

      @media @tablet, @desktop {
        grid-template-columns: max-content max-content max-content;
        gap: 5px;
      }

      .address-element {
        display: grid;
        align-content: center;
      }

    }

  }

  .input-container {
    position: relative;
    display: grid;
    gap: 10px;

    .lila-loading-indicator {
      position: absolute;
      top: 5px;
      align-self: start;
      justify-self: end;
    }
  }

  &.open {

    .input-container {

      .lila-input::v-deep {

        input {
          position: relative;
          .index(11);

        }
      }
    }
  }

}

.address-container {
  position: absolute;
  display: grid;
  overflow: auto;
  max-height: 40vh;
  background-color: @white;
  .index(12);

  @media @tablet, @desktop {
    box-shadow: 0 0 5px -3px @textColor;
  }

  .no-matching {
    padding: 5px;
    cursor: inherit;

  }

  .single-address, .no-matching {
    display: grid;
    margin: 0;
    padding: 15px 5px;
    border: 0;
    border-bottom: solid 1px @grey1;
    background: none;

    line-height: @buttonHeight;
    text-align: left;
    cursor: pointer;
  }

  .no-matching:hover {
    color: @color1;
  }

}
</style>
