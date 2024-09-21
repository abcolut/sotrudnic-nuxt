<template>
    <h1>Добавление сотрудника</h1>

    <userCard :userData="{ fio: fioPreset, birthday: birthdayPreset }" @saveUser="saveUser" @cancelSaving="cancelSaving"
        @saveUserComplete="saveUserComplete"  :key="'component' + componentKey" />        

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStoreUsers } from '~/stores/users';
import userCard from '~/views/userCard.vue';
//import userCardServerResponce from '~/views/userCardServerResponce';
import { type User } from '~/types/userType';

export default defineComponent({
    name: 'userAdd',
    components: { userCard, },
    setup() {
        const store = useStoreUsers();
        const { serverResponce, serverResponceText } = toRefs(store);   
        const userDataNew = ref<User>({ fio: '', birthday: '' } as User);
        const fioPreset = ref<string>('');
        const birthdayPreset = ref<string>('2001-01-01');
        const componentKey = ref<Number>(0);
        //const flagSendDataToServer = ref(false);

        const initUser = () => {
            store.resetFlagServerResponce();
            fioPreset.value = ''
            birthdayPreset.value = '2001-01-01'
            componentKey.value = Number(componentKey.value) +1;
        };

        const saveUser = (userData: User) => {
            userDataNew.value.fio = userData.fio;
            userDataNew.value.birthday = userData.birthday;
            store.userAdd({ fio: userDataNew.value.fio, birthday: userDataNew.value.birthday });
        };

        const cancelSaving = () => {
            const router = useRouter();
            router.back();
        };

        const saveUserComplete = () => {
            initUser();
        };

        onMounted(() => {
            initUser();
        });

        return {
            userDataNew,
            birthdayPreset,
            fioPreset,
            componentKey,
            serverResponce,
            serverResponceText,
            saveUser,
            cancelSaving,
            saveUserComplete,
            //flagServerResponce: store.flagServerResponce, // доступ к состоянию из Pinia  
        };
    },
});  
</script>
