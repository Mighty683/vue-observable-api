import Vue from 'vue';

export function createObservableAPI(...asyncFuncArray) {
  const state = Vue.observable({
    data: null,
    loading: false,
    error: null,
  });

  const proxyMap = {};

  asyncFuncArray.forEach((asyncFunc) => {
    proxyMap[asyncFunc.name] = new Proxy(asyncFunc, {
      apply(target, thisArg, argumentsList) {
        state.loading = true;
        target.bind(thisArg, ...argumentsList)()
          .then((response) => {
            state.data = response;
            state.error = null;
          })
          .catch((error) => {
            state.error = error;
          })
          .finally(() => {
            state.loading = false;
          });
        return state;
      },
    });
  });

  return proxyMap;
}
