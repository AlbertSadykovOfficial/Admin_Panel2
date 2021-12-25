<template>
    <div id="app">
        <app-header :statement="statement"></app-header>
        <div class="search-bar">
            <input type="text" v-model:lazy="filter">
        </div>
        <section>
            <app-position 
                v-if="['position'].includes(statement.getPage())" 
                v-for="group in filteredPositions" 
                :group="group">
            </app-position>
            <app-group 
                v-if="['group'].includes(statement.getPage())" 
                v-for="group in filteredGroups" 
                :name="group.name"        
                :persons="getPersons(group)">
            </app-group>
        </section>

        <ui-popup v-if="modal.show" :modal="modal"></ui-popup>
    </div>
</template>
<script>
import ApiService from './api/service.js';
import Statement from './addons/statement.js'
import Modal from './addons/modal.js'

import Fabric from './addons/fabric.js'
const name_filter = new Fabric('name', (item, query) => item.includes(query))
const email_filter = new Fabric('email', (item, query) => item.includes(query))

import AppHeader from './components/Addons/Header.vue';
import UiPopup from './components/Addons/Popup.vue';

import AppGroup from './components/PageGroup.vue';
import AppPosition from './components/PagePosition.vue';

export default {
    name: 'App',
    components: { AppHeader, AppPosition, AppGroup, UiPopup },
    data: () => ({
        statement: new Statement(['group', 'position'], 'group'),
        modal: new Modal(),
        filter: '',
        state: {}
    }),
    created () {
        const api = new ApiService()
        
        this.state = this.$store.state

        this.$store.dispatch('fetchPersons', api)
        this.$store.dispatch('fetchComments', api)
        this.$store.dispatch('fetchGroups', api)
    },
    computed: {
        /**
         * @return {import('./api/service.js').Person[]}
         */
        filteredPositions () {
            const persons = this.$store.persons
            const positions = {}
            persons.map( item => {
                if (name_filter(item, this.filter) || email_filter(item, this.filter)){
                    if (item.position in positions)
                        positions[item.position].push(item)
                    else
                        positions[item.position] = [ item ]
                }
            })
            this.$store.dispatch('setPositions', Object.keys(positions))
            return positions
        },
        filteredGroups () {
            const persons = this.$store.persons
            const groups = this.$store.groups
            return groups.map(group => { 
                return {
                    "name": group.name,
                    "persons": group.persons.filter(person_id => {
                        return name_filter(persons.find(item=>item.id == person_id), this.filter) || 
                                email_filter(persons.find(item=>item.id == person_id), this.filter)
                    })
                }
            })
        }
    },
    methods: {
        getPersons (payload) {
            const persons = this.$store.persons
            return persons.filter(item => payload.persons.includes(Number(item.id)) )
        }
    }
};
</script>
<style src="@/assets/styles/search/search-bar.pcss" lang="pcss"></style>
<style src="@/assets/styles/form/form.pcss" lang="pcss"></style>

<style lang="pcss">

.action-btn {
    color: var(--color-primary);
    font-size: var(--font-size-small);
    line-height: 1;
    border-bottom: 1px dashed currentColor;
    cursor: pointer;
}

</style>

