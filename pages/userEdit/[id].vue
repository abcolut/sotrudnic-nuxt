<template>
  <h1>Редактирование сотрудника ({{ userId }})</h1>{{ user }}
  <div v-if=" user !== undefined">
    <userCard :userData="user" @saveUser="saveUser" @cancelSaving="cancelSaving" />
</div>
<div v-else>
  <h1>Карточки сотрудника не существует</h1>
</div>
</template>

<script lang="ts">  
import { defineComponent, ref, computed, onMounted } from 'vue';  
import userCard from '~/views/userCard.vue';  
import { useStoreUsers } from '~/stores/users';  
import { type User } from '~/types/userType';  
import { useRoute, useRouter } from 'vue-router';  

export default defineComponent({  
  name: 'userEditId',  
  components: { userCard },  
  setup() {  
    const store = useStoreUsers();  
    const route = useRoute();  
    const router = useRouter();  
    
    const userId = ref<Number>(parseInt(route.params.id.toString()));  
    const flagSendDataToServer = ref<Boolean>(false);  
    const userDataNew = ref<User>({} as User);  

    const user = computed(() => {  
      return store.users.find(x => x.id === userId.value);  
    });  

    const initUser = () => {  
      store.resetFlagServerResponce();  
      flagSendDataToServer.value = false;  
    };  

    const saveUser = (userData: User) => {  
      //userDataNew.value = { ...userData };
      userDataNew.value.fio = userData.fio;  
      userDataNew.value.birthday = userData.birthday;  
      userDataNew.value.id = Number(userData.id);  
      flagSendDataToServer.value = true;  
      store.resetFlagServerResponce();  
      store.userEditComplete({ id: userDataNew.value.id, fio: userDataNew.value.fio, birthday: new Date(userDataNew.value.birthday) });  
    };  

    const cancelSaving = () => {  
      router.push({ path: '/' });  
    };  

    const saveUserComplete = () => {  
      router.push({ path: '/' });  
    };  

    onMounted(() => {  
      initUser();  
    });  

    return {  
      userId,  
      flagSendDataToServer,  
      userDataNew,  
      user,  
      initUser,  
      saveUser,  
      cancelSaving,  
      saveUserComplete,  
    };  
  },  
});  
</script>