/*
|---------------------------------------------------------------
| Dark mode  component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('dark-mode', {
  props: ['top'],
  template: `
<button
   @click="toggleDarkMode"
   class="fixed
   z-10
   p-1
   right-4
   border
   border-[--gray]
   bg-white
   dark:bg-darkest
   dark:border-slate-600
   rounded-[--big-radius]"
   :style="{top: top}"
>
  <div class="h-a v-a">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[15px] w-[15px] text-gray text-dark dark:hidden">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
     </svg>

     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[15px] w-[15px] text-gray text-dark hidden dark:block">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
     </svg>
     
  </div>
</button>
   
  `,
  data() {
    return {
      theme: ''
    }
  },
  methods: {
    toggleDarkMode() {
      if (this.theme == "") {
        document
          .getElementsByTagName("html")[0]
          .setAttribute("class", "dark");
        this.theme = "dark";
      }
      else {
        document.getElementsByTagName("html")[0].removeAttribute("class");
        this.theme = "";
      }
    },
  }
});
