<template>
    <div class="home">

        <NavBar />
        <CreatePost />
        <!--<Posts /> -->
    </div>    
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CreatePost from '@/components/CreatePost.vue';
//import Posts from '@/components/Posts.vue';

export default {
    name: 'Home',
    components: {
        NavBar,
        CreatePost,      
        //Posts
    }
}
</script>
