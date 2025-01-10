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

// Sheet component (parent)
Vue.component('sheet', {
  template: `
    <div class="sheet-container">
      <slot></slot>
    </div>
  `,
  provide() {
    return {
      sheet: this
    };
  },
  data() {
    return {
      isOpen: false,
      uniqueId: Math.random().toString(36).substring(2)
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    toggle() {
      this.isOpen = !this.isOpen;
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
    <div v-if="sheet.isOpen">
      <div
        class="fixed z-20 w-full bg-opacity-80 h-full bg-darker left-0 top-0 overflow-auto v-a h-a"
        @click="closeSheet"
      >
        <div
          :id="'sheet-' + sheet.uniqueId"
          class="
            fixed
            top-0
            right-0
            w-[80%]
            sm:w-[350px]
            h-full
            bg-white
            z-10
            border-l
            border-[--gray]
            fade-in
            dark:bg-darker
            dark:border-l-slate-600"
          role="dialog"
          @click.stop
        >
          <focus-trap :active="sheet.isOpen">
            <slot></slot>
          </focus-trap>
        </div>
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
