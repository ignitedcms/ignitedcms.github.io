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
// Tooltip Trigger Component
Vue.component('tooltip-trigger', {
  template: `
    <div
      :aria-describedby="'tooltip-' + $parent.uniqueId"
      @mouseenter="$parent.showTooltip"
      @mouseleave="$parent.hideTooltip"
      @focus="$parent.showTooltip"
      @blur="$parent.hideTooltip"
      class="cursor-pointer"
      tabindex="0">
      <slot></slot>
    </div>
  `
});

// Tooltip Content Component
Vue.component('tooltip-content', {
  template: `
      <div v-if="$parent.isVisible" :id="'tooltip-' + $parent.uniqueId" role="tooltip" :class="[
        'dark:text-black dark:bg-white rounded-[--small-radius] absolute z-50 px-3 py-2 text-xs text-center w-[120px] fade-in text-white bg-dark',
        $parent.position === 'top' || $parent.position === 'bottom' ? '-translate-x-1/2' : '',
        $parent.positionClass
      ]">
        <slot></slot>
      </div>
  `
});

// Main Tooltip Component
Vue.component('tooltip', {
  props: {
    position: {
      type: String,
      default: 'top',
      validator: function(value) {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      isVisible: false,
      uniqueId: Math.random().toString(36).substring(2)
    };
  },
  computed: {
    positionClass() {
      switch(this.position) {
        case 'top':
          return 'bottom-full left-1/2 mb-2';
        case 'bottom':
          return 'top-full left-1/2 mt-2';
        case 'left':
          return 'right-full top-1/2 -translate-y-1/2 translate-x-0 mr-2';
        case 'right':
          return 'left-full top-1/2 -translate-y-1/2 translate-x-0 ml-2';
        default:
          return 'bottom-full left-1/2 mb-2';
      }
    }
  },
  methods: {
    showTooltip() {
      this.isVisible = true;
    },
    hideTooltip() {
      this.isVisible = false;
    },
    handleKeyDown(event) {
      if (event.key === 'Escape' && this.isVisible) {
        this.hideTooltip();
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  template: `
    <div class="relative inline-block">
      <slot></slot>
    </div>
  `
});
