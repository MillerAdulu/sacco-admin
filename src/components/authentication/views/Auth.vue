<template>
  <v-container>
    <v-layout>
      <v-flex
        xs12
        d-flex
        justify-center
      >
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>
