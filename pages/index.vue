<template>
    <userList />
</template>

<script lang="ts">
import userList from '~/views/userList.vue'
import { defineComponent } from 'vue';

export default defineComponent({
    name:"index",
    components: { userList },
})
</script>