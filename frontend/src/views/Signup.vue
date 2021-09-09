<template>
    <div class="signup">

    <HeaderLogin />
    <CardSignup />
    </div>
</template>

<script>
import HeaderLogin from '@/components/HeaderLogin.vue';
import CardSignup from '@/components/CardSignup.vue';

export default {
  name: 'Signup',
  components: {
    HeaderLogin,
    CardSignup
    
  }
}
</script>




