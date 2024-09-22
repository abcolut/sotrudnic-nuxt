<template>
    <div class="flexCenter">
        <div v-if="serverResponce == ''">
            <p>
                <label>ФИО сотрудника:
                    <br><input v-model="userName" type="text" autocomplete="off" placeholder="Имя сотрудника">
                </label>
            </p>
            <p>
                <label>Дата роджения: {{ birthday }}
                    <br><input v-model="birthday" type="date" autocomplete="off" placeholder="Дата рождения"
                        min="1970-01-01" max="2025-01-01">
                </label>
            </p>

            <p align=center>
                <button @click="saveUser()" :disabled="!(errors.fio && errors.birthday)" class="btn btn-primary">
                    Сохранить
                </button>

                <button @click="cancelSaving()" class="btn btn-info"> Отмена </button>
            </p>
            <p>Вероятность успешной записи на сервер ~30%</p>
        </div>
    </div>
    <userServerResponce />
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRefs, onMounted } from 'vue';
import { type User } from '~/types/userType';
import { useStoreUsers } from '~/stores/users';
import userServerResponce from '~/views/userServerResponce.vue';
import serverResp from '~/types/serverResp';

export default defineComponent({
    name: 'userCard',
    components: { userServerResponce },
    props: {
        userData: {
            type: Object as () => User,
            default: () => ({ fio: '', birthday: '' })
        },
    },
    emits: ['saveUser', 'cancelSaving', 'saveUserComplete'],
    setup(props, { emit }) {
        const store = useStoreUsers();
        const userName = ref(props.userData.fio);
        const birthday2 = props.userData.birthday;
        const birthday = ref('')
        const errors = ref({ fio: false, birthday: false });
        const { flagServerResponce, serverResponce, serverResponceText } = toRefs(store);

        const checkValidation = () => {
            errors.value.fio = userName.value.length >= 2;

            let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
            errors.value.birthday = !(date_regex.test(birthday.value))
        };

        watch(userName, () => {
            checkValidation();
        });

        watch(birthday, () => {
            checkValidation();
        });

        watch(serverResponce, (newVal) => {
            if (newVal == serverResp.sucsess) {
                setTimeout(() => {
                    emit('saveUserComplete');
                }, 1500);
            }
        });

        // const dataLocal = computed(() => {
        //     return new Date(birthday.value).toISOString().slice(0, 10);
        // });

        const initUser = () => {
            store.resetFlagServerResponce();
            userName.value = props.userData.fio;
            const aa = props.userData.birthday;
            birthday.value = new Date(birthday2).toISOString().slice(0, 10)
            checkValidation();
        };

        const saveUser = () => {
            //console.log(birthday.value)
            const ud: User = { fio: userName.value, birthday: new Date(birthday.value) };
            if (props.userData.id !== undefined) {
                ud.id = props.userData.id;
            }
            emit('saveUser', ud);
        };

        const cancelSaving = () => {
            emit('cancelSaving');
        };

        onMounted(() => {
            initUser();
        });

        return {
            userName,
            birthday,
            errors,
            serverResponce,
            serverResponceText,
            birthday2,
            saveUser,
            cancelSaving
        };
    }
});  
</script>
