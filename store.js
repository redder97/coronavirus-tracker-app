import {createStore, action} from 'easy-peasy'

const store = createStore({
    virusGeoData: {
      item: [],
      add: action((state, payload) => {
        state.items.push(payload)
      }),
      addAll : action((state, payload) => {
          state.items.addAll(payload)
      })
    }
  });


  export default store;