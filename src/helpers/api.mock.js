let callCount = 0;

export function callApi(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (callCount % 2) {
        resolve({
          name,
        });
      } else {
        reject(new Error(callCount));
      }
      callCount += 1;
    }, 1000);
  });
}
