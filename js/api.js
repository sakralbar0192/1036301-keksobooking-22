/**
 * отправляет GET запрос на сервер и обрабатывает данные
 *
 * @param {function} onError - функция, которая выполнится при ошибке получении данных
 * @param {function} onError - функция, которая выполнится при успешном получении данных
 *
 */
const getData = (onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }else {
        onError(2000);
      }
    })
    .then((data) => {
      onSuccess(data);
    }).
    catch(() => {
      onError(2000);
    });
}
/**
 * Отправляет данные методом POST
 *
 * @param {object} data - данные, отправляемые на сервер
 * @param {function} onSuccess - функция, которая выполнится при успешной отправке данных
 * @param {function} onSuccess - функция, которая выполнится при ошибке отправки данных
 */
const sendData = (data, onSuccess, onError) => {
  fetch('https://jsonplaceholder.typicode.com/posts/',
    {
      method: 'POST',
      headers:
      {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    },
  )
    .then((response) => {
      if( response.ok) {
        onSuccess();
      }else{
        onError();
      }
    })
    .catch(() => {
      onError();
    })
};

export {sendData, getData};
