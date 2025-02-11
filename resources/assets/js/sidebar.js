/*
|---------------------------------------------------------------
| Sidebar component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('sidebar', {
  props: ['theme'],
  template: `
<div>
 <div 
   class="
     hide-tablet
     dark:bg-dark
     dark:text-white
     fixed
     top-0
     left-0
     border-[--gray]
     border-r
     h-screen
     p-8
     scroll-y
     w-[270px]"
     :class="[colorVariants[theme]]"
 >
   <slot name="header"></slot>
 </div>
 <div 
  class="
   fixed
   dark:bg-dark
   dark:text-white
   border-[--gray]
   border-r
   top-0
   left-0
   w-[270px]
   h-screen
   z-20
   p-8 
   scroll-y
   fade-in"
  :class="[colorVariants[theme]]"
  :style="{ display: styles }"
  @click.stop
 >
      <slot name="header"></slot>
 </div>
 <div class="md:ml-[280px] md:p-8 p-4  default-container">
   <button 
    @click="toggle"
    v-click-outside="away"
    class="
     show-tablet
     dark:bg-dark
     w-[40px]
     h-[40px]
     mb-3
     bg-white
     cursor-pointer
     p-2
     rounded-[--small-radius]
     border
     border-[--gray]"
   >
   <span class="v-a h-a dark:text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
         <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
      </svg>
   </span>
   </button>
    <slot/>
 </div>
</div>

  `,
  data() {
    return {
       colorVariants:{
         dark:'bg-dark text-white',
         light:'bg-white',
         gray:'bg-light-gray'
       },
      show: false,
      dark: false,
      styles: 'none'
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
      if (this.show) {
        this.styles = 'block';
      } else {
        this.styles = 'none';
      }
    },
    away() {
      this.show = false;
      this.styles = 'none';
    }
  },
  mounted() {
    // ...
  }
});

