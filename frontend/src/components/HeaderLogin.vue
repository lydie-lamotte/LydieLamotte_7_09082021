<template>
  <div class= "login">
    <img id="logo" alt= "groupomania logo" src= "../assets/logoLogin.png">  
    <h1>Partagez en toute simplicité et restez en contact avec vos collègues!</h1>
  </div>
</template>

<script>
export default {
  name: 'HeaderLogin',
 
}
</script>

<style scoped>
#logo {
  width: 500px;
}
h1 {
  font-size: 1.5em;
  
}
@media screen and (max-width: 550px) {
  #logo {
    width: 100%;
  }
}
</style>
