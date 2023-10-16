<script setup lang="ts">
import {reactive, ref} from "vue";
import {FileUpload, uploadFile} from "./uploadFile";

  const state = reactive<{
    fileToUpload?: File,
    fileUpload?: FileUpload
  }>({})

  const form = ref<HTMLFormElement | null>(null)

  function inputChanged(e: Event) {
    const input = e.target as HTMLInputElement | undefined
    if ( input && input.files && input.files.length > 0 ) {
      state.fileToUpload = input.files[0]
    }
  }

  function handleFileUpload(e: Event) {
    e.preventDefault()
    if ( state.fileToUpload ) {
      uploadFile(state.fileToUpload)
          .then(res => {
            state.fileUpload = res
            state.fileToUpload = undefined
            form.value?.reset()
          })
    }
  }
</script>

<template>
  <form ref="form" @submit="handleFileUpload">
    <input type="file" @input="inputChanged"/>
    <br />
    <br />
    <button v-if="state.fileToUpload" type="submit">Upload file ⬆️</button>
  </form>

  <div v-if="state.fileUpload">
    <hr>
    File-ID: {{state.fileUpload?.fileId}}
    <br />
    File-Path: <a :href="state.fileUpload?.filePath" target="_blank">{{state.fileUpload?.filePath}}</a>
  </div>
</template>