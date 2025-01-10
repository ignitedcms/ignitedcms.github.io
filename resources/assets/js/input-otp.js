/*
|---------------------------------------------------------------
| Input OTP component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/
Vue.component("input-otp", {
  props: ["value", "number"],
  template: `
    <div>
      <input v-for="(digit, index) in digits"
        :key="index"
        type="text"
        class="
         form-dark 
         text-center
         mr-4 
         border
         border-gray-300
         rounded-md
         h-[40px]
         w-[40px]"

        maxlength="1"
        v-model="digits[index]"
        @input="onInput(index)"
        @keydown.backspace="onBackspace(index)"
        :ref="'input' + index">
    </div>
  `,
  data() {
    return {
      digits: []
    }
  },
  watch: {
    digits: {
      handler(newDigits) {
        this.$emit('input', newDigits.join(''));
      },
      deep: true
    },
    value: {
      handler(newValue) {
        this.digits = newValue.split('').concat(Array(this.number - newValue.length).fill(''));
      },
      immediate: true
    },
    number: {
      handler(newNumber) {
        this.digits = this.value.split('').concat(Array(newNumber - this.value.length).fill(''));
      },
      immediate: true
    }
  },
  methods: {
    onInput(index) {
      if (this.digits[index].length === 1 && index < this.digits.length - 1) {
        this.$refs['input' + (index + 1)][0].focus();
      }
    },
    onBackspace(index) {
      if (this.digits[index].length === 0 && index > 0) {
        this.$refs['input' + (index - 1)][0].focus();
      }
    }
  },
  mounted() {
    this.$refs.input0[0].focus();
  }
});
