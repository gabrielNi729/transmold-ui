<template>
    <div class="outer">
        <select v-model="value">
            <option v-for="i in operators" :value="i">{{i.getName()}}</option>
        </select>
    </div>
</template>

<script>
    export default {

        name: 'Predicate',

        data(){
            return{
                doEmit: true,
                operators: [],
                value: null
            }
        },

        props: ['init', 'subject'],

        mounted(){
            if(this.init !== null && this.init !== undefined){
                if(this.subject !== null && this.subject !== undefined) {
                    this.operators = this.subject.resops();
                }
                this.doEmit = false;
                this.value = this.init;
            }
        },

        methods: {

        },

        watch: {

            subject(cur){
                if(cur !== null && cur !== undefined){
                    this.operators = cur.resops();
                    this.value = null;
                }
            },

            value(cur){
                if(!this.doEmit){
                    this.doEmit = true;
                }else {
                    this.$emit('alter', cur)
                }
            },

            init(cur){
                if(cur === null){
                    if(this.subject !== null && this.subject !== undefined){
                        this.operators = this.subject.resops();
                    }else {
                        this.operators = [];
                    }
                    this.value = null;
                }
            }
        }
    }
</script>

<style scoped>
    .outer{
        margin: 6px 6px;
        position: relative;
        height: 72px;
        width: 90px;
        display: inline-block;
    }

    select{
        -webkit-appearance: menulist-button;
        position: absolute;
        width: 100%;
        height: 32px;
        left: 0;
        top: 20px;
    }
</style>