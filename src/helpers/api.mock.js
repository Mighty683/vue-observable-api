let changeCallCount = 0;
let nameState = 'Tomek';

export function changeApi(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (changeCallCount % 10) {
        nameState = name;
        resolve({
          name: nameState,
        });
      } else {
        reject(new Error('Change failed'));
      }
      changeCallCount += 1;
    }, 1000);
  });
}


export function getApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: nameState,
      });
    }, 1000);
  });
}
