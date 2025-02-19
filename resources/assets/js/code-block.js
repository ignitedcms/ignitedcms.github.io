/*
|---------------------------------------------------------------
| codeblock component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('code-block', {
  props: ['value','name'],
  template: `
  <div class="relative">
   <div class="bg-primary p-4 text-white rounded-md">
      <div class="h-e v-a">
         <span class="text-gray-400">Code:</span>
         <button @click="clipboard" class="code-copy !p-2" :data-clipboard-target="'#code' + uniqueId">
         <svg v-if="!isCopied" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
         </svg>
         <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
         </svg>
         </button>
      </div>
      <pre :id="'code'+uniqueId" class="code"><slot></slot></pre>
   </div>
</div>
  `,
  data() {
    return {
      test: 'testing123',
      uniqueId: Math.random().toString(36).substring(2),
      isCopied: false
    };
  },
  methods: {
    clipboard() {
      // Copy to clipboard logic (you might want to add actual clipboard copy)
      this.isCopied = true;

      // Reset icon after 2 seconds
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    }
  }
});
