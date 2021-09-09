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
  name: 'Login',
  components: {
    HeaderLogin,
    CardLogin
  }
}
</script>


