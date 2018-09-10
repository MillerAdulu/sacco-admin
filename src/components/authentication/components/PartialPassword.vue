<template>
  <div>
    <v-text-field
      v-model="internalValue"
      class="mb-3"
      label="Password"
      name="password"
      type="password"
    />

    <div class="text-xs-left">
      <v-layout align-center justify-space-between>
        <!-- <v-btn
          color="primary"
          class="v-btn--auth"
          flat
          small
        >
          Forgot password
        </v-btn> -->

        <v-btn
          :disabled="!value"
          :loading="isLoading"
          class="text-capitalize ma-0"
          color="primary"
          depressed
          @click="$emit('next')"
        >
          Next
        </v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script>
  import ProxyValue from '@/components/authentication/mixins/proxy-value'

  import { mapState } from 'vuex'

  export default {
    mixins: [ProxyValue],

    computed: {
      ...mapState(['isLoading'])
    }
  }
</script>
