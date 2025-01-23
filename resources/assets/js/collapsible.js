/*
|---------------------------------------------------------------
| Collapsible  component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

// Popover component (parent)
Vue.component('collapsible', {
  template: `
    <div class="collapsible-container relative">
      <slot></slot>
    </div>
  `,
  provide() {
    return {
      collapsible: this
    };
  },
  data() {
    return {
      isOpen: false,
      show: false,
      arr: 'false',
      uniqueId: Math.random().toString(36).substring(2)
    };
  },
  methods: {
     
    tmp() {
      this.show = !this.show;
      if (this.arr == 'false') {
        this.arr = 'true';
      } else {
        this.arr = 'false';
      }
    }
  }
});

// Collapsible Trigger component
Vue.component('collapsible-trigger', {
  template: `
    <button
      type="button"
      class=""
      :aria-expanded="collapsible.arr"
      :aria-controls="'collapsible-' + collapsible.uniqueId"
      @click="collapsible.tmp"
    >
      <slot></slot>
    </button>
  `,
  inject: ['collapsible']
});

// Collapsible Content component
Vue.component('collapsible-content', {
  template: `
    <div
      :id="'collapsible-' + collapsible.uniqueId"
      class="
        dark:shadow-none
        dark:bg-darkest
        dark:text-white 
        dark:border-slate-600"
      v-if="collapsible.show"
      @click.stop
    >
    <div>
      <slot></slot>
    </div>
    </div>
  `,
  inject: ['collapsible']
});


