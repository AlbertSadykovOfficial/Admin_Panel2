<template>
    <div 
        class="page" 
        v-show="managers.length || ordinary.length"
        v-scroll="handleScroll">
        <h1>{{ title }}</h1>
        <div class="page__list" v-if="hide">
            <app-manager-secure v-for="person in managers"
                :person="person">
            </app-manager-secure>
            <app-person 
                v-for="person in ordinary"
                :person="person">
            </app-person>
        </div>
        <div v-else :style="{'height': height + 'px'}">
            
        </div>
    </div>
</template>

<script>
import AppPerson from '@/components/Cards/PersonCard.vue';
import AppManager from '@/components/Cards/ManagerCard.vue';
import withSecretPersonProps from '../addons/clone.js'

const AppManagerSecure = withSecretPersonProps(AppManager, ['email'], '*');

export default {
    props: ['group'],
    components: { AppPerson, AppManager, AppManagerSecure },
    data () {
        return {
            hide: true,
            height: '',
            isCooldown: false
        }
    },
    computed: {
        managers () {
            return this.group.filter(item => item.position == 'Manager')
        },
        ordinary () {
            return this.group.filter(item => item.position != 'Manager')
        },
        title () {
            return this.group[0].position
        }
    },
    methods: {
        /*
        * debounce to 200ms
        */
        handleScroll: function (evt, el) {
            if (this.isCooldown) return;
            const rect = el.getBoundingClientRect() 

            if (this.hide) this.height = el.children[1].getBoundingClientRect().height
            
            this.hide = (window.innerHeight > rect.top && rect.top > 0) || 
                        (window.innerHeight > rect.bottom && rect.bottom > 0)

            this.isCooldown = true;
            setTimeout(() => this.isCooldown = false, 250)
        }
    }
}
</script>

<style src="@/assets/styles/page/page__list.css" scoped></style>