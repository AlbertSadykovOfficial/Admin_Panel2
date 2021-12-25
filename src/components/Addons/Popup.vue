<template>
    <span>
    <div class="popup">
        <div class="dialog">
            <div class="dialog__header">
                <slot name="header"></slot>
                <h3>Имя Фамилия Сотрудника</h3>
            </div>
            <div class="dialog__body">
                <slot name="body"></slot>

                <div class="form">
                    <div class="form-elem">
                        <label class="form-elem-label">name</label>
                        <input type="text" v-model="name"/>
                        <span 
                            v-if="!isNameValid" 
                            class="error-msg">
                            Incorrect, Name should be contain 2 words
                        </span>
                    </div>
                    <div class="form-elem">
                        <label class="form-elem-label">email</label>
                        <input type="text" v-model="email"/>
                        <span 
                            v-if="!isEmailValid"
                            class="error-msg">
                            Incorrect, Email should be an Email
                        </span>
                    </div>
                    <div class="form-elem">
                        <label class="form-elem-label">position</label>
                        <select v-model="position">
                            <option v-for="value in positions" :value="value">{{ value }}</option>
                        </select>
                    </div>
                </div>

            </div>
            <div class="dialog__footer">
                <slot name="footer"></slot>
                <div class="popup-btn-group">
                    <button class="outline" @click="onCancel">Отменить</button>
                    <button :class="{'disabled': !isNameValid || !isEmailValid}" :disabled="!isNameValid || !isEmailValid" @click="onSubmit">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
    </span>
</template>

<script>
export default {
    props: ['modal'],
    created () {
        this.positions = this.$store.getters.positions
    },
    data () {
        return {
            id: this.modal.person.id,
            name: this.modal.person.name,
            email: this.modal.person.email,
            position: this.modal.person.position
        }
    },

    methods: {
        onCancel () {
            if (confirm('DO YOU WANT TO CLOSE THE MODAL WINDOW?'))
                this.modal.show = false
        },
        onSubmit () {
            this.modal.person.name = this.name.split(" ").map(item => item[0].toUpperCase() + item.slice(1)).join(" ")
            this.modal.person.email = this.email
            this.modal.person.position = this.position
            this.modal.show = false
        }
    },
    computed: {
        isNameValid () {
            return this.name.split(" ").length == 2
        },
        isEmailValid () {
            return  this.email.match(
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
        }
    }
}
</script>
<style src="@/assets/styles/popup/popup.pcss" lang="pcss" scoped></style>

<style lang="pcss" scoped>
.disabled {
    cursor: not-allowed;
    opacity: 0.6;
}
.error-msg {
    color: red;
}
</style>
