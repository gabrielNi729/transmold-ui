<template>
    <div>
        <div v-if="!instance" class="line">
            <plain :text="name + ':'"></plain>
            <subject :variables="variables" :instances="instances" @alter="alterSubject" ref="subject"></subject>
            <predicate :subject="subject" @alter="alterPredicate" ref="predicate"></predicate>
        </div>
        <div v-else class="line">
            <plain :text="name + ':'"></plain>
            <div class="seg" v-for="(i, index) in instance.getSegmentsDisplay()">
                <subject v-if="index === instance.getFirstParamIndex()"
                         :init="subject" :variables="variables" :instances="instances" @alter="alterSubject" ref="subject"></subject>
                <div class="predicate-group" v-else-if="index === instance.getFirstTextIndex()">
                    <plain :text="instance.getFirstTextNeighbors('pre')" v-show="predicate"></plain>
                    <predicate :init="predicate" :subject="subject" @alter="alterPredicate" ref="predicate"></predicate>
                    <plain :text="instance.getFirstTextNeighbors('post')" v-show="predicate"></plain>
                </div>
                <adverbial v-else-if="i.hasOwnProperty('value')" v-show="predicate" :parameter="i" :subject="subject"
                           :variables="variables" :instances="instances" @alter="alterAdverbial" ref="adverbial"></adverbial>
                <plain v-else-if="i.content !== null && i.content.trim() !== ''" v-show="predicate" :text="i.content.trim()"></plain>
            </div>
            <plain v-if="instance.isLegitimate()" symbol="right"></plain>
            <plain v-else symbol="wrong"></plain>
        </div>
    </div>
</template>

<script>

    import Subject from '../../grammatical/subject/Subject';
    import Predicate from '../../grammatical/predicate/Predicate';
    import Adverbial from '../../grammatical/adverbial/Adverbial';
    import Plain from '../../grammatical/plain/Plain'

    import { Instance } from 'transmold';

    export default {


        name: 'TransmoldAtom',

        components: {Subject, Predicate, Adverbial, Plain},

        data(){
            return {
                subject: null,
                predicate: null,
                instance: null
            }
        },

        props: ['name', 'variables', 'instances'],

        computed: {

        },

        created(){

        },

        mounted(){

        },

        methods: {

            alterSubject(subject){
                this.subject = subject;
                this.predicate = null;
            },

            alterPredicate(predicate){
                this.predicate = predicate;
                if(predicate !== null && predicate !== undefined) {
                    this.instance = null;
                    this.$nextTick(() => {
                        this.instance = new Instance({template: predicate, name: this.name}).setFirstValue(this.subject);
                    })
                }
            },

            alterAdverbial(adverbial, holder){
                this.instance.setValue(holder, adverbial)
            },

            syncInstance(instance) {
                let firstHolder = instance.template.getFirstParam().getHolder();
                this.$refs.subject.syncSubject(instance.values[firstHolder].getValue())
                this.$nextTick(() => {
                    this.$refs.predicate.syncPredicate(instance.template);
                    this.$nextTick(() => {
                        for (let key in instance.values) {
                            if (key !== firstHolder) {
                                this.$nextTick(() => {
                                    this.$nextTick(() => {
                                        this.$refs.adverbial[0].syncAdverbial(instance.values[key].getValue())
                                    })
                                })

                            }
                        }
                    })
                });
            }
        },

        watch: {

            instance: {
                deep: true,
                handler(cur){
                    if(cur !== null) {
                        this.$emit('alter', cur);
                    }
                }
            }
        }

    }
</script>

<style scoped>

    .line {
        width: auto;
    }

    .seg {
        display: inline-block;
    }

    .predicate-group{
        display: inline-block;
        height: 100%;
    }
</style>
