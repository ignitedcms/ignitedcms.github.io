/*
|---------------------------------------------------------------
| Hovercard component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.1
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
  created() {
    // Create a global event listener for the escape key
    window.addEventListener('keydown', this.handleEscapeKey);
  },
  beforeDestroy() {
    // Clean up event listener
    window.removeEventListener('keydown', this.handleEscapeKey);
  },
  methods: {
    toggleCard() {
      this.isOpen = !this.isOpen;
    },
    openCard() {
      this.isOpen = true;
    },
    closeCard() {
      this.isOpen = false;
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape' && this.isOpen) {
        this.closeCard();
      }
    }
  }
});

// hovercard Trigger component
Vue.component('hovercard-trigger', {
  template: `
    <button
      type="button"
      class="relative"
      @click="hovercard.toggleCard"
      @focus="hovercard.openCard"
      @blur="hovercard.closeCard"
      @mouseenter="hovercard.openCard"
      @mouseleave="hovercard.closeCard"
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
      v-show="hovercard.isOpen"
      :class="positionClasses"
      :style="positionStyles"
      @click.stop
      tabindex="-1"
    >
      <slot></slot>
    </div>
  `,
  inject: ['hovercard'],
  computed: {
    positionClasses() {
      const position = this.hovercard.position;
      const align = this.hovercard.align;

      const baseClasses = `
        absolute
        fade-in
        bg-white
        border
        border-[--gray]
        p-4
        z-20
        rounded-[--big-radius]
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
      const position = this.hovercard.position;
      const gap = this.hovercard.gap;
      const offset = this.hovercard.offset;

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
