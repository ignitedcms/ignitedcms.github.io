/*
|---------------------------------------------------------------
| Sheet component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

// Sheet component
Vue.component('sheet', {
  template: `
    <div class="sheet-container">
      <slot></slot>
    </div>
  `,
  props: {
    position: {
      type: String,
      default: 'right',
      validator: function(value) {
        return ['top', 'right', 'bottom', 'left'].indexOf(value) !== -1;
      }
    }
  },
  provide() {
    return {
      sheet: this
    };
  },
  data() {
    return {
      isOpen: false,
      uniqueId: Math.random().toString(36).substring(2),
      titleId: '',
      descriptionId: ''
    };
  },
  created() {
    this.titleId = `sheet-title-${this.uniqueId}`;
    this.descriptionId = `sheet-description-${this.uniqueId}`;
  },
  methods: {
    open() {
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },
    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
});

// Sheet Overlay component
Vue.component('sheet-overlay', {
  template: `
    <div v-if="sheet.isOpen">
      <div
        class="fixed z-20 w-full bg-opacity-80 h-full bg-darker left-0 top-0 overflow-auto v-a h-a"
        @click="closeSheet"
      >
        <slot></slot>
      </div>
    </div>
  `,
  inject: ['sheet'],
  methods: {
    closeSheet() {
      this.sheet.close();
    }
  }
});

// Sheet Trigger component
Vue.component('sheet-trigger', {
  template: `
    <button
      type="button"
      aria-haspopup="dialog"
      :aria-expanded="isOpen.toString()"
      :aria-controls="'sheet-' + sheet.uniqueId"
      @click="toggleSheet"
      v-click-outside="closeSheet"
      @keyup.escape="closeSheet"
    >
      <slot></slot>
    </button>
  `,
  inject: ['sheet'],
  computed: {
    isOpen() {
      return this.sheet.isOpen;
    }
  },
  methods: {
    toggleSheet() {
      this.sheet.toggle();
    },
    closeSheet() {
      this.sheet.close();
    }
  }
});

// Sheet Content component
Vue.component('sheet-content', {
  template: `
    <div
      :id="'sheet-' + sheet.uniqueId"
      :class="[
        'fixed bg-white z-30 border-[--gray] fade-in dark:bg-darker',
        positionClasses
      ]"
      role="dialog"
      :aria-labelledby="sheet.titleId"
      :aria-describedby="sheet.descriptionId"
      @click.stop
    >
      <focus-trap :active="sheet.isOpen">
        <slot></slot>
      </focus-trap>
    </div>
  `,
  inject: ['sheet'],
  computed: {
    positionClasses() {
      const classes = {
        'top': 'top-0 left-0 w-full h-[80%] sm:h-[350px] border-b dark:border-b-slate-600',
        'right': 'top-0 right-0 w-[80%] sm:w-[350px] h-full border-l dark:border-l-slate-600',
        'bottom': 'bottom-0 left-0 w-full h-[80%] sm:h-[350px] border-t dark:border-t-slate-600',
        'left': 'top-0 left-0 w-[80%] sm:w-[350px] h-full border-r dark:border-r-slate-600'
      };
      return classes[this.sheet.position];
    }
  }
});

// Sheet Header component
Vue.component('sheet-header', {
  template: `
    <div class="relative overflow-hidden rounded-t-lg dark:border-none dark:bg-darker">
      <slot></slot>
      <button
        type="button"
        aria-label="Close"
        class="rm-btn-styles dark:text-white absolute top-4 right-4"
        @click="sheet.close"
      >
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <span class="sr-only">Close</span>
        </span>
      </button>
    </div>
  `,
  inject: ['sheet']
});

// Sheet Title component
Vue.component('sheet-title', {
  data() {
    return {
      titleId: `sheet-title-${this.$parent.sheet.uniqueId}`
    };
  },
  template: `
    <div :id="titleId" class="sheet-title mt-3 dark:text-white">
      <slot></slot>
    </div>
  `,
  inject: ['sheet']
});

// Sheet Description component
Vue.component('sheet-description', {
  data() {
    return {
      descriptionId: `sheet-description-${this.$parent.sheet.uniqueId}`
    };
  },
  template: `
    <p :id="descriptionId" class="sheet-description text-sm text-gray-500 dark:text-gray-400">
      <slot></slot>
    </p>
  `,
  inject: ['sheet']
});
