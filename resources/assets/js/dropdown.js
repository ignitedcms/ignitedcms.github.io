/*
|---------------------------------------------------------------
| Dropdown component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/
// Dropdown component (parent)
Vue.component('dropdown', {
  template: `
    <div class="relative inline-block" v-click-outside="close">
      <slot></slot>
    </div>
  `,
  provide() {
    return {
      dropdown: this
    };
  },
  data() {
    return {
      isOpen: false,
      uniqueId: Math.random().toString(36).substring(2),
      selectedIndex: -1
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$nextTick(() => {
          const contentEl = this.$refs.content;
          if (contentEl && contentEl.$el) {
            contentEl.$el.focus();
            this.selectedIndex = -1; // Reset selection when opening
          }
        });
      } else {
        this.selectedIndex = -1;
      }
    },
    close() {
      this.isOpen = false;
      this.selectedIndex = -1;
    },
    navigate(direction) {
      if (this.isOpen) {
        const contentEl = this.$refs.content;
        if (contentEl && contentEl.$el) {
          const items = contentEl.$el.querySelectorAll('[role="menuitem"]');
          const itemCount = items.length;

          if (itemCount > 0) {
            if (direction === 'down') {
              this.selectedIndex = (this.selectedIndex + 1) % itemCount;
            } else if (direction === 'up') {
              this.selectedIndex = (this.selectedIndex - 1 + itemCount) % itemCount;
            }

            items[this.selectedIndex].focus();
          }
        }
      }
    },
    selectItem() {
      if (this.isOpen && this.selectedIndex !== -1) {
        const contentEl = this.$refs.content;
        if (contentEl && contentEl.$el) {
          const items = contentEl.$el.querySelectorAll('[role="menuitem"]');
          const selectedItem = items[this.selectedIndex];
          this.$emit('item-selected', selectedItem.textContent);
          this.close();
        }
      }
    }
  }
});

// Dropdown Trigger component
Vue.component('dropdown-trigger', {
  template: `
    <button
      :id="'dropdown-' + dropdown.uniqueId"
      type="button"
      aria-haspopup="menu"
      :aria-expanded="dropdown.isOpen.toString()"
      @keyup.esc="dropdown.close"
      @click="dropdown.toggle"
    >
      <slot></slot>
    </button>
  `,
  inject: ['dropdown']
});

// Dropdown Content component
Vue.component('dropdown-content', {
  template: `
    <div
      v-show="dropdown.isOpen"
      tabindex="-1"
      role="menu"
      :aria-labelledby="'dropdown-' + dropdown.uniqueId"
      class="
        absolute
        min-w-[150px]
        top-[40px]
        overflow-hidden
        rounded-[--small-radius]
        border
        border-[--gray]
        right-0
        bg-white
        shadow-md
        fade-in
        z-10
        dark:bg-darkest
        dark:shadow-none
        dark:border-slate-600"
      @keydown.down.prevent="dropdown.navigate('down')"
      @keydown.up.prevent="dropdown.navigate('up')"
      @keydown.enter.prevent="dropdown.selectItem"
      @keyup.esc="dropdown.close"
    >
      <slot></slot>
    </div>
  `,
  inject: ['dropdown']
});

// Item component (unchanged)
Vue.component('item', {
  props: ['title', 'url'],
  template: `
    <div
      tabindex="-1"
      role="menuitem"
      class="
        row
        col
        text-sm
        m-0
        p-2
        rounded-[--small-radius]
        cursor-pointer
        hover:bg-gray-100
        dark:text-white
        dark:hover:bg-slate-600"
      @click="$emit('item-selected', title)"
    >
      <div :href="url" class="left">{{ title }}</div>
    </div>
  `,
});
