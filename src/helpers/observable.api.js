import Vue from 'vue';

export function createObservableAPI(api) {
  const state = Vue.observable({
    data: null,
    loading: false,
    error: null,
  });

  return new Proxy(api, {
    apply(target, thisArg, argumentsList) {
      state.loading = true;
      target.bind(thisArg, ...argumentsList)().then((response) => {
        state.data = response;
        state.error = null;
      }).catch((error) => {
        state.error = error;
      })
        .finally(() => {
          state.loading = false;
        });
      return state;
    },
  });
}
