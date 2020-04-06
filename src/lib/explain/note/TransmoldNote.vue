<template>
    <div>
        <span v-text="prefix"></span>
        <span v-if="realMode === 'wrapper'" v-html="html"></span>
        <span v-else v-text="text"></span>
    </div>
</template>

<script>
    export default {

        name: 'TransmoldNote',

        data(){
            return {
                text: '',
                html: ''
            }
        },

        props: ['instance', 'mode', 'prefix'],

        computed: {

            realMode(){
                return ['wrapper', 'code'].includes(this.mode)? this.mode : 'display';
            }
        },

        mounted(){

        },

        methods: {

        },

        watch: {

            instance: {
                deep: true,
                handler(cur){
                    if(cur !== null){
                        if(this.realMode === 'wrapper'){
                            this.text = '';
                            this.html = cur.getOutWrap(true);
                        }else{
                            this.text = cur.outputText(this.realMode);
                            this.html = '';
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
