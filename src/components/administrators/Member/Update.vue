<template>
  <div></div>
</template>

<script>

  import HTTP from '../../../api'

  export default {
    data() {
      return {

      }
    },
    methods: {
      fetchMember() {
        HTTP.get('members/'+this.$route.params.memberId)
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
