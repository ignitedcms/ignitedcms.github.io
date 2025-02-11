/*
|---------------------------------------------------------------
| Breadcrumb component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('breadcrumb', {
  props: [],
  template: `
  <nav aria-label="breadcrumb">
  <ol 
    class="
    rm-list-styles
    flex
    px-2
    py-3
    bg-transparent
    rounded-[--small-radius]
    dark:bg-darkest
    dark:border-slate-600
    dark:text-white
    dark:shadow-none
    "
  >
  <slot></slot> 
     
  </ol>
  </nav>
  `,
  data() {
    return {}
  },
});


Vue.component('breadcrumb-item', {
  props: ['title','url'],
  template: `
  <li 
    class="
    ml-3
    cursor-pointer
    hover:text-gray-900
    text-dark
    "
  > 
  <a :href="url">
   {{ title }}
  </a>
  </li>
  `,
  data() {
    return {}
  },
});





