/*
|---------------------------------------------------------------
| Combobox component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component("combobox", {
  props: ["value", "name"],
  template: `
    <div @keyup.escape="escapePressed" class="relative">
      <div></div>

      <input class="form-control"
        type="text"
        :name="name"
        :value="selectedItem"
        style="display:none;"
      >

      <button
        @click="load"
        @click.prevent
        role="combobox"
        aria-haspopup="dialog"
        :aria-expanded="arr"
        :aria-controls="name"
        style="width:250px"
        ref="button"
        class="
         form-control 
         p
         h-e
         v-a 
         w-full
         h-[40px]
         text-sm
         dark:bg-darkest 
         dark:text-white
         dark:border-slate-600"
        :name="name"
        :value="value"
        v-click-outside="away"
        @input="updateInput($event.target.value)"
      >
        {{ selectedLabel }}
        <span class="v-a">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
         <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
         </svg>
         
        </span>
      </button>

      <div 
        v-if="show" 
        :id="name"
        role="dialog"
        class="
         absolute
         w-[250px]
         h-[250px]
         top-[45px]
         p
         rounded-[--small-radius]
         shadow-md
         border
         border-[--gray]
         fade-in-bottom
         bg-white
         z-20
         scroll-y  
         dark:bg-darkest
         dark:border-slate-600
         dark:shadow-none" 
        @click.stop
      >
        <div class="relative">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 icon-inside dark:text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </span>
          <input
            class="
             rm-input-styles
             border-b-slate-200
             text-sm
             h-[40px]
             dark:bg-darkest
             dark:border-none
             dark:text-white"
            :name="name"
            aria-autocomplete="list"
            role="combobox"
            :aria-expanded="arr"
            autocomplete="off"
            ref="start"
            @keydown.tab.prevent
            @keydown.enter="onEnter"
            @keydown.down="highlightNext"
            @keydown.up="highlightPrev"
            v-model="searchQuery"
            placeholder="Search list"
          />
          <div 
           class="b-t
            mb-2
            dark:border-t
            dark:border-slate-600"
          >
          </div>
          <div role="listbox" aria-label="Suggestions">
          
          <div
            v-for="(item, index) in filteredItems"
            :key="index"
            role="option"
            class="
             p-2
             text-sm
             dark:text-white
             mx-2
             cursor-pointer
             rounded-[--small-radius]"
            @mouseover="setHighlighted(index)"
            @click="onClick(item)"
            :class="{ 'bg-gray-100 rounded-[--small-radius] dark:bg-slate-600  dark:text-white dark:hover:bg-slate-600': index === highlightedIndex }"
            v-bind="getAriaSelected(index === highlightedIndex)"
          >
            {{ item.label }}
          </div>

          <div
            v-if="filteredItems.length === 0 && searchQuery.trim() !== ''"
            class="p-2 mx-2 text-sm text-dark"
          >
            No searches found. . .
          </div>
        </div>
        <slot></slot>
       </div>
      </div>
    </div>
  `,
  data() {
    return {
      searchQuery: "",
      items: [],
      highlightedIndex: 0,
      selectedItem: this.value,
      selectedLabel: this.value,
      show: false,
      arr: "false",
    };
  },
  mounted() {
    this.items = this.$children;
    if (this.value) {
      const selectedChild = this.items.find(item => item.val === this.value);
      if (selectedChild) {
        this.selectedLabel = selectedChild.label;
      }
    }
  },
  computed: {
    filteredItems() {
      if (this.searchQuery.trim().length === 0) {
        return this.items;
      } else {
        return this.items.filter((item) =>
          item.label.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
  },
  methods: {
    getAriaSelected(index) {
      if (index) {
        return { "aria-selected": "true" };
      } else {
        return {};
      }
    },
    updateInput(newValue) {
      this.$emit("input", newValue);
    },
    load() {
      this.show = true;
      this.arr = "true";
      this.$nextTick(() => {
        this.$refs.start.focus();
      });
    },
    setHighlighted(index) {
      this.highlightedIndex = index;
    },
    onClick(item) {
      this.selectedItem = item.val;
      this.selectedLabel = item.label;
      this.updateInput(this.selectedItem);
      this.show = false;
      this.arr = "false";
      this.highlightedIndex = 0;
      this.searchQuery = "";
    },
    highlightNext() {
      if (this.highlightedIndex < this.filteredItems.length - 1) {
        this.highlightedIndex++;
      }
    },
    highlightPrev() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex--;
      }
    },
    onEnter() {
      if (this.filteredItems.length > 0 && this.highlightedIndex !== -1) {
        const selectedItem = this.filteredItems[this.highlightedIndex];
        this.selectedItem = selectedItem.val;
        this.selectedLabel = selectedItem.label;
        this.updateInput(this.selectedItem);
        this.show = false;
        this.arr = "false";
        this.highlightedIndex = 0;
        this.searchQuery = "";
      } else {
        this.show = false;
        this.arr = "false";
        this.highlightedIndex = 0;
        this.searchQuery = "";
      }
    },
    away() {
      this.show = false;
      this.arr = "false";
    },
    escapePressed() {
      this.show = false;
      this.arr = "false";
    },
  },
});

Vue.component("combo-item", {
  props: ["val", "label"],
  template: ``,
  data() {
    return {
      //nothing
    };
  },
  mounted() {
     //
  },
});
