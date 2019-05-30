<template>
    <div>
        <h1>Home Page</h1>
        <p>yarn add vue-search-select</p>


        <multi-list-select :list="studentJson"
                           option-value="Student_ID"
                           option-text="Full_Name"
                           id="mySelectId"
                           name="mySelectName"
                           placeholder="select item"
                           :custom-text="codeAndNameAndDesc"
                           :selected-items="items"
                           @select="onSelect">
        </multi-list-select>

        <button @click="onSubmit">Submit</button>

        {{passThisToDatasouce}}

    </div>
</template>

<script>
    import json from "./student"
    import {MultiListSelect} from 'vue-search-select'

    export default {
        name: 'homePage',
        data() {
            return {
                studentJson: json.StudentTable.Table,
                items: [],
                lastSelectItem: {},
                passThisToDatasouce:[]
            }
        },
        components: {
            MultiListSelect,
        },
        methods: {
            codeAndNameAndDesc(item) {
                return `${item.Full_Name}`
            },
            onSelect(items, lastSelectItem) {
                console.log(items)
                console.log(lastSelectItem)
                this.items = items
                this.lastSelectItem = lastSelectItem
            },
            onSubmit() {
                const ids = this.items.map(d => d.Student_ID)
                this.passThisToDatasouce = ids
            },
        }
    };
</script>

<style>
    .multiple.search .delete.icon:before {
        font-family: sans-serif;
        content: "x";
        font-style: normal;
    }
</style>