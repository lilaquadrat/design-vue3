<script setup lang="ts">

import type { Agreement, GenericData, List, ListPartiticpantsDetails } from '@lilaquadrat/studio/lib/interfaces';
import ModelsClass from '../../libs/Models.class';
import StudioSDK from '../../libs/StudioSDK';
import type Textblock from '../../interfaces/textblock.interface';
import type Contact from '../../models/Contact.model';
import type Address from '../../models/Address.model'; 
import { type ErrorsObject } from '../../libs/ActionNotice';
import { type ErrorObject } from 'ajv/dist/types';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';
import { computed, onBeforeMount} from 'vue';
import type ListCategoryExtended from '../../interfaces/ListCategoryExtended.interface';


import useMainStore from '../../stores/main.store';

const store = useMainStore();
const props = defineProps<{
    textblock: Textblock;
    categoryTextblock: Textblock;
    genericData: GenericData;
    list: List;
    editor:{modes: string[]},
    state: string,
    participantsState: ListPartiticpantsDetails,
    variant: string;
    errors: Error | null;
    agreements: Record<string, Agreement & { value: boolean, error: boolean }> | {};

    
    // agreements: Record<string, Agreement & { value: boolean, error: boolean }>;

}>();
let model: Contact | null = null;
let addressModel: Address |null = null;
// let errors = null;
let errorsObject: ErrorsObject = {};
const translationPre = '';
// let agreements: Record<string, Agreement & { value: boolean, error: boolean }> = {};
// let participantsState: ListPartiticpantsDetails = null;
// const emit = defineEmits([
//     'contact',
//     'address', 
//     ''
// ]);
const emit = defineEmits<{
    (e: string, i:boolean): void;
    (e: string, data: any): void; //Argument of type '{}' is not assignable to parameter of type 'boolean'.
}>();
const list = computed(():List | null => {
  if(props.genericData?.lists && props.genericData?.data && Array.isArray(props.genericData?.lists)) {
    console.log(props.genericData.data)
    return props.genericData.data
    // return props.genericData.data[props.genericData.lists[0]]
  }

  return null
});
const categories = computed((): ListCategoryExtended[] => {
  if (props.list?.categories.length > 1) {
    const categories = props.list.categories as ListCategoryExtended[];

    if (props.participantsState) {
      categories.forEach((single: ListCategoryExtended) => {
        const stateCategory = props.participantsState.categories?.find((singleState) => singleState.id === single.id);

        if (stateCategory) {
     
          single.used = stateCategory.used;
          console.log(stateCategory.used)
          single.available = single.amount - single.used;
          single.percentUsed = (single.used / single.amount) * 100;
          single.percentAvailable = 100 - (single.used / single.amount) * 100;

        }
      });

      return categories;
    }
  }

  return null;
});
const selectCategories = computed(() => {
  if(props.list?.categories.length > 1) {
    return props.list.categories.map((single) => ({
      value      : single.id,
      text       : single.name,
      description: single.description,
      disabled   : single.disabled,
    }));
  }

  return null
})
const feedback = computed(() => {
  console.log('props.genericData?:', props.genericData)

  if(props.genericData?.editor && props.genericData?.data && Array.isArray(props.genericData.editor)){
    console.log('props.genericData:', props.genericData)
    return props.genericData.data[props.genericData.editor[0]]
  }

  return null
});
const showFeedback = computed(() => props.state && (props.state === 'success' || props.editor?.modes?.includes('feedback')));
const feedbackContent = computed(() => prepareContent(feedback.value));
const limited = computed(() => props.list?.participants?.max || null);
const disabled = computed(() => {
  if(props.participantsState && props.list?.participants?.max) {
    return props.participantsState.used >= props.list?.participants?.max
  }

  return false
})
const hideFreeSlots = computed(() => props.variant.includes('hide-free-slots'))
const mainErrors = computed(() => {
  const validErrors = ['LIST_CANNOT_JOIN', 'LIST_UNIQUE_CUSTOMER_CONFIRMED', 'LIST_NOT_FOUND', 'LIST_NO_SPOT_AVAILABLE']

  if(props.errors && validErrors.includes((props.errors as { message?:string}).message)) {
    return `${(props.errors as { message?:string}).message}`;
  }

  return null;
}); const slotsAvailable = computed(() => (props.list?.participants.max || 0) - props.participantsState.used)


onBeforeMount(() => {
  
  model = ModelsClass.add({}, 'contact');
  addressModel = ModelsClass.add({}, 'address');
  // emit('contact', ModelsClass.add({}));
  // emit('address', ModelsClass.add({}));
  updateAgreements();
  getparticipantsState();
}) 

