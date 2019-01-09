<template>
  <v-container align-center>
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      v-on:vdropzone-sending="attemptUpload"
    />
  </v-container>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  name: `UploadProfilePicture`,
  data() {
    return {
      image: null,
      btnLoading: false,
      dropzoneOptions: {
        url: `${
          process.env.VUE_APP_API_URL
        }/members/account/uploadpassportphoto`,
        maxFilesize: 0.5,
        paramName: "passport_photo",
        maxFiles: 1,
        acceptedFiles: "image/*",
        headers: { Authorization: `Bearer ${localStorage.token}` }
      }
    };
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  methods: {
    attemptUpload(file, xhr, formData) {
      formData.append(`member_id`, this.$store.getters.newMemberRecordKey);
      this.$store.commit("setStepperStatus", false);
    }
  }
};
</script>

