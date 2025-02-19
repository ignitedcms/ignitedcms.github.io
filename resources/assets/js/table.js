/*
|---------------------------------------------------------------
| Table component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('table-component', {
    template: `
        <table class="min-w-full divide-y divide-gray-200 overflow-auto">
            <slot></slot>
        </table>
    `
});

Vue.component('table-caption', {
    template: `
        <caption class="sr-only">
            <slot></slot>
        </caption>
    `
});

Vue.component('table-header', {
    template: `
        <thead class="bg-light-gray dark:bg-darker">
            <slot></slot>
        </thead>
    `
});

Vue.component('table-body', {
    template: `
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-darker text-dark">
            <slot></slot>
        </tbody>
    `
});

Vue.component('table-footer', {
    template: `
        <tfoot>
            <slot></slot>
        </tfoot>
    `
});

Vue.component('table-row', {
    template: `
        <tr>
            <slot></slot>
        </tr>
    `
});

Vue.component('table-head', {
    template: `
        <th scope="col" class="px-4 py-2 text-left font-medium text-gray-900 text-dark">
            <slot></slot>
        </th>
    `
});

Vue.component('table-cell', {
    template: `
        <td class="px-4 py-2 whitespace-nowrap text-dark">
            <slot></slot>
        </td>
    `
});
