<template>
  <v-layout row>
    <input type="file"
           v-on:change="uploadProfilePicture($event.target.name, $event.target.files)" accept="image/*" />
  </v-layout>
</template>

<script>
  import cloudinary from "cloudinary";

  cloudinary.config({
    cloud_name: process.env.VUE_APP_CLOUD_CLOUD_NAME,
    api_key: process.env.VUE_APP_CLOUD_API_KEY,
    api_secret: process.env.VUE_APP_CLOUD_API_SECRET
  });

  export default {
    name: `UploadMemberImages`,
    data() {
      return {
        profilePhotoUrl: ``
      };
    },
    methods: {
      uploadProfilePicture(targetName, files) {
        const formData = new FormData()

        if(!files.length) return

        formData.append(targetName, files[0], files[0].name)

        console.log(files[0]);
        cloudinary.uploader.upload(formData, result => {
          console.log(result);
        });
      }
    }
  };
</script>
