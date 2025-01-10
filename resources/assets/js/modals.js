/*
|---------------------------------------------------------------
| Modals component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/
// Modal component
Vue.component('modal', {
  template: `
    <div>
      <slot></slot>
    </div>
  `,
  provide() {
    return {
      modal: this
    };
  },
  data() {
    return {
      isOpen: false,
      uniqueId: '',
      titleId: '',
      descriptionId: ''
    };
  },
  created() {
    this.uniqueId = Math.random().toString(36).substring(2);
    this.titleId = `modal-title-${this.uniqueId}`;
    this.descriptionId = `modal-description-${this.uniqueId}`;
  },
  methods: {
     open() {
         this.isOpen = true;
         this.disableScroll();
     },
     close() {
         this.isOpen = false;
         this.enableScroll();
      },
      toggle() {
            this.isOpen ? this.close() : this.open();
      },
      disableScroll() {
            document.body.style.overflow = 'hidden';
      },
      enableScroll() {
         document.body.style.overflow = '';
     }
  }
});

// Modal Trigger component
Vue.component('modal-trigger', {
  template: `
    <button
      type="button"
      aria-haspopup="dialog"
      :aria-expanded="isOpen.toString()"
      :aria-controls="'modal-' + modal.uniqueId"
      @click="modal.toggle"
      v-click-outside="closeModal"
      @keyup.escape="modal.close"
    >
      <slot></slot>
    </button>
  `,
  inject: ['modal'],
  computed: {
    isOpen() {
      return this.modal.isOpen;
    }
  },
  methods: {
    closeModal() {
      this.modal.close();
    }
  }
});

// Modal Content component
Vue.component('modal-content', {
  template: `
    <div
      v-if="modal.isOpen"
      class="fixed z-20 w-full bg-opacity-80 h-full bg-darker left-0 top-0 overflow-auto v-a h-a"
    >
      <div 
        class="modal-content hide-tablet relative w-[90%] lg:w-[30%] shadow-md rounded-[--big-radius] overflow-hidden border border-slate-600 bg-opacity-100 z-30 bg-white fade-in-bottom dark:shadow-none"
        :id="'modal-' + modal.uniqueId"
        role="dialog"
        :aria-labelledby="modal.titleId"
        :aria-describedby="modal.descriptionId"
        @click.stop
      >
        <focus-trap :active="modal.isOpen">
          <slot></slot>
        </focus-trap>
      </div>

      <div 
        class="modal-content-mobile show-tablet fixed bottom-0 h-[70%] w-full overflow-hidden rounded-t-lg bg-white p-4 dark:bg-darkest fade-in-bottom"
        :id="'modal-' + modal.uniqueId"
        role="dialog"
        :aria-labelledby="modal.titleId"
        :aria-describedby="modal.descriptionId"
        @click.stop
      >
        <focus-trap :active="modal.isOpen">
          <slot></slot>
        </focus-trap>
      </div>
    </div>
  `,
  inject: ['modal']
});

// Modal Header component
Vue.component('modal-header', {
  template: `
    <div class="relative overflow-hidden rounded-t-lg dark:border-none dark:bg-darker">
      <slot></slot>
      <button
        type="button"
        aria-label="Close"
        class="rm-btn-styles dark:text-white absolute top-4 right-4"
        @click="modal.close"
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
  inject: ['modal']
});

// Modal Title component
Vue.component('modal-title', {
  template: `
    <h5 :id="modal.titleId" class="modal-title mt-3 dark:text-white">
      <slot></slot>
    </h5>
  `,
  inject: ['modal']
});

// Modal Description component
Vue.component('modal-description', {
  template: `
    <p :id="modal.descriptionId" class="modal-description text-sm text-gray-500 dark:text-gray-400">
      <slot></slot>
    </p>
  `,
  inject: ['modal']
});
