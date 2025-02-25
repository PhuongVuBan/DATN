<template>
  <div class="data-input" :class="{ 'is-valid': isValid || isValidEmailPhone }">
    <label :class="{ required: required }">{{ label }}</label>
    <span v-if="toolTip" class="tool-tip">
      {{ toolTip }}
    </span>
    <input
      :disabled="disabled"
      ref="tagInput"
      class="input"
      :type="type"
      v-model="valueHeader"
      :placeholder="placeholder"
      :tabindex="tab"
      @input="handleInput"
      @blur="handleCheckEmailPhone"
      @change="handleChange"
      :class="{ 'is-number': isNumber, 'is-size': isSize }"
    />
    <span class="message-valid" :style="{ left: leftMessage }">{{
      messageValid
    }}</span>
  </div>
</template>

<script lang="ts">
import {
  ref,
  onMounted,
  toRefs,
  watch,
  onBeforeMount,
  defineComponent,
toHandlerKey,
} from "vue";
import { UtilsComponents } from "@/core/public_api";

export default defineComponent({
  props: [
    "modelValue", // Giá trị v-model
    "maxLength", // Max độ dài
    "placeholder", // placeholder ô input
    "required", // Bắt buộc hay không
    "type", // Kiểu input
    "messageValid", // Thông báo lỗi khi input không thoả mãm
    "label", // Label hiển thị
    "focus", // có được focus hay không
    "tab", // tab index
    "toolTip", // toolTip hiển thị
    "isPhone", // Có là sdt không
    "isEmail", // Có là email không
    "isNumber", // có là số hay không
    "leftMessage", // hiển thị message bên left
    "maxValue", // max giá trị có thể nhập khi là số
    "disabled", // vô hiệu hoá ô input
    "isSize"
  ],
  emits: ["update:modelValue", "handleChange"],
  setup(props, context) {
    const Base: UtilsComponents = new UtilsComponents();

    // <!-- @keypress="isInputNumber($event)" -->
    /**
     * Element thẻ input
     * HAN - 15.09.2022
     */
    const tagInput: any = ref(null);

    /**
     * focus: có focus khi mounted
     * required: có bắt buộc hay k
     * isEmail: Là email hay k
     * isPhone: là sdt hay k
     * maxLength: độ dài max là value
     * modelValue: v-model
     * isNumber: là số hay k
     * HAN - 15.09.2022
     */
    const {
      focus,
      required,
      isEmail,
      isPhone,
      maxLength,
      modelValue,
      isNumber,
      maxValue,
    }: any = toRefs(props);

    /**
     * Trạng thái hiển thị validate
     * HAN - 15.09.2022
     */
    const isValid: any = ref(false);

    /**
     * trạng thái hiển thị validate email, phone
     * HAN - 15.09.2022
     */
    const isValidEmailPhone: any = ref(false);

    /**
     * Kiểm tra sự thay đổi của giá trị input và binding lên thẻ input
     */
    const valueHeader: any = ref("");
    watch(modelValue, (newValue) => {
      if (isNumber.value) {
        valueHeader.value = Base.Comma(newValue);
      } else {
        valueHeader.value = newValue;
      }
    });
    /**
     * Binding giá trị lên thẻ input
     */
    onBeforeMount(() => {
      if (isNumber.value) {
        valueHeader.value = Base.Comma(modelValue.value);
      } else {
        valueHeader.value = modelValue.value;
      }
    });

    /**
     * Sau khi được mounted vào dom thì nếu đc chỉ định focus ô input sẽ đc focus
     * HAN - 15.09.2022
     */
    onMounted(() => {
      if (focus.value === true) {
        setTimeout(() => {
          if (tagInput.value) {
            tagInput.value.focus();
          }
        }, 150);
      }
    });

    /**
     * hàm xử lý nhập input và validate
     * HAN - 15.09.2022
     */
    function handleInput(event: any) {
      if (maxLength.value && !isNumber.value) {
        if (event.target.value.length <= maxLength.value) {
          updateValue(event.target.value);
          isValidEmailPhone.value = false;
          if (required.value) {
            if (event.target.value.trim() == "") {
              isValid.value = true;
            } else {
              isValid.value = false;
            }
          }
        } else {
          valueHeader.value = modelValue.value;
        }
      } else if (isNumber.value) {
        const number = CommaToNumber(event.target.value);
        if (
          checkNumber(number) ||
          number === "" ||
          number === null ||
          number === undefined
        ) {
          if (event.data === "." || event.data === ",") {
            valueHeader.value = Base.Comma(modelValue.value) + ",";
          } else {
            valueHeader.value = Base.Comma(modelValue.value);
            updateValue(number);
          }
        } else {
          valueHeader.value = Base.Comma(modelValue.value);
        }
      } else {
        updateValue(event.target.value);
        isValidEmailPhone.value = false;
        if (required.value) {
          if (event.target.value == "") {
            isValid.value = true;
          } else {
            isValid.value = false;
          }
        }
      }
    }

    /**
     * Hàm cập nhật giá trị
     * HAN - 15.09.2022
     */
    function updateValue(value: any) {
      if (maxValue.value) {
        if (Number(value) <= maxValue.value) {
          context.emit("update:modelValue", value);
        } else {
          valueHeader.value = Base.Comma(modelValue.value);
        }
      } else {
        context.emit("update:modelValue", value);
      }
    }

    function CommaToNumber(number: any) {
      const ToNumber = number.replace(/\./g, "").replace(/,/g, ".");
      return ToNumber ? ToNumber : undefined;
    }
    /**
     * hàm xử lý validate điện thoại và email
     * HAN - 15.09.2022
     */
    function handleCheckEmailPhone(event: any) {
      if (event.target.value != "") {
        if (isEmail.value) {
          if (Base.validateEmail(event.target.value) === false) {
            isValidEmailPhone.value = true;
          } else {
            isValidEmailPhone.value = false;
          }
        } else if (isPhone.value) {
          if (Base.validatePhone(event.target.value) === false) {
            isValidEmailPhone.value = true;
          } else {
            isValidEmailPhone.value = false;
          }
        }
      }
    }

    function handleLeave(event: any) {
      console.log(event);
    }

    function handleKeyDown(event: any) {
      console.log(event);
    }

    function handleChange(event : any) {
      context.emit("handleChange");
    }

    function checkNumber(n: any) {
      return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }
    return {
      tagInput,
      isValid,
      valueHeader,
      isValidEmailPhone,
      handleCheckEmailPhone,
      handleInput,
      handleLeave,
      handleKeyDown,
      handleChange
    };
  },
});
</script>

<style>
.data-input {
  position: relative;
}
.tool-tip {
  position: absolute;
  left: 18px;
  background-color: #505050;
  border-radius: 3px;
  padding: 2px 4px;
  z-index: 3;
  text-align: center;
  visibility: hidden;
  opacity: 0;
  color: var(--while__color);
  white-space: nowrap;
}
.data-input label:hover ~ .tool-tip {
  visibility: visible;
  opacity: 1;
}
.is-number, .is-size {
  text-align: right;
}
.input:disabled {
  background-color: #eff0f2;
}
</style>
