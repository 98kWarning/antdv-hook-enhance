import { ref, reactive, toRefs } from 'vue';

type BeforeShow<T> = (data: T) => any | Promise<any>;

type ModalProps = {
  [key: string]: any;
  showFooter?: boolean;
  fullscreen?: boolean;
  title?: string;
};

export function useSimplifyModal<T = any>(onShow: BeforeShow<T>, defaultProps: ModalProps = {}) {
  const { showFooter, fullscreen, title } = defaultProps;

  const dialogVisible = ref<boolean>(false);

  // 设置modal其他参数
  const modalProps = reactive<Record<string, any>>({
    footer: showFooter ? undefined : null,
    wrapClassName: fullscreen ? 'full-modal' : '',
    loading: false,
    title,
  });

  async function showModal(data: T) {
    const res = await Promise.resolve(onShow(data));
    dialogVisible.value = true;
    return res;
  }

  function hideModal() {
    dialogVisible.value = false;
  }

  function setProps(props: any) {
    if (props) {
      Object.keys(props).forEach((key) => {
        modalProps[key] = props[key];
      });
    }
  }

  function triggerFooterVisible(b?: boolean) {
    if (b === undefined) {
      // null 不显示，undefined显示
      b = modalProps.footer === null;
    }
    modalProps.footer = b ? undefined : null;
  }

  function triggerLoading(b?: boolean) {
    if (b === undefined) {
      b = !modalProps.loading;
    }
    modalProps.loading = b;
  }

  // 不能正常切换，暂时隐藏
  // function triggerFullScreen(b?: boolean) {
  //   if (b === undefined) {
  //     b = !modalProps.wrapClassName;
  //   }
  //   modalProps.wrapClassName = b ? 'full-screen' : '';
  // }

  function setTitle(title: string) {
    modalProps.title = title;
  }

  function onCancel() {
    hideModal();
  }

  return {
    bindProps: reactive({
      visible: dialogVisible,
      onCancel,
      ...toRefs(modalProps),
    }),
    showModal,
    hideModal,
    setProps,
    triggerFooterVisible,
    triggerLoading,
    // triggerFullScreen,
    setTitle,
  };
}
