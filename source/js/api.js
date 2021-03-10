const SUCCESS__STATUS = 200;
/**
 * отправляет GET запрос на сервер и обрабатывает данные
 *
 * @param {function} onError - функция, которая выполнится при ошибке получении данных
 * @param {function} onSuccess - функция, которая выполнится при успешном получении данных
 *
 */
const getData = (onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.status === SUCCESS__STATUS) {
        return response.json();
      }else {
        throw new Error('Не удалось получить данные');
      }
    })
    .then((data) => {
      onSuccess(data);
    }).
    catch((error) => {
      onError(error)
    });
}

/**
 * Отправляет данные методом POST
 *
 * @param {object} data - данные, отправляемые на сервер
 * @param {function} onSuccess - функция, которая выполнится при успешной отправке данных
 * @param {function} onError - функция, которая выполнится при ошибке отправки данных
 */
const sendData = (data, onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if( response.ok) {
        onSuccess();
      }else {
        onError();
      }
    })
    .catch(() => {
      onError();
    })
};

export {sendData, getData};
