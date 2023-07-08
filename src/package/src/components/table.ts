import { onMounted, reactive, ref, proxyRefs } from "vue";

interface PaginationTableProps {
    current?: number;
    pageSize?: number;
    /* 在页面挂载时自动调用接口查询 */
    queryInMount?: boolean;
    apiFun: (params: any) => Promise<any>;
    transformData?: (data: any) => any;
    getQueryParams?: () => any;
}

export function usePaginationTable(prop: PaginationTableProps) {
    const {
        queryInMount = true,
        apiFun,
        current = 1,
        pageSize = 10,
        transformData,
        getQueryParams,
    } = prop;

    const loading = ref(false);

    const errorMsg = ref("");

    const dataSource = ref([]);

    function showTotal(total: number) {
        return `共${total}条数据`;
    }

    const paginationData = reactive({
        current: current,
        pageSize: pageSize,
        total: 0,
        showSizeChanger: true,
        showTotal: showTotal,
    });

    function queryTableData() {
        let queryParams = {
            pageNo: paginationData.current,
            pageSize: paginationData.pageSize,
        };
        if (getQueryParams) {
            const otherParams = getQueryParams();
            queryParams = {
                ...queryParams,
                ...otherParams,
            };
        }
        loading.value = true;
        return apiFun(queryParams)
            .then((result) => {
                if (transformData) {
                    dataSource.value = transformData(result.records);
                } else {
                    dataSource.value = result.records;
                }
                paginationData.total = result.total;
                paginationData.current = result.current;
                paginationData.pageSize = result.size;
                return result;
            })
            .catch((err) => {
                errorMsg.value = err.message;
            })
            .finally(() => {
                loading.value = false;
            });
    }

    function onChange(pagination: any) {
        // console.log('pagination', pagination);
        paginationData.current = pagination.current;
        paginationData.pageSize = pagination.pageSize;
        queryTableData();
    }

    onMounted(() => {
        if (queryInMount) {
            queryTableData();
        }
    });

    function resetPage() {
        paginationData.current = 1;
        paginationData.pageSize = pageSize;
    }

    function reload() {
        resetPage();
        return queryTableData();
    }

    return {
        bindProps: proxyRefs({
            loading,
            pagination: paginationData,
            dataSource: dataSource,
            onChange: onChange,
        }),
        execute: queryTableData,
        refresh: queryTableData,
        resetPage,
        reload,
        loading,
    };
}
