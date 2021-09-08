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
  name: 'signup',
  components: {
    HeaderLogin,
    CardSignup
    
  }
}
</script>


