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
        <caption>
            <slot></slot>
        </caption>
    `
});

Vue.component('table-header', {
    template: `
        <thead class="bg-white dark:bg-darker">
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
        <tr class="hover:bg-light-gray hover:dark:bg-darker">
            <slot></slot>
        </tr>
    `
});

Vue.component('table-head', {
    template: `
        <th scope="col" class="px-4 py-4 text-left font-normal text-sm text-muted text-dark">
            <slot></slot>
        </th>
    `
});

Vue.component('table-cell', {
    template: `
        <td class="px-4 py-4 whitespace-nowrap text-dark text-sm text-black">
            <slot></slot>
        </td>
    `
});
