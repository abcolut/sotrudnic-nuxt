<template>
    <section class="paginator">

        <button @click="setPage(currentPage - 1)" v-if="currentPage > 0" class="pagination"> - </button>
        <button @click="setPage(currentPage - currentPage)" v-if="currentPage > 0" class="pagination">
            0
        </button>
        <div v-if="currentPage > 3" class="pagination paginationSelect">
            ...
        </div>
        <button @click="setPage(currentPage - 2)" v-if="currentPage - 2 > 0" class="pagination">
            {{ currentPage - 2 }}
        </button>
        <button @click="setPage(currentPage - 1)" v-if="currentPage - 1 > 0" class="pagination">
            {{ currentPage - 1 }}
        </button>
        <div class="pagination paginationSelect"><b>{{ currentPage }}</b></div>

        <button @click="setPage(currentPage + 1)" v-if="currentPage + 1 < maxPage" class="pagination">
            {{ currentPage + 1 }}
        </button>

        <button @click="setPage(currentPage + 2)" v-if="currentPage + 2 < maxPage" class="pagination">
            {{ currentPage + 2 }}
        </button>

        <div v-if="currentPage < Math.trunc(maxPage - 2)" class="pagination paginationSelect">
            ...
        </div>

        <button @click="setPage(Math.trunc(maxPage))" class="pagination" v-if="currentPage < Math.trunc(maxPage - 2)">
            {{ Math.trunc(maxPage) }}
        </button>

        <button @click="setPage(currentPage + 1)" class="pagination" v-if="currentPage <= maxPage - 1">
            Cледующая
        </button>
    </section>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';  

export default defineComponent({  
    name: 'listPaginator',  
    props: {  
        maxPage: { type: Number, default: 0 },  
        currentPage: { type: Number, default: 0 }  
    },  
    emits: ['changePage'],  
    setup(props, { emit }) {  
        const { maxPage, currentPage } = toRefs(props);  

        const setPage = (nom: number) => {  
            emit('changePage', nom);  
        };  

        return {  
            maxPage,  
            currentPage,  
            setPage  
        };  
    }  
});
</script>



<style scoped>
.paginator {
    margin-top: 15px;
}

.paginationTable {
    display: table;
}

.pagination {
    padding: 14px 14px;
    display: inline;
    text-decoration: none;
    color: #000;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-right: 5px;
    margin-bottom:5px;
    cursor:pointer;
}

.paginationSelect {
    background-color: unset;
    border: 1px solid white;
    cursor:unset;
}

@media screen and (max-width: 400px) {
    .pagination {
        padding:  7px 7px;
    }
}
</style>