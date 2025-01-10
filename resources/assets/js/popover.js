/*
|---------------------------------------------------------------
| Popover  component
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
Vue.component('popover', {
  props: ['width','halfwidth'],
  template: `
    <div class="popover-container relative" v-click-outside="away">
      <slot></slot>
    </div>
  `,
  provide() {
    return {
      popover: this
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
     
    away() {
      this.show = false;
      this.arr = 'false';
    },
    tmp() {
      this.show = !this.show;
      if (this.arr == 'false') {
        this.arr = 'true';
      } else {
        this.arr = 'false';
      }
    },
    escapePressed() {
      this.show = false;
      this.arr = 'false';
    }
  }
});

// Popover Trigger component
Vue.component('popover-trigger', {
  template: `
    <button
      type="button"
      class=""
      aria-haspopup="dialog"
      :aria-expanded="popover.arr"
      :aria-controls="'popover-' + popover.uniqueId"
      @click="popover.tmp"
      @keyup.escape="popover.escapePressed()"
    >
      <slot></slot>
    </button>
  `,
  inject: ['popover']
});

// Popover Content component
Vue.component('popover-content', {
  template: `
    <div
      :id="'popover-' + popover.uniqueId"
      class="
        fade-in-bottom 
        absolute
        bg-white
        p-4
        bottom-[40px] 
        left-[50%]
        rounded-[--small-radius]
        border
        border-[--gray]
        z-10
        shadow-md
        dark:shadow-none
        dark:bg-darkest
        dark:text-white 
        dark:border-slate-600"
      role="dialog"
      v-if="popover.show"
      :style="{ width: popover.width || '200px', marginLeft : popover.halfwidth }"
      @click.stop
    >
    <focus-trap :active="popover.show">
      <slot></slot>
    </focus-trap>
    </div>
  `,
  inject: ['popover']
});

