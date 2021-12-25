<template>
    <div class="page" v-show="managers.length || ordinary.length">
        
        <h1>{{ name }}</h1>
        <div class="page__list">
            <app-manager v-for="person in managers"
                :person="person">
            </app-manager>
            <app-person 
                v-for="person in ordinary"
                :person="person">
            </app-person>
        </div>
	</div>
</template>

<script>
import AppPerson from '@/components/Cards/PersonCard.vue';
import AppManager from '@/components/Cards/ManagerCard.vue';

export default {
	props: ['persons', 'name'],
	components: { AppPerson, AppManager },
    computed: {
        managers () {
            return this.persons.filter(item => item.position == 'Manager')
        },
        ordinary () {
            return this.persons.filter(item => item.position != 'Manager')
        }
    }
}
</script>

<style src="@/assets/styles/page/page__list.css" scoped></style>