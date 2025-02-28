/*
|---------------------------------------------------------------
| Progress  component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/
Vue.component('progress-bar', {
  props: {
    value: {
      type: Number,
      default: 0,
      validator: function(val) {
        return val >= 0 && val <= 100;
      }
    }
  },
  template: `
    <div class="progress" style="width: 100%;">
      <div role="progressbar"
       :aria-valuenow="value"
       aria-valuemin="0"
       aria-valuemax="100"
       class="progress-bar-primary"
       :style="{ width: value + '%' }">
       </div>
    </div>
  `,
  data() {
    return {
    };
  },
  methods:{
  }
});
