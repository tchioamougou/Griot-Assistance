import { signOut } from "firebase/auth";
import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import { auth } from "../firebase";
import { retrieveDataWithFilter } from "../firebase/firestore";

const vuexLocalStorage = new VuexPersist({
    key: "vuex", // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    reducer: (state) => ({
        user: state.user,
        language: state.language,
        firebaseUser: state.firebaseUser
    }),
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
});

export default createStore({
    state: {
        user: null,
        language: null,
        firebaseUser: null
    },
    mutations: {
        /** set user language */
        setLanguage(state, language) {
            state.language = language;
        },
        async setUser(state, user) {
            state.firebaseUser = user;
            console.log('user', user);
            const filter = {
                field: "uid",
                operator: "==",
                value: user.uid
            }
            const doc = await (retrieveDataWithFilter('Users', filter, null));
            state.user = doc[0];
        },
        async logout(state) {
            await signOut(auth);
            state.user = undefined;
            state.firebaseUser = undefined
        }
    },
    actions: {
        setLanguage({ commit }, language) {
            commit("setLanguage", language);
        },
        setUser({ commit }, user) {
            commit("setUser", user);
        },
        logout({ commit }) {
            commit('logout')
        }
    },
    plugins: [vuexLocalStorage.plugin],
});
//