function resetForm () {
//    props.state = '';
//    props.model = ModelsClass.add({}, 'contact');
//    props.addressModel = ModelsClass.add({}, 'address');
//    props.errors = null;
//    props.errorsObject = {};
  emit('state', '')
  model = ModelsClass.add({}, 'contact');
  addressModel = ModelsClass.add({}, 'address');
  errorsObject = {};
  emit('errors', null)
   
}

function updateErrors (errorsObject: ErrorsObject) {
  updateAgreements();
  emit('errors', errorsObject); //this.errorsObject = errorsObject; -> errorsObject = errorsObject hätte keinen Effekt
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function changeAgreement (event: MouseEvent, agreement: Agreement & { value: boolean, error: boolean }): void {
  // const agreement = agreements[index];
  const target = event.target as HTMLInputElement;

  agreement.value = target.checked;
}

function updateAgreements () {
  const agreements = {} as Record<string, Agreement & { value: boolean, error: boolean }>;


  props.list?.agreements.forEach((single: Agreement & {error: boolean}) => {
    agreements[single.contentId] = {
      ...single,
      value: props.agreements[single.contentId]?.value || false,
    };

    const values = errorsObject.agreements?.translatedPath?.values;


    if(values && values[1]) {
      if(values[1].includes(single.contentId)) {
        agreements[single.contentId].error = true;
      }
    }
  });
  // props.agreements = agreements
  emit('agreements', agreements);
    
}


const getparticipantsState = async () => {
  console.log('store:', store);
  console.log('store.state:', store.state);

  const sdk = new StudioSDK('design', store.state.api);

  try {
   
    const participantsState = await sdk.public.lists.state(props.list?._id.toString());

    if (participantsState.data) {

      // this.participantsState = participantsState.data;
      //participantsState.data;
      emit('participantsState', participantsState.data)
      

    }

  } catch (e) {

    console.error(e);
    console.log(e.response?.data);

  }
};
const handleForm = async (event: Event): Promise<void> => {
  event.preventDefault();
 

  const address = ModelsClass.save(addressModel, 'address');
  const customer = ModelsClass.save({...model, ...address}, 'contact');
  const agreements = [];
  let category: string;

  customer.type = 'person';

  const message = customer.message;

  delete customer.message;

  category = customer.category;

  delete customer.category;

  props.list?.agreements.forEach((single: Agreement) => {

    if (props.agreements[single.contentId].value) {

      agreements.push({ id: single.contentId, version: 0 });

    }

  });

  if (props.list?.categories.length === 1 && !category) {

    category = props.list.categories[0].id;

  }


  try {
    const sdk = new StudioSDK('design', store.state.api);
    const call = sdk.public.lists.join(props.list?._id.toString(), customer, message, category, agreements);


    await props.$traceable(call);

    //this.state = 'success';
    emit('state', 'success')
    

  } catch (e) {

    console.error(e);
    console.log(e.response?.data);

    /**
       * because of the address partial we need to remove the single errors from the error messages and add
       * one error for the whole address
       */
    const addressKeys = ['street', 'streetNumber', 'osm_id', 'zipcode', 'city', 'country'];
    const filteredErrorArray = [];
    let addAddressError = false;

    // Check if the error response has a message indicating validation failure
    if (e.response?.data?.message === 'VALIDATION_FAILED') {

      // Iterate over each error in the response data
      e.response?.data?.errors.forEach((single: ErrorObject) => {

        // If the missing property in the error is not in the addressKeys array
        if (!addressKeys.includes(single.params.missingProperty)) {

          // Add the error to the filtered error array
          filteredErrorArray.push(single);

        } else {

          // Flag that there's an address-related error
          addAddressError = true;

        }

      });

      // After checking all errors, if there's an address-related error
      if (addAddressError) {

        // Add a custom address error to the filtered error array
        filteredErrorArray.push({
          instancePath: '',
          schemaPath  : '#/required',
          keyword     : 'required',
          params      : {
            missingProperty: 'address',
          },
          message: 'must have required property \'address\'',
        });

      }

      // Set the component's errors property to the filtered error array
      //   this.errors = {
      //     message: 'VALIDATION_FAILED',
      //     errors : filteredErrorArray,
      //   };
      emit('errors', {
        message: 'VALIDATION_FAILED',
        errors : filteredErrorArray,
      })

    } else {

      // If the error isn't a validation failure, just set the component's errors to the response data
      //this.errors = e.response?.data;
      emit('errors', e.response?.data)
    }


    //this.state = 'error';
    emit('state', 'error')

  }

}

</script>
<template>
  <section class="lila-contact-module lila-module">

    <section class="intro-container">
      <lila-textblock-partial v-bind="textblock" />

      <lila-description-partial v-if="disabled" type="error">{{$translate('LIST_SOLD_OUT')}}</lila-description-partial>
      <h3 class="limited" v-if="limited && !disabled && !hideFreeSlots">
        <template v-if="!participantsState && !disabled">{{ $translateDiff('LIST_LIMITED_AVAILABILITY', limited) }}</template>
        <template v-if="participantsState && !disabled">{{ $translate('LIST_LIMITED_AVAILABILITY_STATE', [slotsAvailable, limited]) }}</template>
      </h3>
    </section>

    <section v-if="showFeedback" sub :content="feedbackContent">
      <lila-button-partial @click="resetForm" colorScheme="colorScheme1">{{ $translate('back to the form') }}</lila-button-partial>
    </section>

    <lila-content-module v-if="showFeedback" sub :content="feedbackContent" />

    <form @submit="handleForm" v-if="!showFeedback && list">
      <lila-fieldset-partial legend="message">

        <lila-textarea-partial :required="list.mode === 'contact'" :error="errorsObject.message" :maxLength="2500" v-model="model.message">{{$translate('message')}}</lila-textarea-partial>

      </lila-fieldset-partial>

      <lila-fieldset-partial v-if="categories" extendedGap legend="category">
        <lila-textblock-partial v-bind="categoryTextblock" />
        <lila-select-category-partial v-if="list.mode !== 'contact'" v-model="model.category" required :error="errorsObject.category" :variant="variant" :categories="categories" />
        <lila-select-partial v-if="list.mode === 'contact'" :multiple="false" :error="errorsObject.category" required :options="selectCategories" placeholder="select category">{{$translate('category')}}</lila-select-partial>
      </lila-fieldset-partial>

      <lila-fieldset-partial legend="personal">

        <lila-input-partial :error="errorsObject.prename" required v-model="model.prename">
          {{$translate('prename')}}
        </lila-input-partial>

        <lila-input-partial :error="errorsObject.name" required v-model="model.name">
          {{$translate('name')}}
        </lila-input-partial>

      </lila-fieldset-partial>

      <lila-address-partial v-model="addressModel" :error="errorsObject.address" required />

      <lila-fieldset-partial legend="contact">

        <lila-input-partial :error="errorsObject.email" required v-model="model.email">
          {{$translate('email')}}
        </lila-input-partial>

        <lila-input-partial v-model="model.phone">
          {{$translate('phone')}}
        </lila-input-partial>

      </lila-fieldset-partial>

      <lila-fieldset-partial v-if="list" class="agreements">

        <lila-agreement-partial v-for="(single, index) in agreements" :error="single.error" :key="`agreement-${index}`" 
        v-model="single.value" :required="single.required" :predefined="single.predefined" :contentId="single.contentId">{{$translate(single.text)}}</lila-agreement-partial>

      </lila-fieldset-partial>

      <lila-fieldset-partial>
        <lila-description-partial v-if="disabled" type="error">{{$translate('LIST_SOLD_OUT')}}</lila-description-partial>
        <lila-description-partial v-if="mainErrors" type="error">{{$translate(mainErrors)}}</lila-description-partial>
      </lila-fieldset-partial>

      <lila-action-notice-partial :state="state" :translation-pre="translationPre" :errors="errors" @update="updateErrors">
        <lila-button-partial save :disabled="disabled" :callId="props.traceId" colorScheme="colorScheme1" type="submit">
          <template v-if="list.payment === 'required'">{{$translate('order with payment')}}</template>
          <template v-if="list.payment !== 'required' && list.mode === 'contact'">{{$translate('send contactform')}}</template>
          <template v-if="list.payment !== 'required' && list.mode === 'reservation'">{{$translate('send reservation')}}</template>
        </lila-button-partial>
      </lila-action-notice-partial>

    </form>

  </section>
</template>
<style lang="less" scoped>

.lila-contact-module {
  .module;
  .multi(padding, 4);

  display: grid;
  gap: 80px;

  max-width: @moduleWidth_S;

  .intro-container {
    display: grid;
    gap: 20px;
  }

  .agreements {
    display: grid;
    gap: 20px;
  }

}
</style>
