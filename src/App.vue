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
import { createObservableAPI } from './helpers/observable.api';
import { callApi } from './helpers/api.mock';

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
      console.log(name);
      this.callApi(name);
    },
  },
  created() {
    this.apiState = this.callApi(this.name);
  },
};

</script>
