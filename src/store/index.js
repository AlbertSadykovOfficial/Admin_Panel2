import stateProxy from './brain'

let state = { 
    state: {
        persons: [],
        positions: [],
        groups: []
    },

    mutations: {
        setPersons (state, payload) {
            state.persons = payload
        },
        setGroups (state, payload) {
            state.groups = payload
        },
        setComments (state, payload) {
            payload.map(item => {
                if (
                        state.persons[item.personId] != undefined 
                        && 'comments' in state.persons[item.personId]
                    )
                    state.persons[item.personId].comments.push(item)
                else
                    state.persons[item.personId]['comments'] = [item]
            })
        },
        setPositions (state, payload) {
            state.positions = payload
        }

    },

    actions: {
        async fetchPersons (commit, api) {
            const persons = await api.getPersons()
            commit('setPersons', await persons.json())
        },
        async fetchComments (commit, api) {
            const comments = await api.getComments()
            commit('setComments', await comments.json())
        },
        async fetchGroups (commit, api) {
            await api.getGroups()
            .then((response)=> { 
                commit('setGroups', response)
            })
        },
        async setPositions (commit, payload) {
            commit('setPositions', payload)
        }
    },

    getters: {
        persons (state) {
            return state.persons
        },
        groups (state) {
            return state.groups
        },
        positions (state) {
            return state.positions
        }
    }
}

export default new Proxy(state, stateProxy)