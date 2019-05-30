<template>
    <vuetable ref="vuetable"
              :api-url=apiUrl
              :data="data"
              :fields="['Parent_FName', 'email', 'birthdate']"
    ></vuetable>
</template>

<script>
    import Vuetable from 'vuetable-2/src/components/Vuetable';

    export default {
        name: "CustomTable",
        components: {
            Vuetable
        },
        props: ['apiUrl', 'data', 'fields']
    };
</script>