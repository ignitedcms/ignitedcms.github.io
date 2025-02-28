/*
|---------------------------------------------------------------
| Range slider component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/
Vue.component('range-slider', {
  props: ['name', 'value', 'min', 'max', 'step'],
  template: `
    <div class="slidecontainer">
      <input
        class="slider2 dark:bg-gray-400"
        :id="name"
        :name="name"
        :value="value"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="sliderValue"
        @input="updateSlider($event.target.value)"
      />
    </div>
  `,
  data() {
    return {
      sliderValue: this.value
    };
  },
  methods:{
     updateSlider(newValue) {
        this.$emit('input', newValue);
     }
  }
});
