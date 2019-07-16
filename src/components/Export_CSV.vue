<template>
    <div id="xxportx_csv">
    </div>
</template>

<script>
    export default {
        name: "Export_CSV",
        CsvExport: function(data, fields, fieldNames, fileName) {
            try {
                var result = json2csv({
                    data: data,
                    fields: fields,
                    fieldNames: fieldNames
                })
                var csvContent = 'data:text/csvcharset=GBK,\uFEFF' + result
                var encodedUri = encodeURI(csvContent)
                var link = document.createElement('a')
                link.setAttribute('href', encodedUri)
                link.setAttribute('download', `${(fileName || 'file')}.csv`)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            } catch (err) {
                console.error(err)
            }
        },
    }
</script>

<style scoped>

</style>