<script setup lang="ts">

import ModelsClass, { type ModelDeclaration } from '@/libs/Models.class';
import type Textblock from '@/interfaces/textblock.interface';
import type Address from '@/models/Address.model'; 
import { type ErrorsObject, type ParsedError } from '../../libs/ActionNotice';
import { prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { computed, onBeforeMount, onServerPrefetch, ref, watch} from 'vue';
import type {ListCategoryExtended} from '@/interfaces/ListCategoryExtended.interface';
import useMainStore from '@/stores/main.store';
import { type Agreement, type BasicData, type Contact, type ContactAgreement, type Content, 
  type ErrorObject, type GenericData, type GenericDataDistributed, type List, type ListPartiticpantsDetails, type ResponseError,
  type Structure} from '@lilaquadrat/interfaces';
import StudioSDK, { type SDKResponse } from '@lilaquadrat/sdk';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import type { AxiosError } from 'axios';
import { useTraceable } from '@/plugins/traceable';
import useUserStore from '@/stores/user.store';
import type SelectOption from '@/interfaces/selectOption.interface';
import { auth } from '@/plugins/auth';
import type CategoryStructure from '@/interfaces/CategoryStructure.interface';

defineOptions({ inheritAttrs: false });

const {traceable} = useTraceable();
const mainStore = useMainStore();
const userStore = useUserStore();
const {setCustomer} = useUserStore();
const props = defineProps<ModuleBaseProps & {
    textblock?: Textblock
    categoryTextblock?: Textblock
    genericData: GenericDataDistributed
    editor?: {modes: string[]}
    categories?: {title?: string, description?: string, required: string[], genericData?: GenericData}[]
    agreements?: Record<string, Agreement & { value: boolean, error: boolean }> | {}
}>();
const state = ref<string>();
const traceId = ref<string>();
const model = ref<Contact>();
const addressModel = ref<Address>();
const structuresModelDeclaration = ref<ModelDeclaration<unknown>>();
const structuresModel = ref<Record<string, string | number | boolean | string[] | undefined>>({});
const categoryStructure = ref<CategoryStructure[]>([]);
const errors = ref<ResponseError>();
const errorsObject = ref<ErrorsObject>();
const translationPre = '';
const agreementsExtended = ref<Record<string, Agreement & { value: boolean, error: boolean }>>({});
const categoriesExtended = ref<ListCategoryExtended[]>();
const participantsState = ref<ListPartiticpantsDetails>();
const showFeedback = ref<boolean>(false);
const emit = defineEmits<{
    (e: string): void;
    (e: string, i:boolean): void;
    (e: string, data: any): void; //Argument of type '{}' is not assignable to parameter of type 'boolean'.
    (e: 'event', data: 'success' | 'reset'): void; //Argument of type '{}' is not assignable to parameter of type 'boolean'.
}>();
const mode = computed(() => list.value?.mode);
const list = computed<BasicData<List> | undefined>(() => {

  if(props.genericData?.data) {

    const lists = props.genericData.lists;

    if(!lists) return undefined;

    const useList = lists[0];

    if(!useList) return undefined;

    return props.genericData.data[useList.toString()] as BasicData<List>

  }

  return undefined;

});

watch(() => props.editor?.modes, () => updateFeedbackState(), {immediate: true, deep: true});

watch(() => props.categories, () => updateStructuresAndModels());

function updateStructuresAndModels () {

  if (!props.categories?.length) {
    return undefined;
  }

  const localCategoriesWithData: CategoryStructure[] = [];
  const localModelDeclaration: ModelDeclaration<Record<string, string>> = {};

  props.categories.forEach((category) => {

    const singleCategory: CategoryStructure = {
      title      : category.title,
      description: category.description,
      structures : []
    };

    /**
    * get the data from genericData and add required from category.required
    */
    category.genericData?.structures.forEach((singleStructure) => {

      const structureWithRequired = props.genericData.data[singleStructure.toString()] as BasicData<Structure & {required: boolean}>;

      if(!structureWithRequired) return;

      structureWithRequired.required = category.required?.includes(singleStructure.toString());

      singleCategory.structures.push(structureWithRequired);

      localModelDeclaration[structureWithRequired.id] = {type: structureWithRequired.type};

    });

    localCategoriesWithData.push(singleCategory);

  });

  structuresModelDeclaration.value = localModelDeclaration;

  categoryStructure.value = localCategoriesWithData;

}

/**
 * fills the categoriesExtended with the categories
 * 
 * if participantState exists the categories get extendend
 */
function updateCategories () {

  if(!list.value) return

  // only show categories if there is more than one and the user has a choice
  if (list.value?.categories?.length > 1) {

    const categories = list.value.categories as ListCategoryExtended[];

    if (participantsState.value) {

      categories.forEach((single: ListCategoryExtended) => {
        const stateCategory = participantsState.value?.categories?.find((singleState) => singleState.category === single.id);

        if (stateCategory) {
     
          single.used = stateCategory.used;

          if(single.amount) {
            
            single.available = (single.amount || 0) - single.used;
            single.percentUsed = (single.used / (single.amount || 0)) * 100;
            single.percentAvailable = 100 - (single.used / (single.amount || 0)) * 100;

          }

        }

      });

    }

    categoriesExtended.value = categories;

  } else if(list.value.mode !== 'contact') {
    
    categoriesExtended.value = list.value.categories;

  } else {

    categoriesExtended.value = undefined;

  }

}

function updateFeedbackState () {

  console.log('updateFeedbackState', state.value, props.editor?.modes?.includes('feedback'))

  if(state.value === 'success' || !!props.editor?.modes?.includes('feedback')) {

    showFeedback.value = true;

  } else {

    showFeedback.value = false;

  }

}

/**
 * if more than one category exists returns an array for selection
 */
const selectCategories = computed<SelectOption[] | null>(() => {

  if(!list.value) return null;

  if(list.value?.categories?.length > 1) {
    
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

    const editor = props.genericData.editor[0];

    if(!editor) return undefined;

    return props.genericData.data[editor.toString()] as BasicData<Content>;
  }

  return undefined
  
});
const hideFreeSlots = computed(() => props.variant?.includes('hide-free-slots'))
/**
 * decides if the feedback or the form will be shown. feedback will be show if:
 ** state is sucess
 ** editor modes inlcudes feedback
 */
const feedbackContent = computed(() => {

  if(feedback.value) {
    return prepareContent(feedback.value);
  }

  return undefined;

});
const limited = computed(() => list.value?.participants?.max || null);
const disabled = computed(() => {

  if(participantsState.value && list.value?.participants?.max) {
    return participantsState.value.used >= list.value?.participants?.max
  }

  return false

});
/**
 * errors that are not bound to a specific input element
 ** LIST_CANNOT_JOIN customer is probably blocked
 ** LIST_UNIQUE_CUSTOMER_CONFIRMED cannot join this list more than once
 ** LIST_NOT_FOUND list is missing
 ** LIST_NO_SPOT_AVAILABLE list is full
 */
const mainErrors = computed(() => {

  const validErrors = ['EMAIL_INVALID', 'LIST_CANNOT_JOIN', 'LIST_UNIQUE_CUSTOMER_CONFIRMED', 'LIST_NOT_FOUND', 'LIST_NO_SPOT_AVAILABLE']

  if(errors.value && validErrors.includes(errors.value.message)) {
    return `${errors.value.message}_${list.value?.mode}`;
  }

  return null;

}); 
const slotsAvailable = computed(() => (list.value?.participants?.max || 0) - (participantsState.value?.used || 0))

onBeforeMount(() => {
  
  model.value = ModelsClass.add<Contact>({}, 'contact');
  addressModel.value = ModelsClass.add({}, 'address');

  updateAgreements();
  getparticipantsState();
  updateStructuresAndModels();

  structuresModel.value = ModelsClass.add({}, 'structure', structuresModelDeclaration.value);
  
}) 

onServerPrefetch(() => {
  model.value = ModelsClass.add<Contact>({}, 'contact');
  addressModel.value = ModelsClass.add({}, 'address');
  
  updateAgreements();
  updateStructuresAndModels();

  structuresModel.value = ModelsClass.add({}, 'structure', structuresModelDeclaration.value);
})

function resetForm () {

  state.value = '';

  model.value = ModelsClass.add({}, 'contact');
  addressModel.value = ModelsClass.add({}, 'address');
  errorsObject.value = {};
  emit('event', 'reset');

  updateFeedbackState()
   
}

function updateErrors (newErrorsObject?: ErrorsObject) {

  errorsObject.value = newErrorsObject
  updateAgreements();

}

/**
 * adds errors to agreements if given
 */
function updateAgreements () {
  const agreements = {} as Record<string, Agreement & { value: boolean, error: boolean }>;
  let values: string[];

  if(!list.value) return;

  list.value?.agreements.forEach((single) => {

    agreements[single.contentId] = {
      ...single,
      value: agreementsExtended.value[single.contentId]?.value || false,
      error: false
    };

    if(errorsObject.value?.agreements) {

      const agreementsErrors = errorsObject.value.agreements as ParsedError;

      values = agreementsErrors?.translatedPath?.values as string[];

      if(!values) return;
  
      if(values[1]) {
  
        if(values[1].includes(single.contentId)) {
  
          agreements[single.contentId].error = true;
  
        }
  
      }
      
    }

  });

  agreementsExtended.value = agreements
    
}

const getparticipantsState = async () => {

  if(!list.value?._id) {
    return;
  }

  const sdk = new StudioSDK(mainStore.apiConfig);

  try {
   
    const stateData = await sdk.public.lists.state(list.value?._id.toString());

    if (stateData.data) {

      participantsState.value = stateData.data;
      
    }

    updateCategories();

  } catch (e) {

    const error = e as AxiosError<ResponseError>;

    console.error(error);
    updateCategories();

  }
};
const handleForm = async (event: Event) => {
  event.preventDefault();

  if(!list.value?._id) return
  
  const address = ModelsClass.save(addressModel.value as Address, 'address');
  const structure = ModelsClass.save<Record<string, string>>(structuresModel.value as Record<string, string>, 'structure', structuresModelDeclaration.value);

  console.log(structure);

  const customer = ModelsClass.save<Contact>({...model.value, ...address}, 'contact');
  const agreements: ContactAgreement[] = [];
  let category: string;

  customer.type = 'person';

  const message = customer.message;

  delete customer.message;

  category = customer.category as string;

  delete customer.category;

  list.value?.agreements.forEach((single: Agreement) => {

    if (agreementsExtended.value[single.contentId].value) {

      agreements.push({ id: single.contentId, version: 0 });

    }

  });

  if (list.value?.categories?.length === 1 && !category) {

    category = list.value.categories[0].id;

  }

  try {
    
    const sdk = new StudioSDK(mainStore.apiConfig);
    const call = auth.isAuth.value 
      ? sdk.members.lists.join(list.value._id.toString(), message, category, agreements, structure, {parentId: props.parentId, uuid: props.uuid})
      : sdk.public.lists.join(list.value._id.toString(), customer, message, category, agreements, structure, {parentId: props.parentId, uuid: props.uuid});
    const customerResponse = await traceable<SDKResponse<string|{_id: string, id: string}>>(call, traceId);

    if(!auth.isAuth.value || !userStore.isFullUser) {
      setCustomer(customerResponse.data as {_id: string, id?: string});
    }

    state.value = 'success';
    StudioSDK.flushCache('lists', 'state');
    emit('event', 'success');

    updateFeedbackState();

    if(!userStore.isFullUser) {

      mainStore.disabledLockUpdate = true;
      await traceable(sdk.members.me.connect(userStore.customer?._id!), traceId);
      await userStore.updateLock();

    }

  } catch (e) {

    const error = e as AxiosError<ResponseError>;

    console.error(e);

    /**
         * because of the address partial we need to remove the single errors from the error messages and add
         * one error for the whole address
         */
    const addressKeys = ['street', 'streetNumber', 'osm_id', 'zipcode', 'city', 'country'];
    const filteredErrorArray = [];
    let addAddressError = false;

    // Check if the error response has a message indicating validation failure
    if (error.response?.data?.message === 'VALIDATION_FAILED') {

      // Iterate over each error in the response data
      error.response?.data?.errors?.forEach((single: ErrorObject) => {

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
      errors.value = {
        message: 'VALIDATION_FAILED',
        errors : filteredErrorArray,
      };
      emit('errors', {
        message: 'VALIDATION_FAILED',
        errors : filteredErrorArray,
      })

    } else {

      // If the error isn't a validation failure, just set the component's errors to the response data
      //this.errors = e.response?.data;
      errors.value = error.response?.data;
    }

    state.value = 'error';

  }

}

</script>
<template>
  <section class="lila-contact-module lila-module" :class="[mode]">

    <section class="intro-container">
      <lila-textblock-partial v-bind="textblock" />

      <lila-description-partial v-if="disabled" type="error">{{$translate('LIST_SOLD_OUT')}}</lila-description-partial>
      <h3 class="limited" v-if="limited && !disabled && !hideFreeSlots">
        <template v-if="!participantsState && !disabled">{{ $translateWithDiff('LIST_LIMITED_AVAILABILITY', limited) }}</template>
        <template v-if="participantsState && !disabled">{{ $translate('LIST_LIMITED_AVAILABILITY_STATE', [slotsAvailable.toString(), limited.toString()]) }}</template>
      </h3>
    </section>

    <section v-if="showFeedback" :content="feedbackContent">
      <lila-button-partial @click="resetForm" colorScheme="colorScheme1">{{ $translate('back to the form') }}</lila-button-partial>
    </section>

    <lila-content-module v-if="showFeedback" sub :content="feedbackContent" />

    <form v-if="!showFeedback && list && model">
      <lila-fieldset-partial legend="message">

        <lila-textarea-partial :required="list.mode === 'contact'" :error="errorsObject?.message" :maxLength="2500" v-model="model.message">{{$translate('message')}}</lila-textarea-partial>

      </lila-fieldset-partial>

      <lila-fieldset-partial v-if="categoriesExtended" extendedGap legend="category">
        <lila-textblock-partial v-bind="categoryTextblock" />
        <lila-select-category-partial v-if="list.mode !== 'contact'" v-model="model.category" required :error="errorsObject?.category" :variant="variant" :categories="categoriesExtended" />
        <lila-select-partial v-if="list.mode === 'contact' && selectCategories" v-model="model.category" :multiple="false" :error="errorsObject?.category" required :options="selectCategories" placeholder="select category">{{$translate('category')}}</lila-select-partial>
      </lila-fieldset-partial>

      <template v-if="!userStore.isFullUser">

        <lila-fieldset-partial legend="personal"> 
  
          <lila-input-partial :error="errorsObject?.prename" required v-model="model.prename">
            {{$translate('prename')}}
          </lila-input-partial>
  
          <lila-input-partial :error="errorsObject?.name" required v-model="model.name">
            {{$translate('name')}}
          </lila-input-partial>
  
        </lila-fieldset-partial>
  
        <lila-address-partial v-if="addressModel" :fullAddressRequired="list.participants?.addressRequired" v-model="addressModel" :error="errorsObject?.address" required />
  
        <lila-fieldset-partial legend="contact">
  
          <lila-input-partial :error="errorsObject?.email" required v-model="model.email">
            {{$translate('email')}}
          </lila-input-partial>
  
          <lila-input-partial v-model="model.phone">
            {{$translate('phone')}}
          </lila-input-partial>
  
        </lila-fieldset-partial>

      </template>

      <template v-if="userStore.isFullUser">

        <lila-fieldset-partial legend="personal"> 
  
          <h3>Eingeloggt als {{ userStore.userData?.prename }} {{ userStore.userData?.name }}</h3>

        </lila-fieldset-partial>

      </template>

      <lila-fieldset-partial v-for="(single) in categoryStructure" :key="single.title" :legend="single.title">

        <lila-description-partial v-if="single.description">
        {{$translate(single.description)}}
      </lila-description-partial>

        <template v-for="(structure) in single.structures">
          <lila-input-partial v-if="structure.type === 'string'" :required="structure.required" v-model="structuresModel[structure.id]" :key="structure.id">
            {{ structure.question }}
          </lila-input-partial>
          <lila-input-partial v-if="structure.type === 'number'" type="number" :required="structure.required" v-model="structuresModel[structure.id]" :key="structure.id">
            {{ structure.question }}
          </lila-input-partial>
          <lila-textarea-partial v-if="structure.type === 'text'" :max-length="structure.max" :required="structure.required" v-model="structuresModel[structure.id]" :key="structure.id">
            {{ structure.question }}
          </lila-textarea-partial>
          <lila-checkbox-partial v-if="structure.type === 'boolean'" :name="structure.id" :required="structure.required" v-model="structuresModel[structure.id]" :key="structure.id">
            {{ structure.question }}
          </lila-checkbox-partial>
          <lila-select-partial v-if="structure.type === 'select'" :placeholder="structure.question" :options="structure.options" :multiple="structure.multiple === true" :required="structure.required" v-model="structuresModel[structure.id]" :key="structure.id">
            {{ structure.question }}
          </lila-select-partial>

        </template>

      </lila-fieldset-partial>

      <lila-fieldset-partial v-if="list" class="agreements">

        <lila-agreement-partial v-for="(single, index) in agreementsExtended" :error="single.error" :key="`agreement-${index}`" 
        v-model="single.value" :required="single.required" :predefined="single.predefined" :contentId="single.contentId">{{$translate(single.text)}}</lila-agreement-partial>

      </lila-fieldset-partial>

      <lila-fieldset-partial v-if="disabled || mainErrors">
        <lila-description-partial v-if="disabled" type="error">{{$translate('LIST_SOLD_OUT')}}</lila-description-partial>
        <lila-description-partial v-if="mainErrors" type="error">{{$translate(mainErrors)}}</lila-description-partial>
      </lila-fieldset-partial>

      <lila-action-notice-partial :state="state" :translation-pre="translationPre" :errors="errors" @update="updateErrors">
        <lila-button-partial save :disabled="disabled" :callId="traceId" colorScheme="colorScheme1" type="submit" @click="handleForm">
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
