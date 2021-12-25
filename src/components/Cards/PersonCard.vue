<template>
    <div class="card">
        <div class="card__inner">
            <span class="card__inner__avatar">
                <div>
                    <span>
                        <card-avatar :url="person.avatar"></card-avatar>
                        <div v-if="person.comments != null" class="card__inner__avatar-comments-counter">
                            <span>{{ person.comments.length }}</span>
                        </div>
                    </span>
                </div>
            </span>
            <span class="card__inner__description">
                <div class="card__inner__description-item">
                    <div class="card__inner__description-name">
                        <b v-html="mark(person.name)"></b>
                    </div>
                    <div class="card__inner__description-email" v-html="mark(person.email)"></div>
                </div>
                <div class="card__inner__description-item">
                    <span class="action-btn" @click="onPersonEdit">edit</span>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import CardAvatar from '@/components/Addons/Avatar.vue';

export default {
    props: ['person'],
    components: { CardAvatar },
    methods: {
        onPersonEdit() {
            this.$parent.$parent.modal.show = !this.$parent.$parent.modal.show
            this.$parent.$parent.modal.person = this.person
        },
    
        mark (payload) {
            if ([''].includes(this.$parent.$parent.filter)) return payload

            const el = document.createElement("span")
            el.classList.add('mark')
            el.innerHTML = this.$parent.$parent.filter
            return payload.replaceAll(this.$parent.$parent.filter, el.outerHTML)
        }
    }
}
</script>

<style>
.mark {
    background: yellow !important;
}
</style>

<style src="@/assets/styles/card/card.css" scoped></style>
<style src="@/assets/styles/card/card__inner__avatar.css" scoped></style>
<style src="@/assets/styles/card/card__inner__description.css" scoped></style>