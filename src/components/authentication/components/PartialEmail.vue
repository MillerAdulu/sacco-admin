<template>
  <div>
    <v-text-field
      v-model="internalValue"
      autofocus
      class="mb-3"
      label="Email or phone"
      name="email"
    />

    <div class="mt-5 mb-3">Don't have an account? Request for one, it's simple!</div>

    <v-layout align-center justify-space-between>
      <router-link to="/signup">
        <base-link>
          Request for account
        </base-link>
      </router-link>

      <base-btn
        :disabled="!value"
        :loading="isLoading"
        prominent
        @click="$emit('next')"
      >
        Next
      </base-btn>
    </v-layout>
  </div>
</template>

<script>
  import ProxyValue from '@/components/authentication/mixins/proxy-value'
  import { mapState } from 'vuex'

  import BaseBtn from '@/components/authentication/components/BaseBtn'
  import BaseLink from '@/components/authentication/components/BaseLink'

  export default {
    computed: {
      ...mapState(['isLoading'])
    },
    mixins: [ProxyValue],
    components: {
      BaseBtn,
      BaseLink,
    },
    methods: {

    }
  }
</script>
