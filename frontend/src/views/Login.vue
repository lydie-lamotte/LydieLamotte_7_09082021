<template>
    <div class = 'login'>

    <HeaderLogin />  
    <CardLogin />
    </div>    
</template>

<script>
import HeaderLogin from '@/components/HeaderLogin.vue';
import CardLogin from '@/components/CardLogin.vue';

export default {
  name: 'login',
  components: {
    HeaderLogin,
    CardLogin
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
