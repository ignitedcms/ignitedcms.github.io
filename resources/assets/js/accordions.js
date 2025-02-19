/*                                                                          
|---------------------------------------------------------------            
| Accordion component
|---------------------------------------------------------------            
|
| 
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/       
Vue.component('accordion', {
  template: `
    <div>
      <slot></slot>
    </div>
  `,
  data() {
    return {
      activeItem: null
    };
  },
  provide() {
    return {
      accordion: this
    };
  },
  methods: {
    setActiveItem(id) {
      this.activeItem = this.activeItem === id ? null : id;
    }
  }
});

Vue.component('accordion-item', {
  props: ['title'],
  template: `
    <div class="border-b border-gray-200 dark:border-slate-600">
      <button
        type="button"
        :aria-expanded="isActive.toString()"
        :aria-controls="'accordion-' + uniqueId"
        :id="'accordion-title-' + uniqueId"
        class="
          flex justify-between items-center w-full
          py-4  text-left
        "
        @click="toggle"
      >
        <span class="text-dark text-black">{{ title }}</span>
        <svg
          class="text-dark size-4 text-gray-500 transition-transform duration-200 ease-in-out"
          :class="{ 'transform rotate-180': isActive }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        v-show="isActive"
        :id="'accordion-' + uniqueId"
        :aria-labelledby="'accordion-title-' + uniqueId"
        class="transition-all duration-200 ease-out fade-in"
        :class="{ 'max-h-0 overflow-hidden': !isActive, 'max-h-96 overflow-auto': isActive }"
      >
        <div class=" pb-4">
          <slot></slot>
        </div>
      </div>
    </div>
  `,
  inject: ['accordion'],
  data() {
    return {
      uniqueId: Math.random().toString(36).substring(2),
    };
  },
  computed: {
    isActive() {
      return this.accordion.activeItem === this.uniqueId;
    }
  },
  methods: {
    toggle() {
      this.accordion.setActiveItem(this.uniqueId);
    }
  }
});
