/*
|---------------------------------------------------------------
| Popover component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.1
| @since: 1.0
|
*/

// Popover component (parent)
Vue.component('popover', {
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
  props: {
    position: {
      type: String,
      default: 'bottom',
      validator: value => ['top', 'bottom', 'left', 'right'].includes(value)
    },
    align: {
      type: String,
      default: 'center',
      validator: value => ['start', 'center', 'end'].includes(value)
    },
    offset: {
      type: String,
      default: '0px'
    },
    gap: {
      type: String,
      default: '0px'
    }
  },
  data() {
    return {
      isOpen: false,
      show: false,
      arr: 'false',
      uniqueId: Math.random().toString(36).substring(2)
    };
  },
  // No created/beforeDestroy hooks needed
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
      :class="positionClasses"
      :style="positionStyles"
      role="dialog"
      v-if="popover.show"
      @click.stop
    >
    <focus-trap :active="popover.show">
      <slot></slot>
    </focus-trap>
    </div>
  `,
  inject: ['popover'],
  computed: {
    positionClasses() {
      const position = this.popover.position;
      const align = this.popover.align;

      const baseClasses = `
        fade-in
        absolute
        bg-white
        p-4
        rounded-[--small-radius]
        border
        border-[--gray]
        z-10
        shadow-md
        dark:shadow-none
        dark:bg-darkest
        dark:text-white
        dark:border-slate-600
      `;

      // Position classes
      let positionClass = '';
      if (position === 'top') {
        positionClass = 'bottom-full';
      } else if (position === 'bottom') {
        positionClass = 'top-full';
      } else if (position === 'left') {
        positionClass = 'right-full';
      } else if (position === 'right') {
        positionClass = 'left-full';
      }

      // Alignment classes
      let alignClass = '';
      if (position === 'top' || position === 'bottom') {
        if (align === 'start') {
          alignClass = 'left-0';
        } else if (align === 'center') {
          alignClass = 'left-1/2 -translate-x-1/2';
        } else if (align === 'end') {
          alignClass = 'right-0';
        }
      } else if (position === 'left' || position === 'right') {
        if (align === 'start') {
          alignClass = 'top-0';
        } else if (align === 'center') {
          alignClass = 'top-1/2 -translate-y-1/2';
        } else if (align === 'end') {
          alignClass = 'bottom-0';
        }
      }

      // Width class - only apply fixed width for top/bottom positions
      const widthClass = (position === 'top' || position === 'bottom') ? 'w-[200px]' : '';

      return `${baseClasses} ${positionClass} ${alignClass} ${widthClass}`;
    },
    positionStyles() {
      const position = this.popover.position;
      const gap = this.popover.gap;
      const offset = this.popover.offset;

      let styles = {};

      // Apply gap
      if (position === 'top') {
        styles.marginBottom = gap;
      } else if (position === 'bottom') {
        styles.marginTop = gap;
      } else if (position === 'left') {
        styles.marginRight = gap;
      } else if (position === 'right') {
        styles.marginLeft = gap;
      }

      // Apply offset
      if (position === 'top' || position === 'bottom') {
        styles.marginLeft = offset;
      } else if (position === 'left' || position === 'right') {
        styles.marginTop = offset;
      }

      return styles;
    }
  }
});
