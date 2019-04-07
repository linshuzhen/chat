<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  beforeCreate () {
    sessionStorage.setItem('hashMap', JSON.stringify({}))
  },
  mounted () {
  }
}
</script>
<style>
</style>
