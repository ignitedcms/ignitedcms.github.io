/*
|---------------------------------------------------------------
| Mobile menu component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/
Vue.component('mobile-menu', {
  props: [
    'title',
    'logo',
    'url',
    'alt'
  ],
  template: `
    <div
     class="
     top-0
     sticky
     z-10
     show-tablet"
   >
      <div
       class="
        h-e
        bg-white
        border-b
        border-light-gray
        p-4
        v-a"
      >
        <div
         class="w-[150px]">
          <a
            :href="url"
          >
          <img
            class="v-a"
            :src="logo"
            :alt="alt"
          ></img>
          </a>
        </div>
        <button
          @click="toggle"
          :aria-controls="menuId"
          :aria-expanded="show.toString()"
        >
          <span class="select-none cursor-pointer">
            <div>
               <!-- Hamburger icon (visible when menu is closed) -->
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" v-show="!show">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
               </svg>
               <!-- X icon (visible when menu is open) -->
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" v-show="show">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
               </svg>
            </div>
          </span>
        </button>
      </div>
      <div
        v-if="show"
        class="
         fixed
         h-full
         w-full
         border-b
         border-gray-300
         fade-in-bottom
         bg-white"
        :id="menuId"
      >
        <slot></slot>
        <a
          href="#"
          class="rm-link-styles w-[100%]"
        >
        </a>
      </div>
    </div>
  `,
  data() {
    return {
      show: false,
      menuId: 'menu-' + Math.random().toString(36).substring(2)
    };
  },
   methods: {
      toggle() {
        this.show = !this.show;
      }
   }
});
Vue.component('mobile-menu-items', {
  props: [
    'title',
    'url',
    'children'
  ],
  template: `
    <div>
      <a
        v-if="children !== 'yes'"
        :href="url"
        class="rm-link-styles"
      >
        <div
          class="
           row
           p-4
           bg-white
           v-a
           border-b
           border-gray-300
           cursor-pointer"
        >
          {{title}}
        </div>
      </a>
      <button
        v-if="children === 'yes'"
        class="
         v-a
         bg-white
         w-full
         p-4
         h-e
         cursor-pointer
         border-b
         border-gray-300
         group"
        @click="toggle"
        :aria-controls="submenuId"
        :aria-expanded="show.toString()"
      >
        <div>
          {{title}}
        </div>
        <div>
          <!-- Plus icon (visible when not expanded) -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 group-[.active]:hidden"
            v-show="!show"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <!-- x icon (visible when expanded) -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" v-show="show">
           <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
         </svg>
        </div>
      </button>
      <div
        v-if="show"
        class="no-select"
        :id="submenuId"
      >
        <slot></slot>
      </div>
    </div>
  `,
  data() {
    return {
      show: false,
      submenuId: 'submenu-' + Math.random().toString(36).substring(2)
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    away() {
      this.show = false;
    }
  }
});
