/*
|---------------------------------------------------------------
| Pagination component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

// Pagination Component for Vue.js 2
Vue.component('pagination', {
  template: `
    <nav role="navigation" aria-label="pagination">
      <slot></slot>
    </nav>
  `
});

Vue.component('pagination-content', {
  template: `
    <ul class="rm-list-styles h-a v-a space-x-2 text-sm">
      <slot></slot>
    </ul>
  `
});

Vue.component('pagination-item', {
  template: `
    <li>
      <slot></slot>
    </li>
  `
});

Vue.component('pagination-link', {
  props: ['href', 'active'],
  template: `
    <a
      :href="href"
      :aria-current="active ? 'page' : null"
      :class="active
        ? 'hover:bg-light-gray text-sm text-dark bg-white border border-[--gray] shadow-sm px-4 py-2 rounded-[--small-radius] dark:bg-darkest'
        : 'hover:bg-light-gray text-sm text-dark px-4 py-2 rounded-[--small-radius] dark:hover:bg-darkest  '"
    >
      <slot></slot>
    </a>
  `
});

Vue.component('pagination-previous', {
  props: ['href'],
  template: `
    <a :href="href" aria-label="Go to previous page" class="px-3 py-2 rounded-[--small-radius] text-black bg-transparent  hover:bg-gray-200 transition ease-in-out duration-500 text-dark bg-dark dark:hover:bg-darkest">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 inline-block mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Previous
    </a>
  `
});

Vue.component('pagination-next', {
  props: ['href'],
  template: `
    <a :href="href" aira-label="Go to next page" class="px-3 py-2 rounded-[--small-radius] text-black bg-transparent  hover:bg-gray-200 transition ease-in-out duration-500 text-dark bg-dark dark:hover:bg-darkest">
        Next
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 inline-block ml-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    </a>
  `
});
