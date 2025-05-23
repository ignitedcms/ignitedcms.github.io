/*
|---------------------------------------------------------------
| Forms and typography components
|---------------------------------------------------------------
| Currently beta version
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('paragraph', {
  props: [''],
  template: `
  <div
     class="
      relative
      text-dark
      "
   >
   <slot></slot>
  <div>
  `,
  data() {
     return {
     }
  },
});

Vue.component('blockquote-component', {
  props: [''],
  template: `
  <blockquote
     class="
      mt-4 
      border-l-4
      pl-6
      italic
      relative
      text-dark
      "
   >
   <slot></slot>
  </blockquote>
  `,
  data() {
     return {
     }
  },
});

Vue.component('header1', {
  props: [''],
  template: `
  <div
     class="
      relative
      text-black
      mb-3
      md:text-5xl
      text-4xl
      text-dark
      "
   >
   <slot></slot>
  <div>
  `,
  data() {
     return {
}
  },
});

Vue.component('header2', {
  props: [''],
  template: `
  <div
     class="
      relative
      text-black
      mb-3
      md:text-4xl
      text-3xl
      text-dark
      "
   >
   <slot></slot>
  <div>
  `,
  data() {
     return {
     }
  },
});

Vue.component('header3', {
  props: [''],
  template: `
  <div
     class="
      relative
      text-black
      mb-3
      md:text-3xl
      text-2xl
      text-dark
      "
   >
   <slot></slot>
  <div>
  `,
  data() {
     return {
     }
  },
});

Vue.component('header4', {
  props: [''],
  template: `
  <div
     class="
      relative
      text-black
      mb-3
      md:text-2xl
      text-xl
      text-dark
      "
   >
   <slot></slot>
  <div>
  `,
  data() {
     return {
     }
  },
});

Vue.component('header5', {
  props: [''],
  template: `
  <div
     class="
      relative
      text-black
      mb-3
      md:text-xl
      text-lg
      text-dark
      "
   >
   <slot></slot>
  <div>
  `,
  data() {
     return {
     }
  },
});


Vue.component('checkbox-component', {
  props: ['options', 'value'],
  template: `
   <div>
    <div v-for="(option, index) in options" :key="index">
      <input 
       class="form-check-input" 
       type="checkbox" 
       :id="'checkbox-' + index" 
       v-model="checkedOptions" 
       :value="option.value || option" 
       @change="handleChange">
      <label class="ml-2 text-sm text-dark" :for="'checkbox-' + index">{{ option.title || option }}</label>
    </div>
  </div>
  `,
  data() {
    return {
      checkedOptions: [...this.value]
    }
  },
  methods: {
    handleChange() {
      this.$emit('input', this.checkedOptions); // emit input event with updated value
    }
  }
});


Vue.component('link-component', {
  props: ['title','url','newtab'],
  template: `
  <a :href="url" :target="newtab === 'yes' ? '_blank' : ''" class="underline text-dark">{{title}}</a>
  `,
  data() {
     return {
     }
  },
});

Vue.component('radio-component', {
  props: ['options', 'value'],
  template: `
   <div>
    <div v-for="(option, index) in options" :key="index">
      <input 
      class="form-check-input" 
      type="radio" 
      :id="'radio-' + index" 
      v-model="radioOptions" 
      :value="option.value || option" 
      @change="handleChange">
      <label class="ml-2 text-sm text-dark" :for="'radio-' + index">{{ option.title || option }}</label>
    </div>
  </div>
  `,
  data() {
     return {
        radioOptions: this.value
     }
  },
   methods: {
     handleChange() {
        this.$emit('input', this.radioOptions); // emit input event with updated value
     }
   }
});


Vue.component('select-component', {
  props: ['name'],
  template: `
  <select 
   class="form-select form-dark" 
   :name="name" 
   @input="$emit('input', $event.target.value)"
   aria-label="Default select example"
   >
   <slot></slot>
  </select>
  
  `,
  data() {
     return {
     }
  },
});


Vue.component('select-item', {
  props: ['title','value'],
  template: `
     <option :value="value">{{title}}</option>
  `,
  data() {
     return {
     }
  },
});



Vue.component('input-component', {
  props: ['value', 'placeholder','name'],
  template: `
  <input
   class="form-control form-dark"
   type="text"
   :name="name"
   :value="value"
   :placeholder="placeholder || 'Type'"
   @input="$emit('input',$event.target.value)" />
  `,
  data() {
     return {
     }
  },
});

Vue.component('textarea-component', {
  props: ['value', 'placeholder','name'],
  template: `
  <textarea 
    class="form-control form-dark" 
    :name="name" 
    @input="$emit('input',$event.target.value)"
    :placeholder="placeholder || 'Type'" 
    rows="4">{{value}}</textarea>
  `,
  data() {
     return {
     }
  },
});



Vue.component('label-component', {
  props: ['htmlfor'],
  template: `
  <label :for="htmlfor" class="text-dark">
    <slot></slot>
  </label>
  `,
  data() {
     return {
     }
  },
});

Vue.component('description', {
  props: [''],
  template: `
  <div class="small text-muted text-dark">
   <slot></slot>
  </div>
  `,
  data() {
     return {
     }
  },
});





