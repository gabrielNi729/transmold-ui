<template>
    <div class="outer" :style="'width:' + width + 'px'">
        <span v-if="symbol === 'right'" ref="span">&#10003</span>
        <span v-else-if="symbol === 'wrong'" ref="span" style="color: red">&#10007</span>
        <span v-else ref="span">{{text}}</span>
    </div>
</template>

<script>
    export default {

        name: 'Plain',

        data(){
            return {
                width: 0
            }
        },

        props: ['text', 'symbol'],

        mounted(){
            this.width = this.$refs.span.clientWidth;
        },

        methods: {

        }
    }
</script>

<style scoped>
    .outer{
        margin: 6px 6px;
        position: relative;
        width: auto;
        display: inline-block;
        height: 72px;
    }

    span {
        position: absolute;
        height: 32px;
        line-height: 32px;
        left: 0;
        top: 20px;
        display: inline-block;
        white-space: nowrap;
        text-align: center;
    }
</style>