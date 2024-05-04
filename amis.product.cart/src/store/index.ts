import { createStore } from 'vuex';
import config from './config';

const store = createStore({
  modules: {
    config,
  },
});

export default store;