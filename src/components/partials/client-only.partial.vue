<script setup lang="ts">
const props = defineProps < {
  placeholder: string,
  placeholderTag: {
    type: string,
    default: 'div',
  },
}> ();
const { default: defaultSlot = [], placeholder: placeholderSlot } = slots();

if (parent._isMounted) {

  return defaultSlot;

}

parent.$once('hook:mounted', () => {

  parent.$forceUpdate();

});

if (props.placeholderTag && (props.placeholder || placeholderSlot)) {

  return h(
    props.placeholderTag,
    {
      class: ['client-only-placeholder'],
    },
    props.placeholder || placeholderSlot,
  );

}

// Return a placeholder element for each child in the default slot
// Or if no children return a single placeholder
return defaultSlot.length > 0 ? defaultSlot.map(() => h(false)) : h(false);

</script>

