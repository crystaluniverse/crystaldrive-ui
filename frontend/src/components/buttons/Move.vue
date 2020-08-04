<template>
  <button v-if="!shared_dir" @click="show" :aria-label="$t('buttons.move')" :title="$t('buttons.move')" class="action" id="move-button">
    <i class="material-icons">forward</i>
    <span>{{ $t('buttons.moveFile') }}</span>
  </button>
</template>

<script>
export default {
  name: 'move-button',
  computed: {
    shared_dir: function() {
      return this.$route.path == "/files/shared/" || (this.$route.path.startsWith("/files/shared/") && this.$route.path.split("/").filter(item => item !== "").length == 3)
    }
  },
  methods: {
    show: function () {
      this.$store.commit('showHover', 'move')
    }
  }
}
</script>
