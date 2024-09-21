<template>
    <div class="modalWindow ">
        <div class="flexCenter">
            <div class="section">
                <h1>Удаление пользователя (модально)</h1>
                <userServerResponce @saveUserComplete="saveUserComplete" @cancelSaving="cancelSaving" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, onMounted } from 'vue';
import { useStoreUsers } from '~/stores/users';

import userServerResponce from '~/views/userServerResponce.vue';
import { type User } from '~/types/userType';

export default defineComponent({
    name: 'userDeleteModal',
    props: {
        currentUser: {
            type: Object as () => User,
            required: true
        }
    },
    emits: ['resetCurrentUser', 'deleteUserComplete'],
    components: { userServerResponce },
    setup(props, { emit }) {
        const store = useStoreUsers();
        const deleteUser2 = (userData: User) => {
            const store = useStoreUsers();
            store.userDelete(Number(userData.id));
        }

        const saveUserComplete = () => {
            store.resetFlagServerResponce();
            emit('resetCurrentUser');
        };

        const cancelSaving = () => {
            store.resetFlagServerResponce();
            emit('resetCurrentUser');
        };

        onMounted(() => {
            deleteUser2(props.currentUser);
        });

        return {
            saveUserComplete,
            cancelSaving,
            ...toRefs(props)  
        };
    }
});  
</script>

<style scoped>
.modalWindow {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 2;
    opacity: 1;
}

.userForm {
    width: 800px;
    margin: auto;
    border: 1px solid rgb(199, 198, 198);
    border-radius: 5px;
    padding: 5px 5px;
    color: #2c2e20;
}
</style>