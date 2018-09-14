<template>
  <div></div>
</template>

<script>

  

  export default {
    data() {
      return {

      }
    },
    methods: {
      fetchMember() {
        this.$http.get('members/'+this.$route.params.memberId)
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
