<template>
  <div id="app">
    <div>
      <label>NAME</label>
      <input
        v-if="apiState.data"
        :value="apiState.data.name"
        @input="onInput($event.target.value)"
      />
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
import { getApi, changeApi } from './helpers/api.mock';

export default {
  name: 'app',

  data() {
    return {
      name: '',
      apiState: null,
    };
  },
  methods: {
    ...createObservableAPI(
      getApi,
      changeApi,
    ),

    onInput(name) {
      if (!this.apiState.loading) {
        this.changeApi(name);
      }
    },
  },
  created() {
    this.apiState = this.getApi(this.name);
  },
};

</script>
