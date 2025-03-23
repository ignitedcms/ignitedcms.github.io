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
    text-sm
    v-a
    px-2
    py-3
    bg-transparent
    rounded-[--small-radius]
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

Vue.component('breadcrumb-separator', {
  template: `
  <li
    role="presentation"
    aria-hidden="true"
    class="[&>svg]:w-3.5 [&>svg]:h-3.5 ml-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-chevron-right"
    >
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  </li>
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
  <a :href="url" class="text-dark">
   {{ title }}
  </a>
  </li>
  `,
  data() {
    return {}
  },
});
