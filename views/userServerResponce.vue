<template>
    <section class="modalWindow flexCenter" v-if="serverResponce != ''">
        <div>
            <h3 v-if="serverResponce == severResponcesStatuses.sendingData">Отправляю данные на сервер</h3>

            <div v-if="serverResponce == severResponcesStatuses.sucsess" class="green">
                <h3>Операция выполнена</h3>
                <p align="center">Через секунду окно закроется</p>
            </div>

            <div v-if="serverResponce == severResponcesStatuses.error" class="brown">
                <h3> Произошла ошибка записи данных на сервер<br>Пожалуйста, повторите попытку записи</h3>
                <p align=center>{{ serverResponceText }}</p>
                <p align="center"><button @click="cancelSendingDataToServer()" class="btn btn-primary">Все ясно </button></p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, watch, toRefs, onMounted } from 'vue';
import { useStoreUsers } from '~/stores/users';
import serverResp from '~/types/serverResp';

export default defineComponent({
    name: 'UserServerResponse',
    emits: ['saveUser', 'cancelSaving', 'saveUserComplete', 'clearServerResponce'],
    setup(props, { emit }) {
        const store = useStoreUsers();
        const severResponcesStatuses = serverResp
        const { serverResponce, serverResponceText } = toRefs(store); 

        watch(serverResponce, (newVal) => {
            if (newVal == severResponcesStatuses.sucsess) {
                setTimeout(() => {
                    store.clearServerResponce()         
                    emit('saveUserComplete');
                }, 1500);
            }
        });

        const cancelSendingDataToServer = () => {   
            store.clearServerResponce()         
            emit('cancelSaving');
        }

        onMounted(() => {
            store.clearServerResponce()
        });

        return {
            ...toRefs(props),  
            serverResponce,
            serverResponceText,
            severResponcesStatuses,
            cancelSendingDataToServer
        };
    }
});  
</script>

<style>
.modalWindow3 {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 2;
    opacity: 1;
}
</style>
