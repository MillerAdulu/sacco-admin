<template>
  <v-btn
    v-on="$listeners"
    v-bind="$attrs"
    :small="!prominent"
    color="primary"
    class="v-btn--base"
    depressed
  >
    <slot />
  </v-btn>
</template>

<script>
  export default {
    inheritAttrs: false,

    props: {
      prominent: Boolean
    }
  }
</script>


<style>
  .v-btn--base {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 0 0;
    text-transform: capitalize;
  }
</style>
