import { EditModalProps, useSimplifyModalHandler } from './useSimplifyModalHandler';

export function useModeModalHandler(props: EditModalProps = {}) {
  const modalHandler = useSimplifyModalHandler(props);

  function showEdit(record) {
    return modalHandler.showModal('edit', record);
  }

  function showAdd(record?: any) {
    return modalHandler.showModal('add', record);
  }

  function showDetail(record?: any) {
    return modalHandler.showModal('detail', record);
  }

  return {
    ...modalHandler,
    showDetail,
    showAdd,
    showEdit,
  };
}
