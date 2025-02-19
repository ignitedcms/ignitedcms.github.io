/*
|---------------------------------------------------------------
| Hovercard  component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

// hovercard component (parent)
Vue.component('hovercard', {
  template: `
    <div class="hovercard-container group relative">
      <slot></slot>
    </div>
  `,
  provide() {
    return {
      hovercard: this
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
   // none   
  }
});

// hovercard Trigger component
Vue.component('hovercard-trigger', {
  template: `
    <button
      type="button"
      class=" relative"
      @click="hovercard.tmp"
    >
      <slot></slot>
    </button>
  `,
  inject: ['hovercard']
});

// hovercard Content component
Vue.component('hovercard-content', {
  template: `
    <div
      class="
            absolute
            left-1/2
            -translate-x-1/2
            w-[200px]
            hidden
            fade-in
            group-hover:block
            bg-white
            border
            border-[--gray]
            p-4
            rounded-[--big-radius]
            shadow-md
            top-full
            dark:shadow-none
            dark:bg-darkest
            dark:text-white 
            dark:border-slate-600"
    >
         <slot></slot>
       
    </div>
  `,
  inject: ['hovercard']
});



