<template>
  <div></div>
</template>

<script>
  import SaccoAPI from '@/api'
  export default {
    data() {
      return {

      }
    },
    methods: {
      fetchMember() {
        SaccoAPI.get('members/'+this.$route.params.memberId)
          .then(response => {

          })
          .catch(error => {

          })
      }
    },
    created() {
      this.fetchMember()
    }
  }
</script>
