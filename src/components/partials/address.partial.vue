<script setup lang="ts">
import type SelectOption from '@/interfaces/selectOption.interface';
import type { ParsedError } from '@/libs/ActionNotice';
import ModelsClass from '@/libs/Models.class';
import { useInview } from '@/plugins/inview';
import { useResize } from '@/plugins/resize';
import useMainStore from '@/stores/main.store';
import type { Address, ListOfModels, Location } from '@lilaquadrat/interfaces';
import StudioSDK, { type SDKResponse } from '@lilaquadrat/sdk';
import { convertCountryISO2, hardCopy } from '@lilaquadrat/studio/lib/esm/frontend';
import { onServerPrefetch, watch } from 'vue';
import { computed, onBeforeMount } from 'vue';
import { ref } from 'vue';

const mainStore = useMainStore();
const { scrolled } = useInview();
const { resized } = useResize();
const emit = defineEmits<{
  'update:modelValue': [value?: Address]
}>();
const props = defineProps<{
  modelValue: Address
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: ParsedError
  fullAddressRequired?: boolean
}>();
const model = ref<Address>({});
const selectedAddress = ref<Address>();
const loading = ref<boolean>(false);
const autocomplete = ref<Location[]>();
const search = ref<string>('');
const minLength = ref<number>(5);
const calculatedOptions = ref();
const open = ref<boolean>();
const anchorElement = ref<HTMLElement>();
const optionsElement = ref<HTMLElement>();
const availableCountries: SelectOption[] = [
  { value: 'deu', text: 'country-deu' },
  { value: 'aut', text: 'country-aut' },
  { value: 'che', text: 'country-che' },
];

onBeforeMount(() => {

  model.value = ModelsClass.add(props.modelValue, 'address');
  
});
onServerPrefetch(() => {
  
  model.value = ModelsClass.add(props.modelValue, 'address');

})

watch(search, () => update());
watch([resized, scrolled], () => calculateOptionsStyle())

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

function updateOnInput () {

  emit('update:modelValue', hardCopy(model.value));

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

  if(!props.fullAddressRequired) return;

  const element = anchorElement.value as HTMLElement;
  const optionsContainer = optionsElement.value;
  const input = element.querySelector('input');

  if(!optionsContainer || !element || !input) {

    calculatedOptions.value = {};
    return;

  }

  const bounds = input.getBoundingClientRect();
  let top = bounds.top + input.offsetHeight;
  const positionTop = bounds.bottom + optionsContainer.offsetHeight + 50 > window.innerHeight;

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
const isValidSearch = computed(() => {

  if(!search.value) return false;

  return search.value?.length > minLength.value && /\d/.test(search.value)

});

async function update () {
  
  if (isValidSearch.value) {

    loading.value = true;

    const sdk = new StudioSDK(mainStore.apiConfig);
    const call = sdk.public.lists.address(search.value!);
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
  <lila-fieldset-partial class="lila-address-partial" :class="{open, simple: !fullAddressRequired}" legend="address">
    <template v-if="fullAddressRequired">
      <section ref="anchorElement" class="input-container">
        <div v-if="selectedAddress" class="selected">
          <div class="address-elements-container">
            <span class="address-element">{{ selectedAddress.street }} {{ selectedAddress.streetNumber }},</span>
            <span class="address-element">{{ selectedAddress.zipcode }} {{ selectedAddress.city }},</span>
            <span class="address-element">{{ selectedAddress.country_name }}</span>
          </div>
          <lila-button-partial class="remove-button" color-scheme="transparent" icon="close" @click="remove" />
        </div>
  
        <lila-input-partial v-if="!selectedAddress" v-model="search" placeholder="type your street and number" @focus="tryOpen">
          {{ $translate('address search') }}
        </lila-input-partial>
        <lila-indicator-partial v-if="loading" small />
        <lila-description-partial v-if="!selectedAddress">
          {{ $translate('provide at least your street and housenumber to find your address. city and zipcode increase accuracy.') }}
        </lila-description-partial>
      </section>
  
      <lila-input-partial v-model="model.addressAddition" placeholder="address addition">
        {{ $translate('address addition') }}
      </lila-input-partial>
  
      <lila-input-labels-partial :error="hasError" :required="required" :disabled="disabled">
        <slot />
      </lila-input-labels-partial>
  
      <lila-overlay-background-partial v-if="open" background="none" @mounted="calculateOptionsStyle" @close="closeOptions">
        <section ref="optionsElement" class="options-container address-container" :style="optionsStyle">
          <h4 v-if="!autocomplete?.length && isValidSearch && !loading" class="no-matching">
            {{ $translate('no matching addresses') }}
          </h4>
  
          <button v-for="(single, index) in autocomplete" :key="`single-address-${index}`" class="single-address" type="button" @click="select(single)">
            {{ single.address.road }} {{ single.address.house_number }}, {{ single.address.postcode }} {{ single.address.city }}, {{ single.address.country }}
          </button>
        </section>
      </lila-overlay-background-partial>
    </template>

    <template v-if="!fullAddressRequired">
      <section class="street-container">
        <lila-input-partial v-model="model.street" class="street" placeholder="street" @update:model-value="updateOnInput">
          {{ $translate('street') }}
        </lila-input-partial>
        <lila-input-partial v-model="model.streetNumber" class="streetNumber" placeholder="streetNumber" @update:model-value="updateOnInput">
          {{ $translate('streetNumber') }}
        </lila-input-partial>
      </section>
      
      <section class="city-container">
        <lila-input-partial v-model="model.city" class="city" placeholder="city" @update:model-value="updateOnInput">
          {{ $translate('city') }}
        </lila-input-partial>
        <lila-input-partial v-model="model.zipcode" class="zipcode" placeholder="zipcode" @update:model-value="updateOnInput">
          {{ $translate('zipcode') }}
        </lila-input-partial>
      </section>

      <lila-select-partial v-model="model.country" :multiple="false" placeholder="country" :options="availableCountries" @update:model-value="updateOnInput">
        {{ $translate('country') }}
      </lila-select-partial>

      <lila-input-partial v-model="model.addressAddition" placeholder="addressAddition" @update:model-value="updateOnInput">
        {{ $translate('addressAddition') }}
      </lila-input-partial>
    </template>
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

      :deep(.lila-input) {

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

  .single-address {
    .basicHover;
  }

  .no-matching:hover {
    color: @color1;
  }

}

&.simple {

  display: grid;
  .street-container, .city-container {
    display: grid;
    gap: 20px;

    :deep(input) {
      width: 100%;
    }
    
  }

  @media @tablet, @desktop {

    .street-container {
      grid-template-columns: 5fr 1fr;
    }
    .city-container {
      grid-template-columns: 4fr 2fr;
    }

  }
  
}
</style>
