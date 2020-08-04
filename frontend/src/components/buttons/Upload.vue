<template>
  <button v-if="!shared_dir" @click="upload" :aria-label="$t('buttons.upload')" :title="$t('buttons.upload')" class="action" id="upload-button">
    <i class="material-icons">file_upload</i>
    <span>{{ $t('buttons.upload') }}</span>
  </button>
</template>

<script>
export default {
  name: 'upload-button',
  computed: {
    shared_dir: function() {
      return this.$route.path == "/files/shared/" || (this.$route.path.startsWith("/files/shared/") && this.$route.path.split("/").filter(item => item !== "").length == 3)
    }
  },
  methods: {
    upload: function () {
      if (typeof(DataTransferItem.prototype.webkitGetAsEntry) !== 'undefined') {
        this.$store.commit('showHover', 'upload')
      } else {
        document.getElementById('upload-input').click();
      }
    }
  }
}
</script>
