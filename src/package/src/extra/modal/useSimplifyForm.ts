import { reactive, shallowRef, onUnmounted } from 'vue';
import { cloneDeep } from 'lodash-es';

// TODO rules 引入类型
interface SimpleFormProps<T> {
  state: T;
  rules?: any;
  labelCol?: {
    span?: number;
    offset?: number;
  };
  wrapperCol?: {
    span?: number;
    offset?: number;
  };
  onFinish?: (params: any) => void;
}

export function useSimplifyForm<T extends Object>(prop: SimpleFormProps<T>) {
  const { state, rules, labelCol, wrapperCol } = prop;

  const initSnapshot = cloneDeep(state);

  const formLabelCol = labelCol || { span: 6 };
  const formWrapperCol = wrapperCol || { span: 18 };

  const formState = reactive<T>(state);

  const formRef = shallowRef<any>(null);

  function onFinish(params: any) {
    if (prop.onFinish) {
      prop.onFinish(params);
    }
  }

  function setFieldsValue(params) {
    for (const key in params) {
      formState[key] = params[key];
    }
  }

  function backToInit() {
    for (const key in state) {
      // @ts-ignore
      formState[key] = initSnapshot[key];
    }
  }

  function returnVerifyRef(method: (instance: any) => Promise<any>) {
    if (formRef.value) {
      return method(formRef.value);
    } else {
      return Promise.reject(new Error('表单formRef为null'));
    }
  }

  function resetFields() {
    return returnVerifyRef((form) => {
      return form.resetFields();
    });
  }

  function clearValidate(...params) {
    return returnVerifyRef((form) => {
      return form.clearValidate(...params);
    });
  }

  function validate(...params) {
    return returnVerifyRef((form) => {
      return form.validate(...params);
    });
  }

  // const validate = returnVerifyRef((form, ...params) => {
  //   return form.validate(...params);
  // });

  function scrollToField(...params) {
    return returnVerifyRef((form) => {
      return form.scrollToField(...params);
    });
  }

  function setRef(el) {
    formRef.value = el;
  }

  onUnmounted(() => {
    formRef.value = null;
  });

  return {
    bindProps: {
      ref: setRef,
      model: formState,
      rules,
      wrapperCol: formWrapperCol,
      labelCol: formLabelCol,
      onFinish,
    },
    validate,
    state: formState,
    setFieldsValue,
    resetFields,
    clearValidate,
    scrollToField,
    backToInit,
  };
}
