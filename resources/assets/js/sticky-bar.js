/*
|---------------------------------------------------------------
| Sticky bar  component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('sticky-bar', {
  template: `
<div class="sticky top-0 z-50">
   <div class="px-4 py-3">
      <slot>
         <!-- Default content if no slot provided -->
         <div class="flex items-center space-x-3">
         test
         </div>
      </slot>
   </div>
</div>
  `,
  data() {
    return {}
  },
});



