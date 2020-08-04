<template>
  <button v-if="!shared_dir" @click="show" :aria-label="$t('buttons.rename')" :title="$t('buttons.rename')" class="action" id="rename-button">
    <i class="material-icons">mode_edit</i>
    <span>{{ $t('buttons.rename') }}</span>
  </button>
</template>

<script>
export default {
  name: 'rename-button',
  computed: {
    shared_dir: function() {
      return this.$route.path == "/files/shared/" || (this.$route.path.startsWith("/files/shared/") && this.$route.path.split("/").filter(item => item !== "").length == 3)
    }
  },
  methods: {
    show: function () {
      this.$store.commit('showHover', 'rename')
    }
  }
}
</script>
