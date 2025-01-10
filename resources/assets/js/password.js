/*
|---------------------------------------------------------------
| Password component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('password', {
  props: ['value','name'],
  template: `
    <div class="form-group">
      <label for="Password" class="dark:text-white">Password</label>
      <div class="small text-muted dark:text-white">Password</div>
      <div class="relative">
        <span @click="eyeball">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 icon-inside cursor-pointer dark:text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
           </svg>
        </span>
        <input
          :name="name"
          :type="textType"
          class="
           form-control
           dark:bg-darkest
           dark:text-white
           dark:border-slate-600"

          placeholder="Password"
        >
      </div>
      <div class="small text-danger"></div>
    </div>
  `,
  data() {
    return {
      textType: 'password',
    };
  },
  methods: {
    eyeball() {
      if (this.textType === 'password') {
        this.textType = 'text';
      } else {
        this.textType = 'password';
      }
    }
  }
});

