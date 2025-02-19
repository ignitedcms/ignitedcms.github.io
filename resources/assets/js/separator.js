/*
|---------------------------------------------------------------
| Separator component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('separator', {
  props: {
    orientation: {
      type: String,
      default: 'horizontal',
      validator: value => ['horizontal', 'vertical'].includes(value)
    }
  },
  computed: {
    separatorClasses() {
      return this.orientation === 'horizontal'
        ? 'w-full border-t border-gray-200 my-4'
        : 'h-8 border-l border-gray-200 mx-4'
    }
  },
  template: `
    <div
      :class="separatorClasses"
      :role="'separator'"
      :aria-orientation="orientation"
    ></div>
  `
});
