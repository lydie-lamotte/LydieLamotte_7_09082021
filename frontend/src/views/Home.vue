<template>
    <div class="home">

        <NavBar />
        <CreatePost />
    </div>    
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CreatePost from '@/components/CreatePost.vue';


export default {
    name: 'home',
    components: {
        NavBar,
        CreatePost, 
    
    }
}
</script>
