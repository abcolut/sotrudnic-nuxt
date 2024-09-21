<template>
    <div class="modalWindow ">
        <div class="flexCenter">
            <div class="section">
                <h1>Редактирование пользователя (модально)</h1>
                <userCard :userData="currentUser" @saveUser="saveUser" @cancelSaving="cancelSaving"
                    @saveUserComplete="saveUserComplete" :key="'component' + componentKey" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { useStoreUsers } from '~/stores/users';
import userCard from '~/views/userCard.vue';
import { type User } from '~/types/userType';

export default defineComponent({
    name: 'userEditModal',
    props: {
        currentUser: {
            type: Object as () => User,
            required: true
        }
    },
    emits: ['resetCurrentUser', 'saveUserComplete'],
    components: { userCard },
    setup(props, { emit }) {
        const flagSendDataToServer = ref(false);
        const userDataNew = ref<User>({} as User);
        const componentKey = ref<Number>(0);
        const store = useStoreUsers();

        const saveUser = (userData: User) => {
            userDataNew.value.fio = userData.fio;
            userDataNew.value.birthday = userData.birthday;
            userDataNew.value.id = userData.id;

            store.resetFlagServerResponce();
            store.userEditComplete({
                fio: userDataNew.value.fio,
                birthday: userDataNew.value.birthday,
                id: Number(userDataNew.value.id)
            });
            flagSendDataToServer.value = true;
        };

        const saveUserComplete = () => {
            componentKey.value = Number(componentKey.value)+1
            store.resetFlagServerResponce();
            emit('resetCurrentUser');
        };

        const cancelSaving = () => {
            store.resetFlagServerResponce();
            emit('resetCurrentUser');
        };

        return {
            flagSendDataToServer,
            userDataNew,
            componentKey,
            saveUser,
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