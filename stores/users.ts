import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type User } from '~/types/userType';
import serverResp from '~/types/serverResp';

//let arr: Date[] = [];
//arr.push(new Date(2030, 11, 31));

function timeoutPromise(interval : number) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("done");
    }, interval);
  });
}

export const useStoreUsers = defineStore("storeUsers", () => {
  const flagServerResponce = ref<Boolean>(false);
  const serverResponce = ref<string>('') // '', 'savingData', 'ok', 'описание ошибки'
  //const serverError = ref<string>('');
  const serverResponceText = ref<string>(''); // конкретный ответ сервера 
  //const severResponcesStatuses2 = {reset:'', sendingData:'sendingData', sucsess:'ok', error:'error'}
  //const severResponcesStatuses = serverResponcesStats
  const users = ref<Array<User>>([
    { id: 1, fio: 'Горин Иван Сергеевич', birthday: new Date('2001-01-01')},
    { id: 2, fio: 'Торин Сергей Иванович', birthday: new Date('2012-12-02')},
    { id: 3, fio: 'Митин Олег Васильевич', birthday: new Date('2001-09-03')},
    { id: 4, fio: 'Рыков Самуил Игоревич', birthday: new Date('2011-04-04')},
    { id: 5, fio: 'Моряков Игорь', birthday: new Date('2001-05-05')},
    { id: 6, fio: 'Обирн Вячеслав Игоревич', birthday: new Date('2001-01-06')},
    { id: 7, fio: 'Борин Боис', birthday: new Date('2002-02-07')},
    { id: 8, fio: 'Стёпин Михаил', birthday: new Date('2001-03-08')},
    { id: 9, fio: 'Новиков Олег Игориевич', birthday: new Date('2001-04-09')},
    { id: 10, fio: 'Тушков Владимир', birthday: new Date('2001-05-11')},
    { id: 11, fio: 'Иванов Сергей Сергеевич', birthday: new Date('2001-01-11')},
    { id: 12, fio: 'Петров Михаил Сергеевич', birthday: new Date('2002-02-21')},
    { id: 13, fio: 'Сидоров Виталий', birthday: new Date('2001-03-31')},
    { id: 14, fio: 'Мясников Олег', birthday: new Date('2001-04-01')},
    { id: 15, fio: 'Шпанин Владимир', birthday: new Date('2001-05-01')},
    { id: 16, fio: 'Орешко Степан Михайлович', birthday: new Date('2001-01-01')},
    { id: 17, fio: 'Филлин Виталий', birthday: new Date('2002-02-71')},
    { id: 18, fio: 'Колесник Александр', birthday: new Date('2011-03-12')},
    { id: 19, fio: 'Кузнецов Михаил', birthday: new Date('2001-04-13')},
    { id: 20, fio: 'Боярин', birthday: new Date('2001-05-15')},
    { id: 21, fio: 'Иванов Олег Сергеевич', birthday: new Date('2001-01-11')},
    { id: 22, fio: 'Петров Владимир', birthday: new Date('2002-02-01')},
    { id: 23, fio: 'Сидоров Олег', birthday: new Date('2001-03-31')},
    { id: 24, fio: 'Мясников Михаил Иванович', birthday: new Date('2001-04-11')},
    { id: 25, fio: 'Шпанин Александр', birthday: new Date('2001-05-01')},
    { id: 26, fio: 'Орешко Михаил', birthday: new Date('2001-01-01')},
    { id: 27, fio: 'Филлин Олег', birthday: new Date('2002-02-01')},
    { id: 28, fio: 'Колесник Олег', birthday: new Date('2001-03-12')},
    { id: 29, fio: 'Кузнецов', birthday: new Date('2001-04-13')},
    { id: 30, fio: 'Ким Александр', birthday: new Date('2001-05-15')},
    { id: 31, fio: 'Грымов Михаил', birthday: new Date('2001-01-11')},
    { id: 32, fio: 'Пашин', birthday: new Date('2002-02-21')},
    { id: 33, fio: 'Мойша Александр', birthday: new Date('2001-03-31')},
    { id: 34, fio: 'Тихонов Владимир', birthday: new Date('2001-04-11')},
    { id: 35, fio: 'Боярский', birthday: new Date('2001-05-51')},
    { id: 36, fio: 'Агутин', birthday: new Date('2001-01-61')},
    { id: 37, fio: 'Ын', birthday: new Date('2002-02-71')},
    { id: 38, fio: 'Сон Виталий', birthday: new Date('2001-03-12')},
    { id: 39, fio: 'Лисов Михаил', birthday: new Date('2001-04-13')},
    { id: 40, fio: 'Михалков Александр', birthday: new Date('2001-05-15')},
    { id: 41, fio: 'Крылов Сергей', birthday: new Date('2001-01-11')},
    { id: 42, fio: 'Машков Александр', birthday: new Date('2002-02-21')},
    { id: 43, fio: 'Майков Виталий', birthday: new Date('2001-03-31')},
    { id: 44, fio: 'Рыков Михаил', birthday: new Date('2001-04-41')},
    { id: 45, fio: 'Лошаков Иван', birthday: new Date('2001-05-11')},
    { id: 46, fio: 'Огурцов Олег', birthday: new Date('2001-01-11')},
    { id: 47, fio: 'Моряков', birthday: new Date('2002-02-71')},
    { id: 48, fio: 'Соков Виталий', birthday: new Date('2001-03-12')},
    { id: 49, fio: 'Первый Михаил', birthday: new Date('2001-04-13')},
    { id: 50, fio: 'Второй Сергей', birthday: new Date('2001-05-15')},
    { id: 51, fio: 'Третий', birthday: new Date('2001-01-11')},
    { id: 52, fio: 'Четвертый', birthday: new Date('2002-02-21')},
    { id: 53, fio: 'Пятый', birthday: new Date('2001-03-31')},
    { id: 54, fio: 'Шестой Александр', birthday: new Date('2001-04-41')},
    { id: 55, fio: 'Седьмой Владимир', birthday: new Date('2001-05-01')},
    { id: 56, fio: 'Восмой Михаил', birthday: new Date('2001-01-01')},
    { id: 57, fio: 'Девятый', birthday: new Date('2002-02-71')},
    { id: 58, fio: 'Десятый', birthday: new Date('2001-03-12')},
    { id: 59, fio: 'Одиннадцатый', birthday: new Date('2001-04-13')},
    { id: 60, fio: 'Море Михаил', birthday: new Date('2001-05-15')},
    { id: 61, fio: 'Горе Александр', birthday: new Date('2001-01-11')},
    { id: 62, fio: 'Река Виталий', birthday: new Date('2002-02-01')},
    { id: 63, fio: 'Озеро Александр', birthday: new Date('2001-03-01')},
    { id: 64, fio: 'Камень Олег', birthday: new Date('2001-04-41')},
    { id: 65, fio: 'Трава', birthday: new Date('2001-05-51')},
    { id: 66, fio: 'Осень Михаил', birthday: new Date('2001-01-61')},
    { id: 67, fio: 'Весна Александр', birthday: new Date('2002-02-01')},
    { id: 68, fio: 'Лето', birthday: new Date('2001-03-12')},
    { id: 69, fio: 'Солнце Александр', birthday: new Date('2001-04-11')},
    { id: 70, fio: 'Тушков Александр', birthday: new Date('2001-05-11')},
    { id: 71, fio: 'Иванов Сергей Сергеевич', birthday: new Date('2001-01-11')},
    { id: 72, fio: 'Петров Сергей', birthday: new Date('2002-02-21')},
    { id: 73, fio: 'Сидоров Сергей', birthday: new Date('2001-03-31')},
    { id: 74, fio: 'Мясников Олег', birthday: new Date('2001-04-41')},
    { id: 75, fio: 'Шпанин Александр', birthday: new Date('2001-05-11')},
    { id: 76, fio: 'Орешко Александр', birthday: new Date('2001-01-61')},
    { id: 77, fio: 'Филонин Иван', birthday: new Date('2002-02-71')},
    { id: 78, fio: 'Колесник Виталий', birthday: new Date('2001-03-12')},
    { id: 79, fio: 'Кузнецов Михаил', birthday: new Date('2001-04-13')},
    { id: 80, fio: 'Боярин Сергей', birthday: new Date('2001-05-15')},
    { id: 81, fio: 'Иванов Олег Сергеевич', birthday: new Date('2001-01-11')},
    { id: 82, fio: 'Петров', birthday: new Date('2002-02-21')},
    { id: 83, fio: 'Сидоров Александр', birthday: new Date('2001-03-31')},
    { id: 84, fio: 'Мясников Владимир', birthday: new Date('2001-04-41')},
    { id: 85, fio: 'Шпанин Олег', birthday: new Date('2001-05-51')},
    { id: 86, fio: 'Орешко Сергей', birthday: new Date('2001-01-61')},
    { id: 87, fio: 'Филлин Иван', birthday: new Date('2002-02-71')},
    { id: 88, fio: 'Колесник Александр', birthday: new Date('2001-03-12')},
    { id: 89, fio: 'Кузнецов Александр', birthday: new Date('2001-04-11')},
    { id: 90, fio: 'Ким Владимир', birthday: new Date('2001-05-15')},
    { id: 91, fio: 'Грымов Александр', birthday: new Date('2001-01-11')},
    { id: 92, fio: 'Пашин Владимир', birthday: new Date('2002-02-01')},
    { id: 93, fio: 'Мойша Сергей', birthday: new Date('2001-03-31')},
    { id: 94, fio: 'Тихонов Михаил', birthday: new Date('2001-04-01')},
    { id: 95, fio: 'Боярский', birthday: new Date('2001-05-01')},
    { id: 96, fio: 'Агутин Сергей', birthday: new Date('2001-01-01')},
    { id: 97, fio: 'Ын Иван', birthday: new Date('2002-02-01')},
    { id: 98, fio: 'Сон Александр', birthday: new Date('2001-03-02')},
    { id: 99, fio: 'Лисов Виталий', birthday: new Date('2001-04-03')},
    { id: 100, fio: 'Михалков Олег', birthday: new Date('2001-05-05')},
    { id: 101, fio: 'Красников Олег Александрович', birthday: new Date('2011-05-05')},
    { id: 102, fio: 'Арон Шарон Иванович', birthday: new Date('2001-05-05')}
  ]);

  const userDelete = async (id: number) => {
    await timeoutPromise(500)

    if (Math.random() > 0.3) {
      serverResponce.value = serverResp.sucsess
      users.value = users.value.filter(user => user.id !== id);
    } else {
      serverResponce.value = serverResp.error
      serverResponceText.value = 'Ошибка при удалении пользователя'
    }
  };

  const userEditComplete = async (userData: { id: number; fio: string; birthday: Date }) => {
    const data1 = userData;
    serverResponce.value = serverResp.sendingData

    await timeoutPromise(500)
    //setTimeout(() => {
    if (Math.random() > 0.3) {
      serverResponce.value = serverResp.sucsess

      const userIndex = users.value.findIndex(user => user.id === data1.id);
      if (userIndex !== -1) {
        users.value[userIndex].fio = data1.fio;
        users.value[userIndex].birthday = new Date(data1.birthday);
      }
    } else {
      serverResponce.value = serverResp.error
      serverResponceText.value = 'Ошибка при обновлении пользователя'
    }
    //}, 1000);
  };

  const userAdd = async (userData: { fio: string; birthday: Date }) => {
    serverResponce.value = serverResp.sendingData

    await timeoutPromise(500)
    //setTimeout(() => {
    if (Math.random() > 0.3) {
      serverResponce.value = serverResp.sucsess;
      const newId: Number = users.value.reduce((maxId, user) => Math.max(maxId, Number(user.id)), 0) + 1;
      if (typeof newId == "number") {
        let user
        users.value.push({ id: newId, fio: userData.fio, birthday: new Date(userData.birthday) });
      }
    } else {
      serverResponce.value = serverResp.error;
      serverResponceText.value = 'Ошибка при добавлении пользователя'
    }
    //}, 1000);
  };

  const resetFlagServerResponce = () => {
    serverResponce.value = serverResp.reset;
    serverResponceText.value = ''
  };

  const clearServerResponce = () => {
    serverResponce.value = serverResp.reset;
    serverResponceText.value = ''
  };

  return {
    flagServerResponce,
    //serverError,
    serverResponce,
    serverResponceText,
    //severResponcesStatuses,
    users,
    userDelete,
    userEditComplete,
    userAdd,
    resetFlagServerResponce,
    clearServerResponce
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreUsers, import.meta.hot));
} 