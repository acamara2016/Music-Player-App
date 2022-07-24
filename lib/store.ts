import { createStore, action } from "easy-peasy";

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  volume: 10.0,
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  changeVolume: action((state: any, payload) => {
    state.volume = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
});
