<template>
  <section>
    <h1>Список сотрудников</h1>
    <div>
      <div class="userCell userId"> ID</div>
      <div class="userCell userFio"><input placeholder="Фильтр (от трех букв)" autocomplete="off" v-model="searchName">
      </div>
      <div class="userCell userBirthday">Дата рожд.</div>
      <div class="userCell userDell pointer"></div>
    </div>

    <div>
      <div v-for="user, i of usersSearchOnePage" class="userList" :key="'a' + i">
        <div @click="currentUserId = Number(user.id)" :class="{ selected: user.id == currentUserId }">
          <div class="userCell userId pointer" @click="currentUser = user">{{ user.id }}</div>
          <div class="userCell userFio pointer" @click="currentUser = user">{{ user.fio }}</div>
          <div class="userCell userBirthday pointer" @click="currentUser = user">{{ user.birthday }}</div>
          <div class="userCell userDell pointer" @click="currentUserDelete = user">Х</div>
          <div class="userCell userDell pointer" @click="editUserInNewWindow(user)">Edit (2)</div>
        </div>
      </div>
    </div>
    <userEditModal :currentUser="currentUser" @resetCurrentUser="resetCurrentUser" v-if="currentUser != null" />
    <userDeleteModal :currentUser="currentUserDelete" @resetCurrentUser="resetCurrentUser"
      @cancelSaving="resetCurrentUser" v-if="currentUserDelete != null" />

    <listPaginator :currentPage="Number(currentPage)" :maxPage="usersSearch.length / Number(usersOnPage)"
      @changePage="changePage" />

  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { useStoreUsers } from '~/stores/users';
import listPaginator from '~/views/listPaginator.vue';
import userEditModal from '~/views/userEditModal.vue';
import userDeleteModal from '~/views/userDeleteModal.vue';
import { type User } from '~/types/userType';

export default defineComponent({
  name: 'userList',
  components: { listPaginator, userEditModal, userDeleteModal },
  setup() {
    const store = useStoreUsers();
    const currentUserId = ref<Number>(-1); // текущая запись на странице
    const currentPage = ref<Number>(0); // страница пагинатора
    const usersOnPage = ref<Number>(10); // количество сотрудников на странице
    const searchName = ref<String>(''); //строка поиска
    const currentUser = ref<User | null>(null); //Объект редактирования
    const currentUserDelete = ref<User | null>(null); //Объект удаления

    const usersSearch = computed(() => {
      if (searchName.value.length < 3) {
        return store.users;
      } else {
        currentPage.value = 0; // Сброс страницы при новом поиске  
        return store.users.filter((user) =>
          user.fio.toLowerCase().includes(searchName.value.toLowerCase().trim())
        );
      }
    });

    const usersSearchOnePage = computed(() => {
      return usersSearch.value.filter((_, index) => {
        const start = Number(currentPage.value) * Number(usersOnPage.value);
        const end = (Number(currentPage.value) + 1) * Number(usersOnPage.value);
        return index >= start && index < end;
      });
    });

    watch(searchName, () => {
      currentPage.value = 0; // Сброс страницы при изменении поиска  
    });

    const changePage = (nom: number) => {
      currentPage.value = nom;
    };

    const editUserInNewWindow = (data: User) => {
      const router = useRouter();
      router.push({ path: '/userEdit/' + data.id });
    };

    const resetCurrentUser = () => {
      currentUser.value = null;
      currentUserDelete.value = null;
    };

    return {
      currentPage,
      usersOnPage,
      searchName,
      currentUser,
      currentUserDelete,
      usersSearch,
      usersSearchOnePage,
      currentUserId,
      changePage,
      editUserInNewWindow,
      resetCurrentUser,
    };
  },
});  
</script>

<style scoped>
.selected {
  color: green;
}

.userList {
  padding-top: 5px;
  border-bottom: 1px solid rgb(196, 195, 195);
}

.userCell {
  display: table-cell;
  padding-left: 15px;
}

.userCell:first-child {
  padding-left: 0px;
}

.userId {
  width: 30px;
}

.userFio {
  width: 300px;
}

.userBirthday {
  width: 100px;
}

.userDell {
  text-align: right;
}

.btn {
  margin: 5px;
}


@media screen and (max-width: 800px) {}
</style>