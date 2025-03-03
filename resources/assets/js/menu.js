/*
|---------------------------------------------------------------
| menu component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('mega-menu', {
  props: [
    'logo',
    'url',
    'alt'
  ],
  template: `

    <div 
     class="hide-tablet
      top-0
      bg-white
      border-b
      border-[--gray]
      sticky
      z-30"
    >
     <div 
      class="
       h-e
       v-a
       bg-white
       p-4
       default-container
       "
      >
        <div class="">
          <a
            class="rm-link-styles"
            :href="url"
          >
            <img
              :src="logo"
              class="w-[150px]"
              :alt="alt"
            ></img>
          </a>
        </div>
        <nav class="min-w-[250px]">
          <ul class="rm-list-styles h-e">
          <slot></slot>
          </ul>
        </nav>
        
      </div>
    </div>
  `,
  data() {
    return {
      message: ''
    };
  },
  methods: {}
});

Vue.component('menu-items', {
  props: [
    'title',
    'children',
    'url'
  ],
  template: `
    <li @keyup.escape="escapePressed()" class="relative">
      <div
        v-if="children !== 'yes'"
      >
        <a
          :href="url"
          class="rm-link-styles"
        >
          {{title}}
        </a>
      </div>
      <div
        v-if="children === 'yes'"
        class="
         v-a
         relative
         cursor-pointer"

        @click="toggle"
        v-click-outside="away"
      >
        <button
          class="rm-btn-styles"
          :id="title"
          aria-haspopup="true"
          :aria-expanded="show.toString()"
        >
         {{title}}
        </button>
        <span class="ml-2 v-a">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
           </svg>
        </span>
      </div>
      <ul
        v-if="show"
        @click.stop
        class="
         absolute 
         top-[40px]
         left-[-10px]
         min-h-[100px]
         min-w-[250px]
         overflow-hidden
         fade-in-bottom
         bg-white
         p-2
         rounded-[--big-radius]
         border
         border-[--gray]
         shadow-lg"
      >
        <slot></slot>
      </ul>
    </li>
  `,
  data() {
    return {
      show: false
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    away() {
      this.show = false;
    },
    escapePressed() {
      this.show = false;
    }
  }
});

Vue.component('menu-item', {
  props: [
    'title',
    'url'
  ],
  template: `
    <li class="row m-t hand">
      <a
        :href="url"
        class="
         rm-link-styles
         rm-list-styles
         p-2
         col
         v-a
         m
         hover:bg-slate-100
         rounded-md"
      >
        
        <div class="ml-2">{{title}}</div>
      </a>
    </li>
  `,
  data() {
    return {};
  },
  methods: {}
});
