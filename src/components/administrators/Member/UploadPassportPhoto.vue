<template>
<v-container align-center>
  <v-layout row align-center>
    <v-flex xs12 align-center>

  <picture-input
      ref="pictureInput"
      width="300" 
      height="300"
      accept="image/jpeg,image/png" 
      size="10" 
      button-class="btn"
      @change="onChange"
      id="passport_photo"/>

    </v-flex>
  </v-layout>
  <v-layout row align-center>
    <v-flex xs12 align-center>
<v-btn color="success" :loading="btnLoading" @click="attemptUpload" v-bind:class="{ disabled: !image }">Upload</v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import PictureInput from "vue-picture-input";
import queryString from "querystring";
import HTTP from "../../../api";

export default {
  name: `UploadProfilePicture`,
  data() {
    return {
      image: null,
      btnLoading: false
    };
  },
  components: {
    PictureInput
  },
  methods: {
    attemptUpload() {
      this.startLoading()

      const fileInput = document.querySelector("#passport_photo");
      let formData = new FormData();
      formData.append(`passport_photo`, fileInput.files[0]);
      formData.append(`member_id`, this.$store.getters.newMemberRecordKey);

      HTTP.post(`members/account/uploadpassportphoto`, formData)
        .then(response => {
          this.$store.commit(`setSnackbar`, {
            msg: `Passport photo added successfullt`,
            type: `success`,
            model: true
          });
          this.stopLoading()
          this.$store.commit("setStepperStatus", false);
        })
        .catch(error => {
          this.$store.commit(`setSnackbar`, {
            msg: `Failed to add passport photo`,
            type: `error`,
            model: true
          });

          this.stopLoading()
        });
    },
    onChange(image) {
      if (image) {
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    startLoading() {
      this.btnLoading = true;
    },
    stopLoading() {
      this.btnLoading = false;
    }
  },
  created() {}
};
</script>

