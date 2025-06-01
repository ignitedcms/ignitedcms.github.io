/*
|---------------------------------------------------------------
| Tags component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('tags-input', {
    props: ['value'],

    data: function() {
        return {
            inputValue: '',
            focusedTagIndex: -1
        }
    },

    methods: {
        addTag: function() {
            var tag = this.inputValue.trim();
            if (tag && this.value.indexOf(tag) === -1) {
                this.$emit('input', this.value.concat([tag]));
                this.inputValue = '';
            }
        },

        removeTag: function(index) {
            var newTags = this.value.slice();
            newTags.splice(index, 1);
            this.$emit('input', newTags);
        },

        onKeyPress: function(event) {
            if (event.key === 'Enter') {
                this.addTag();
            }
        },

        onKeyDown: function(event) {
            if (event.key === 'Tab') {
                //event.preventDefault();
            } else if (event.key === 'ArrowLeft') {
                if (this.inputValue === '') {
                    event.preventDefault();
                    if (this.focusedTagIndex === -1) {
                        this.focusedTagIndex = this.value.length - 1;
                    } else if (this.focusedTagIndex > 0) {
                        this.focusedTagIndex--;
                    }
                }
            } else if (event.key === 'ArrowRight') {
                if (this.inputValue === '' && this.focusedTagIndex !== -1) {
                    event.preventDefault();
                    if (this.focusedTagIndex < this.value.length - 1) {
                        this.focusedTagIndex++;
                    } else {
                        this.focusedTagIndex = -1;
                    }
                }
            } else if ((event.key === 'Backspace' || event.key === 'Delete') && this.focusedTagIndex !== -1) {
                event.preventDefault();
                this.removeTag(this.focusedTagIndex);
                if (this.focusedTagIndex >= this.value.length) {
                    this.focusedTagIndex = this.value.length - 1;
                }
                if (this.value.length === 0) {
                    this.focusedTagIndex = -1;
                }
            } else if (event.key === 'Backspace' && this.inputValue === '' && this.value.length > 0 && this.focusedTagIndex === -1) {
                this.removeTag(this.value.length - 1);
            } else if (this.inputValue !== '') {
                this.focusedTagIndex = -1;
            }
        },

        onInputFocus: function() {
            this.focusedTagIndex = -1;
        }
    },

    template: `
        <div class="border p-1.5 rounded-md">
            <span v-for="(tag, index) in value"
                  :key="index"
                  class="ml-2 rounded-md p-0.5 inline-block bg-slate-100 text-black"
                  :class="{ 'ring-4 ring-gray-300 outline-none': focusedTagIndex === index }">
                {{ tag }}
                <button class="bg-transparent border-none text-black cursor-pointer ml-1"
                        tabindex="-1"
                        @click="removeTag(index)">×</button>
            </span>
            <input v-model="inputValue"
                   @keypress="onKeyPress"
                   @keydown="onKeyDown"
                   @focus="onInputFocus"
                   @blur="addTag"
                   class="border-none outline-none px-0.5"
                   placeholder="Type and press Enter"
                   type="text">
        </div>
    `
});
