<template>
  <div id="app">
    <div>
      <label>NAME</label>
      <input v-model="name" />
    </div>
    <div>
      <span v-if="apiState && apiState.loading">Loading</span>
    </div>
    <div>
      <span v-if="apiState && apiState.error">Error</span>
    </div>
    <div>
      <span v-if="apiState && apiState.data">{{ apiState.data }}</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

function createObservableAPI(api) {
  const state = Vue.observable({
    data: null,
    loading: false,
    error: null,
  });

  return new Proxy(api, {
    apply(target, thisArg, argumentsList) {
      state.loading = true;
      target(argumentsList).call(thisArg).then((response) => {
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

let callCount = 0;
function callApi(name) {
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

export default {
  name: 'app',

  data() {
    return {
      name: '',
      apiState: null,
    };
  },
  methods: {
    callApi: createObservableAPI(callApi),
  },

  watch: {
    name(name) {
      this.callApi(name);
    },
  },
  created() {
    this.apiState = this.callApi(this.name);
  },
};

</script>
