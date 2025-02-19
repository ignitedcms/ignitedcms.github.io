/*
|---------------------------------------------------------------
| Tooltip  component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

// Tooltip component (parent)
Vue.component('tooltip', {
  template: `
    <div class="tooltip-container">
      <slot></slot>
    </div>
  `,
  provide() {
    return {
      tooltip: this
    };
  },
  data() {
    return {
      isVisible: false,
      uniqueId: Math.random().toString(36).substring(2)
    };
  },
  methods: {
    showTooltip() {
      this.isVisible = true;
    },
    hideTooltip() {
      this.isVisible = false;
    }
  }
});

// Tooltip Trigger component
Vue.component('tooltip-trigger', {
  template: `
    <div :aria-describedby="'tooltip-' + tooltip.uniqueId " @mouseover="tooltip.showTooltip()" @mouseleave="tooltip.hideTooltip()" class="cursor-pointer">
      <slot></slot>
    </div>
  `,
  inject: ['tooltip'],
});

// Tooltip Content component
Vue.component('tooltip-content', {
  template: `
    <div
      v-if="tooltip.isVisible"
      class="
        relative
        fade-in
        dark:bg-darkest
        dark:shadow-none
        dark:border-slate-600"
    >
      <div
        role="tooltip"
        :id="'tooltip-' + tooltip.uniqueId "
        class="
          small
          fade-in-bottom
          absolute
          bg-white
          w-[200px]
          p-2
          bottom-[40px]
          rounded-[--small-radius]
          border
          border-[--gray]
          text-center
          left-[50%]
          ml-[-100px]
          z-10
          shadow-md
          dark:shadow-none
          dark:bg-darkest
          dark:text-white
          dark:border-slate-600"
      >
        <slot></slot>
      </div>
    </div>
  `,
  inject: ['tooltip']
});
