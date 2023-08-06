import { shallowRef, onUnmounted, reactive } from 'vue';

export interface EditModalProps {
  onSuccess?: () => void;
}

export function useSimplifyModalHandler(props: EditModalProps = {}) {
  const { onSuccess } = props;

  const modalRef = shallowRef();

  function setRef(el) {
    modalRef.value = el;
  }

  onUnmounted(() => {
    modalRef.value = null;
  });

  function returnVerifyRef(method: (instance: any) => Promise<any>) {
    if (modalRef.value) {
      return method(modalRef.value);
    } else {
      return Promise.reject(new Error('弹窗modalRef为null'));
    }
  }

  function showModal(...params: any[]) {
    return returnVerifyRef((r) => {
      return r.showModal(...params);
    });
  }

  function onModalSuccess() {
    onSuccess && onSuccess();
  }

  return reactive({
    bindProps: {
      ref: setRef,
      onSuccess: onModalSuccess,
    },
    showModal,
  });
}
