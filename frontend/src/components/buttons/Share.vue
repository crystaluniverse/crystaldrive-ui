<template>
  <button v-if="!shared_dir" @click="show" :aria-label="$t('buttons.share')" :title="$t('buttons.share')" class="action">
    <i class="material-icons">share</i>
    <span>{{ $t('buttons.share') }}</span>
  </button>
</template>

<script>
export default {
  name: 'share-button',
  computed: {
    shared_dir: function() {
      return this.$route.path == "/files/shared/" || (this.$route.path.startsWith("/files/shared/") && this.$route.path.split("/").filter(item => item !== "").length == 3)
    }
  },
  methods: {
    show () {
      this.$store.commit('showHover', 'share')
    }
  }
}
</script>
