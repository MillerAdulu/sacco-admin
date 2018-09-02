<template>
<v-container>
  <picture-input
      ref="pictureInput"
      width="300" 
      height="300" 
      margin="16" 
      accept="image/jpeg,image/png" 
      size="10" 
      button-class="btn"
      @change="onChange"
      id="passport_photo"
  />
  <button @click="attemptUpload" v-bind:class="{ disabled: !image }">
  Upload
</button>
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
      image: null
    };
  },
  components: {
    PictureInput
  },
  methods: {
    attemptUpload() {
      const fileInput = document.querySelector("#passport_photo");
      let formData = new FormData();
      formData.append(`passport_photo`, fileInput.files[0]);
      formData.append(`member_id`, 3);

      HTTP.post(`members/account/uploadpassportphoto`, formData)
        .then(response => {
          this.$store.commit(`setSnackbar`, {
            msg: `Passport photo added successfullt`,
            type: `success`,
            model: true
          });
        })
        .catch(error => {
          this.$store.commit(`setSnackbar`, {
            msg: `Failed to add passport photo`,
            type: `error`,
            model: true
          });
        });
    },
    onChange(image) {
      if (image) {
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    }
  },
  created() {}
};
</script>

