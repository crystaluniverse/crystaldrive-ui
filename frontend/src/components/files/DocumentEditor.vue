<template>
    <div id="document">
</div>
</template>

<script>
import { mapState } from 'vuex'
import { baseURL } from '@/utils/constants'
import crypto from 'crypto'

export default {
  name: 'document',
  components: {
  },
  props: ['fileData', 'user'],
  data: function () {
    return {
    }
  },
  computed: {
    ...mapState(['jwt']),
    documentLocation () {
      return `${baseURL}/api/raw${this.fileData.path}?auth=${this.jwt}`
    },
  },
  mounted () {
    this.renderDocument()
  },
  methods: {
    renderDocument () {
      console.log(`${window.location.origin}${this.documentLocation}`)
      console.log(`${window.location.origin}/docserver/callback?auth=${this.jwt}&filename=${this.fileData.name}`)

      const config = {
            "document": {
                "fileType": this.fileData.extension.replace('.', ''),
                "key": this.fileData.key.replace(new RegExp('[^A-Za-z0-9]+', 'g'), '').slice(0, 19),
                "title": this.fileData.name,
                "url": `${window.location.origin}${this.documentLocation}`
            },
            "editorConfig": {
              "callbackUrl": `${window.location.origin}/docserver/callback?auth=${this.jwt}&filename=${this.fileData.name}`,
              "user": {
                "id": crypto.randomBytes(8).toString('hex'),
                "name": "name"
              }
            }
        }
        new window.DocsAPI.DocEditor("document", config)
        console.log(config)
    }
  }
}
</script>