<template>
  <div></div>
</template>

<script>
import bugsnagClient from "@/helpers/errorreporting";
import SaccoAPI from "@/api";

export default {
  data() {
    return {};
  },
  methods: {
    fetchMember() {
      SaccoAPI.get("members/" + this.$route.params.memberId)
        .then(() => {})
        .catch(error => {
          bugsnagClient.notify(error);
        });
    }
  },
  created() {
    this.fetchMember();
  }
};
</script>
