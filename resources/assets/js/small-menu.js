/*
|---------------------------------------------------------------
| Small menu component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component("small-menu", {
  props: ["variant"],
  template: `
  <div
   v-show="show"
   class="
   fixed
   top-0
   z-20
   bg-white
   w-screen
   h-screen
   v-a
   h-a
   "
  >
  <button class="fixed top-10 right-10" @click="toggle">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
     <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
   </svg>
  </button>
     <div class="text-center text-2xl">
     <div><a href="index.html" class="hover:text-black">IgnitedCMS</a></div>
     <div><a href="kamijs.html" class="hover:text-black">Kamijs</a></div>
     <div><a href="go-zen.html" class="hover:text-black">Gozen</a></div>
     <div><a href="blog.html" class="hover:text-black">Blog</a></div>
     <div><a href="about.html" class="hover:text-black">About</a></div>
     <div><a href="contact.html" class="hover:text-black">Contact</a></div>
     </div>
  </div>
  `,
  data() {
    return {
       show:false
    }
  },
  methods:{
     toggle(){
       this.show = !this.show;
     }

  }
});

