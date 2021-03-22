<template>
  <div class="wrap">
    <v-header/>
    <div class="main">
      <div class="sideLeft">
        <v-left/>
      </div>

      <div class="content">
        <router-view/>
        <v-footer/>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from '@/components/Header.vue'
import vLeft from '@/components/SideLeft.vue'
import vFooter from '@/components/Footer.vue'

export default {
  data () {
    return {
    }
  },

  components: {
    vHeader,
    vLeft,
    vFooter
  }
}
</script>
