<script setup lang="ts">

import ModelsClass from '@/libs/Models.class';
import type Textblock from '@/interfaces/textblock.interface';
import type Contact from '@/models/Contact.model';
import type Address from '@/models/Address.model'; 
import { type ErrorsObject } from '../../libs/ActionNotice';
import { prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { computed, onBeforeMount, ref} from 'vue';
import type {ListCategoryExtended} from '@/interfaces/ListCategoryExtended.interface';
import useMainStore from '@/stores/main.store';
import { type Agreement, type BasicData, type Content, type GenericData, type List, type ListPartiticpantsDetails} from '@lilaquadrat/interfaces';
import StudioSDK from '@lilaquadrat/sdk';

defineOptions({ inheritAttrs: false });

const mainStore = useMainStore();
const props = defineProps<{
    textblock: Textblock;
    categoryTextblock: Textblock;
    genericData: GenericData;
    editor: {modes: string[]},
    state: string,
    variant: string,
    errors: null,
    errorsobject: ErrorsObject
    agreements: Record<string, Agreement & { value: boolean, error: boolean }> | {};
}>();
const model = ref<Contact>();
const addressModel = ref<Address>();
// let errors = null;
let errorsObject: ErrorsObject = {};
const translationPre = '';
const agreementsExtended = ref<Record<string, Agreement & { value: boolean, error: boolean }>>({});
const categoriesExtended = ref();
const participantsState = ref<ListPartiticpantsDetails>();
const emit = defineEmits<{
    (e: string, i:boolean): void;
    (e: string, data: any): void; //Argument of type '{}' is not assignable to parameter of type 'boolean'.
}>();
const list = computed<BasicData<List>>(() => props.genericData.data[props.genericData.lists[0]] as BasicData<List>);


function updateCategories () {

  console.info('update categories', list.value, participantsState);

  // only show categories if there is more than one and the user has a choice
  if (list.value?.categories.length > 1) {

    const categories = list.value.categories as ListCategoryExtended[];

    if (participantsState.value) {

      categories.forEach((single: ListCategoryExtended) => {
        const stateCategory = participantsState.value?.categories?.find((singleState) => singleState.category === single.id);

        console.log(single, stateCategory);

        if (stateCategory) {
     
          console.log(stateCategory.used, stateCategory.category);
          single.used = stateCategory.used;
          single.available = (single.amount || 0) - single.used;
          single.percentUsed = (single.used / (single.amount || 0)) * 100;
          single.percentAvailable = 100 - (single.used / (single.amount || 0)) * 100;

        }
      });

    }

    categoriesExtended.value = categories;


  }

  categoriesExtended.value = list.value.categories;

}

const selectCategories = computed(() => {

  if(list.value?.categories.length > 1) {
    
    return list.value.categories.map((single) => ({
      value      : single.id,
      text       : single.name,
      description: single.description,
      disabled   : single.disabled,
    }));
  }

  return null;

})
const feedback = computed<BasicData<Content>|undefined>(() => {

  if(props.genericData?.editor && props.genericData?.data && Array.isArray(props.genericData.editor)){
    return props.genericData.data[props.genericData.editor[0]] as BasicData<Content>;
  }

  return undefined
  
});
const hideFreeSlots = computed(() => props.variant.includes('hide-free-slots'))
const showFeedback = computed(() => props.state && (props.state === 'success' || props.editor?.modes?.includes('feedback')));
const feedbackContent = computed(() => {

  if(feedback.value) {
    return prepareContent(feedback.value);
  }

  return {}

});
const limited = computed(() => list.value?.participants?.max || null);
const disabled = computed(() => {

  if(participantsState.value && list.value?.participants?.max) {
    return participantsState.value.used >= list.value?.participants?.max
  }

  return false

})
const mainErrors = computed(() => {
  const validErrors = ['LIST_CANNOT_JOIN', 'LIST_UNIQUE_CUSTOMER_CONFIRMED', 'LIST_NOT_FOUND', 'LIST_NO_SPOT_AVAILABLE']

  if(props.errors && validErrors.includes(props.errors)) {
    return `${(props.errors as { message?:string}).message}`;
  }

  return null;
}); 
const slotsAvailable = computed(() => (list.value?.participants?.max || 0) - (participantsState.value?.used || 0))


onBeforeMount(() => {
  
  model.value = ModelsClass.add({}, 'contact');
  addressModel.value = ModelsClass.add({}, 'address');

  updateAgreements();
  // updateCategories();
  getparticipantsState();
}) 

function resetForm () {
//    props.state = '';
//    props.model = ModelsClass.add({}, 'contact');
//    props.addressModel = ModelsClass.add({}, 'address');
//    props.errors = null;
//    props.errorsObject = {};
  emit('state', '')
  model.value = ModelsClass.add({}, 'contact');
  addressModel.value = ModelsClass.add({}, 'address');
  errorsObject = {};
  emit('errors', null)
   
}

function updateErrors (errorsObject: ErrorsObject) {

  updateAgreements();
  emit('errors', errorsObject);

}

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function changeAgreement (event: MouseEvent, agreement: Agreement & { value: boolean, error: boolean }): void {
//   // const agreement = agreements[index];
//   const target = event.target as HTMLInputElement;

//   agreement.value = target.checked;
// }

function updateAgreements () {
  const agreements = {} as Record<string, Agreement & { value: boolean, error: boolean }>;


  list.value?.agreements.forEach((single) => {

    agreements[single.contentId] = {
      ...single,
      value: agreementsExtended.value[single.contentId]?.value || false,
      error: false
    };

    const values = errorsObject.agreements?.translatedPath?.values;


    if(values && values[1]) {

      if(values[1].includes(single.contentId)) {

        agreements[single.contentId].error = true;

      }

    }
  });

  agreementsExtended.value = agreements
  emit('agreements', agreements);
    
}

const getparticipantsState = async () => {
  console.log('store.state:', mainStore.apiConfig);

  if(!list.value?._id) {
    return;
  }

  const sdk = new StudioSDK('design', mainStore.apiConfig);

  try {
   
    const stateData = await sdk.public.lists.state(list.value?._id.toString());

    if (stateData.data) {


      participantsState.value = stateData.data;
      updateCategories();


    }

  } catch (e) {

    console.error(e);
    console.log(e.response?.data);
    updateCategories();


  }
};
const handleForm = async (event: Event) => {
  console.log('handle form');
  event.preventDefault();
 

  const address = ModelsClass.save(addressModel, 'address');
  const customer = ModelsClass.save({...model.value, ...address.value}, 'contact');
  const agreements = [];
  let category: string;

  customer.type = 'person';

  const message = customer.message;

  delete customer.message;

  category = customer.category;

  delete customer.category;

  list.value?.agreements.forEach((single: Agreement) => {

    if (agreementsExtended.value[single.contentId].value) {

      agreements.push({ id: single.contentId, version: 0 });

    }

  });

  if (list.value?.categories.length === 1 && !category) {

    category = list.value.categories[0].id;

  }


  // try {
  //   const sdk = new StudioSDK('design', store.state.api);
  //   const call = sdk.public.lists.join(props.list?._id.toString(), customer, message, category, agreements);


  //   await props.$traceable(call);

  //   //this.state = 'success';
  //   emit('state', 'success')
    

  // } catch (e) {

  //   console.error(e);
  //   console.log(e.response?.data);

  //   /**
  //      * because of the address partial we need to remove the single errors from the error messages and add
  //      * one error for the whole address
  //      */
  //   const addressKeys = ['street', 'streetNumber', 'osm_id', 'zipcode', 'city', 'country'];
  //   const filteredErrorArray = [];
  //   let addAddressError = false;

  //   // Check if the error response has a message indicating validation failure
  //   if (e.response?.data?.message === 'VALIDATION_FAILED') {

  //     // Iterate over each error in the response data
  //     e.response?.data?.errors.forEach((single: ErrorObject) => {

  //       // If the missing property in the error is not in the addressKeys array
  //       if (!addressKeys.includes(single.params.missingProperty)) {

  //         // Add the error to the filtered error array
  //         filteredErrorArray.push(single);

  //       } else {

  //         // Flag that there's an address-related error
  //         addAddressError = true;

  //       }

  //     });

  //     // After checking all errors, if there's an address-related error
  //     if (addAddressError) {

  //       // Add a custom address error to the filtered error array
  //       filteredErrorArray.push({
  //         instancePath: '',
  //         schemaPath  : '#/required',
  //         keyword     : 'required',
  //         params      : {
  //           missingProperty: 'address',
  //         },
  //         message: 'must have required property \'address\'',
  //       });

  //     }

  //     // Set the component's errors property to the filtered error array
  //     //   this.errors = {
  //     //     message: 'VALIDATION_FAILED',
  //     //     errors : filteredErrorArray,
  //     //   };
  //     emit('errors', {
  //       message: 'VALIDATION_FAILED',
  //       errors : filteredErrorArray,
  //     })

  //   } else {

  //     // If the error isn't a validation failure, just set the component's errors to the response data
  //     //this.errors = e.response?.data;
  //     emit('errors', e.response?.data)
  //   }


  //   //this.state = 'error';
  //   emit('state', 'error')

  // }

}

</script>
<template>
  <section class="lila-contact-module lila-module">

    <section class="intro-container">
      <lila-textblock-partial v-bind="textblock" />

      <lila-description-partial v-if="disabled" type="error">{{$translate('LIST_SOLD_OUT')}}</lila-description-partial>
      <h3 class="limited" v-if="limited && !disabled && !hideFreeSlots">
        <template v-if="!participantsState && !disabled">{{ $translateWithDiff('LIST_LIMITED_AVAILABILITY', limited) }}</template>
        <template v-if="participantsState && !disabled">{{ $translate('LIST_LIMITED_AVAILABILITY_STATE', [slotsAvailable.toString(), limited.toString()]) }}</template>
      </h3>
    </section>

    <section v-if="showFeedback" sub :content="feedbackContent">
      <lila-button-partial @click="resetForm" colorScheme="colorScheme1">{{ $translate('back to the form') }}</lila-button-partial>
    </section>

    <lila-content-module v-if="showFeedback" sub :content="feedbackContent" />

    <form v-if="!showFeedback && list && model">
      <lila-fieldset-partial legend="message">

        <lila-textarea-partial :required="list.mode === 'contact'" :error="errorsObject.message" :maxLength="2500" v-model="model.message">{{$translate('message')}}</lila-textarea-partial>

      </lila-fieldset-partial>

      <lila-fieldset-partial v-if="categoriesExtended" extendedGap legend="category">
        <lila-textblock-partial v-bind="categoryTextblock" />
        <lila-select-category-partial v-if="list.mode !== 'contact'" v-model="model.category" required :error="errorsObject.category" :variant="variant" :categories="categoriesExtended" />
        <lila-select-partial v-if="list.mode === 'contact'" v-model="model.category" :multiple="false" :error="errorsObject.category" required :options="selectCategories" placeholder="select category">{{$translate('category')}}</lila-select-partial>
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

        <lila-agreement-partial v-for="(single, index) in agreementsExtended" :error="single.error" :key="`agreement-${index}`" 
        v-model="single.value" :required="single.required" :predefined="single.predefined" :contentId="single.contentId">{{$translate(single.text)}}</lila-agreement-partial>

      </lila-fieldset-partial>

      <lila-fieldset-partial>
        <lila-description-partial v-if="disabled" type="error">{{$translate('LIST_SOLD_OUT')}}</lila-description-partial>
        <lila-description-partial v-if="mainErrors" type="error">{{$translate(mainErrors)}}</lila-description-partial>
      </lila-fieldset-partial>

      <lila-action-notice-partial :state="state" :translation-pre="translationPre" :errors="errors" @update="updateErrors">
        <lila-button-partial save :disabled="disabled" :callId="props.traceId" colorScheme="colorScheme1" type="submit" @click="handleForm">
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
