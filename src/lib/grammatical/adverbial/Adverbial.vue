<template>
    <div class="outer" @mouseenter="showSwitch" @mouseleave="hideSwitch" :class="[onSwitch? 'long' : 'short']">
        <input v-if="curInputType === 'constant'" type="text" v-model="value" :class="{'left': !onSwitch}"/>
        <select v-else-if="curInputType === 'enumerate'" v-model="value" :class="{'left': !onSwitch}">
            <option v-for="i in enums" :value="i">{{i.getLabel()}}</option>
        </select>
        <select v-else-if="curInputType === 'variable'" v-model="value" :class="{'left': !onSwitch}">
            <option v-for="i in matchedVariables" :value="i">{{i.getLabel()}}</option>
        </select>
        <select v-else-if="curInputType === 'instance'" v-model="value" :class="{'left': !onSwitch}">
            <option v-for="i in matchedInstances" :value="i">{{i.getName()}}</option>
        </select>
        <span class="t" v-if="inputTypes[inputIndex - 1]" @click="changeInputType(-1)" v-show="onSwitch">
            &#9650;{{inputTypes[inputIndex - 1].abbr()}}
        </span>
        <span class="m" v-show="onSwitch">
            {{inputTypes[inputIndex].abbr()}}
        </span>
        <span class="b" v-if="inputTypes[inputIndex + 1]" @click="changeInputType(1)" v-show="onSwitch">
            &#9660;{{inputTypes[inputIndex + 1].abbr()}}
        </span>
    </div>
</template>

<script>

    import { Types } from 'transmold'

    const allInputTypes = [Types.INPUT.CONSTANT, Types.INPUT.ENUMERATE, Types.INPUT.VARIABLE, Types.INPUT.INSTANCE];

    export default {

        name: 'Adverbial',

        data(){
            return {
                onSwitch: false,
                inputTypes: allInputTypes,
                inputIndex: 0,
                enums: [],
                value: null
            }
        },

        props: ['parameter', 'subject', 'variables', 'instances'],

        computed: {

            curInputType(){
                return this.inputTypes[this.inputIndex];
            },

            matchedVariables(){
                if(!this.variables){
                    return [];
                }
                return this.variables.filter(v => v.getDataType() === this.parameter.getDataType())
            },

            matchedInstances(){
                if(!this.instances){
                    return [];
                }
                return this.instances.filter(i => i !== null)
            }
        },

        created(){
            if(this.parameter.isInputCompatible(Types.INPUT.ENUMERATE)){
                if(Types.identifyInputType(this.subject) === Types.INPUT.VARIABLE){
                    if(this.subject.getEnums().length > 0){
                        this.enums = this.subject.getEnums();
                    }
                }
            }

            this.inputTypes = this.inputTypes.filter(t => this.parameter.getCompatibleInputTypes().includes(t));
            if(this.enums.length === 0){
                this.inputTypes = this.inputTypes.filter(t => t !== Types.INPUT.ENUMERATE);
            }
        },

        mounted(){

        },

        methods: {

            changeInputType(offset){
                this.value = null;
                this.inputIndex += offset;
            },

            showSwitch(){
                this.onSwitch = true;
            },

            hideSwitch(){
                this.onSwitch = false
            }
        },

        watch: {

            value(cur){
                this.$emit('alter', cur, this.parameter.getHolder());
            }
        }
    }
</script>

<style scoped>
    .outer{
        margin: 6px 6px;
        position: relative;
        height: 72px;
        width: 140px;
        display: inline-block;
    }

    @keyframes short {
        from {
            width: 140px;
        }
        to {
            width: 90px;
        }
    }

    .short{
        width: 90px;
        /*animation: short 0.2s ease-in-out;*/
    }

    @keyframes long {
        from {
            width: 90px;
        }
        to {
            width: 140px;
        }
    }

    .long{
        width: 140px;
        /*animation: long 0.2s ease-in-out;*/
    }

    .t{
        width: 50px;
        position: absolute;
        top: 6px;
        left: 0;
        cursor: pointer;
        color: #aaa;
        font-size: 12px;
    }

    .b{
        width: 50px;
        position: absolute;
        bottom: 6px;
        left: 0;
        cursor: pointer;
        color: #aaa;
        font-size: 12px;
    }

    .m{
        width: 50px;
        position: absolute;
        top: 25px;
        left: 0;
        cursor: pointer;
        color: #aaa;
        font-size: 14px;
    }

    input{
        position: absolute;
        width: 86px;
        height: 26px;
        text-align: center;
        left: 50px;
        top: 20px
    }

    select{
        -webkit-appearance: menulist-button;
        position: absolute;
        width: 90px;
        height: 32px;
        left: 50px;
        top: 20px;
    }

    .left{
        left: 0;
    }
</style>
