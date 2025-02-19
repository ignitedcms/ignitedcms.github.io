/*
|---------------------------------------------------------------
| Switch component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('switch-ios', {
  props: ['name', 'value','id'],
  template: `
    <div>
      <label class="form-switch">
        <input
          :id="id"
          :name="name"
          type="checkbox"
          role="switch"
          :aria-checked="String(checked)"
          :checked="checked"
          @change="handleChange"
        />
        <i></i>
      </label>
    </div>
  `,
  data() {
    return {
      checked: this.value // Initialize local state from prop
    };
  },
  watch: {
    value(newVal) {
      // Update local state when prop changes
      this.checked = newVal;
    }
  },
  methods: {
    handleChange(event) {
      this.checked = event.target.checked; // Update local state
      this.$emit('input', this.checked); // Emit new value to parent
    }
  }
});
