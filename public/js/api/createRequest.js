/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  let url = options.url;

  if (options.method === 'GET') {
    if (options.data) {
      url += '?';
      Object.entries(options.data).forEach(([key, value]) => {
        if (url[url.length - 1] === '?') {
          url += `${key}=${value}`;
        } else {
          url += `&${key}=${value}`;
        }
      });
    }

    try {
      xhr.open(options.method, url);
      xhr.send();
    }
    catch (err) {
      options.callback(err);
    }

  } else {
    formData = new FormData();

    if (options.data) {
      Object.entries(options.data).forEach(([key, value]) => {
        if (options.method === 'DELETE' && key === 'account_id') {
          key = 'id';
        }
        formData.append(key, value);
      });
    }

    try {
      xhr.open(options.method, url);
      xhr.send(formData);
    }
    catch (err) {
      options.callback(err);
    }
  }

  xhr.addEventListener('load', function () {
    if (this.response && this.response.success) {
      options.callback(null, this.response);
    } else {
      if (options.method === 'DELETE') {
        options.callback(this.response);
      } else {
        options.callback(this.response.error);
      }
    }
  });
};
