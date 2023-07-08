import { ref, proxyRefs } from "vue";

export interface IDeleteConfirmProp<T> {
    apiFun: (row: T) => Promise<any>;
    onSuccess?: (row: T) => void;
}

/* 用于表格行中的删除popconfirm */
export function useDeleteConfirmProp<T = any>(props: IDeleteConfirmProp<T>) {
    const { apiFun, onSuccess } = props;

    /* 控制删除按钮的loading状态 */
    const deleteLoading = ref(false);

    /* 控制删除确认框的展示与隐藏 */
    const currentRow = ref<T | null>(null);

    /* 用于判断弹窗展示，手动绑定 */
    function active(row: any) {
        return currentRow.value === row;
    }

    /* 点击删除按钮事件，手动绑定 */
    function showConfirm(rowData: T) {
        currentRow.value = rowData as any;
    }

    /* 执行删除接口，自动绑定 */
    function executeDelete() {
        deleteLoading.value = true;
        return apiFun(currentRow.value as T)
            .then((res) => {
                onSuccess && onSuccess(currentRow.value as T);
                currentRow.value = null;
                return res;
            })
            .finally(() => {
                // 执行完成取消loading状态
                deleteLoading.value = false;
            });
    }

    /* 弹窗中的取消按钮点击事件，自动绑定 */
    function cancelDelete() {
        currentRow.value = null;
    }

    /* 绑定弹窗中确认和取消两个按钮的loading状态
     * 弹窗中的确认按钮点击事件，自动绑定
     *弹窗展示与删除按钮的点击事件，手动绑定
     */
    return {
        bindProps: proxyRefs({
            okButtonProps: {
                disabled: deleteLoading,
            },
            cancelButtonProps: {
                disabled: deleteLoading,
            },
            onCancelDelete: cancelDelete,
            onConfirm: executeDelete,
        }),
        visible: active,
        showConfirm,
        executeDelete,
    };
}
