<template>
  <button v-if="!shared_dir" @click="show" :aria-label="$t('buttons.copy')" :title="$t('buttons.copy')" class="action" id="copy-button">
    <i class="material-icons">content_copy</i>
    <span>{{ $t('buttons.copyFile') }}</span>
  </button>
</template>

<script>
export default {
  name: 'copy-button',
  computed: {
    shared_dir: function() {
      return this.$route.path == "/files/shared/"
    }
  },
  methods: {
    show: function () {
      this.$store.commit('showHover', 'copy')
    }
  }
}
</script>
