<template>
  <v-snackbar
      v-model="model"
      :color="snackbar.type"
      :timeout="5000"
      right
  >
    <v-icon
        :dark="snackbar.type !== 'warning'"
        class="mr-2"
        v-text="icon"
    />
    <span
        :class="snackbar.type === 'warning' ? 'black--text' : 'white--text'"
        v-text="snackbar.msg"
    />
  </v-snackbar>
</template>

<script>
  // Utilities
  import {mapState} from 'vuex'

  const ICON_MAP = {
    error: 'error',
    info: 'info',
    success: 'done',
    warning: 'warning'
  }

  export default {
    data: () => ({
      model: mapState(['snackbar']).model,
    }),

    computed: {
      ...mapState(['snackbar']),
      icon () {
        return ICON_MAP[this.snackbar.type] || 'mdi-playlist-check'
      }
    },

    watch: {
      snackbar () {
        this.model = true
      }
    }
  }
</script>
