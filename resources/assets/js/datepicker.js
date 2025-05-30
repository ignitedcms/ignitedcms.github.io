/*
|---------------------------------------------------------------
| Datepicker component
|---------------------------------------------------------------
|
|
| @author: IgnitedCMS
| @license: MIT
| @version: 1.0
| @since: 1.0
|
*/

Vue.component('datepicker', {
  props: ['value', 'name'],
  template: `
  <div class="relative"
      @keydown.up.prevent
      @keydown.down.prevent
      @keyup.escape="escapePressed"
      v-click-outside="away"
    >
      <input
        class="form-control"
        type="text"
        :name="name"
        :value="foo"
        style="display:none;"
      >

      <button
        class="
         form-control 
         rm-btn-styles
         w-[250px]
         h-[40px]
         v-e
         dark:bg-darkest
         dark:text-white
         dark:border-slate-600"

        aria-haspopup="dialog"
        :aria-expanded="arr"
        :aria-controls="'datepicker-'+ uniqueId"
        :name="name"
        :value="value"
        @input="updateDate($event.target.value)"
        @click="open"
        @click.prevent
      >
        <span class="v-a h-a">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[20px] w-[20px] icon-inside cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
           </svg>
        </span>
        {{foo}}

        <input
          type="text"
          v-model="selectedDate"
          readonly
          style="display:none;"
        >
      </button>

      <div
          v-show="show"
          :id="'datepicker-'+ uniqueId"
          role="dialog"
          class=" 
          absolute
          top-[45px]
          bg-white
          p-2
          border
          border-[--gray]
          shadow-md
          rounded-[--big-radius]
          w-[250px]
          z-10
          dark:bg-darkest
          dark:shadow-none
          dark:border-slate-600
          fade-in-bottom"
          tabindex="-1"
          @click.stop
          @keydown="handleKeyDown"
      >
          <focus-trap :active="show">
            <div class="h-e px-1 py-4">
              <button
                class=" 
                border
                border-[--gray]
                p-1
                rounded-[--small-radius]
                dark:bg-darker
                dark:text-white
                dark:border-slate-600
                "
                aria-label="previous month"
                @click="showPreviousMonth"
                @focus="focusPreviousMonth"
                tabindex="0"
                @click.prevent
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>

              </button>
              <button
                aria-live="polite"
                role="presentation"
                class=" 
                text-sm
                text-black
                dark:hover:bg-darkest
                dark:text-white
                dark:border-slate-600
                "
                :id="'datepicker-'+ uniqueIdTwo"
                @click.prevent
              >
                {{ getMonthName(currentMonth) }} {{ currentYear }}
              </button>
              <button
                class=" 
                border
                border-[--gray]
                p-1
                rounded-[--small-radius]
                dark:bg-darker
                dark:text-white
                dark:border-slate-600
                "
                aria-label="next month"
                @click="showNextMonth"
                @focus="focusNextMonth"
                tabindex="0"
                @click.prevent
              >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

              </button>
            </div>
            <table class="w-full rm-btn-styles" role="grid" :aria-labelled="'datepicker-'+ uniqueIdTwo">
              <thead>
              <tr class="h-e text-sm space-x-1 mx-[5px]">
                <th class="dark:hover:bg-darkest dark:text-white w-[14.2857142857%] text-center font-normal" aria-label="Sunday">Su</th>
                <th class="dark:hover:bg-darkest dark:text-white w-[14.2857142857%] text-center font-normal" aria-label="Monday">Mo</th>
                <th class="dark:hover:bg-darkest dark:text-white w-[14.2857142857%] text-center font-normal" aria-label="Tuesday">Tu</th>
                <th class="dark:hover:bg-darkest dark:text-white w-[14.2857142857%] text-center font-normal" aria-label="Wednesday">We</th>
                <th class="dark:hover:bg-darkest dark:text-white w-[14.2857142857%] text-center font-normal" aria-label="Thursday">Th</th>
                <th class="dark:hover:bg-darkest dark:text-white w-[14.2857142857%] text-center font-normal" aria-label="Friday">Fr</th>
                <th class="dark:hover:bg-darkest dark:text-white w-[14.2857142857%] text-center font-normal" aria-label="Saturday">Sa</th>
              </tr>
              </thead>
              <tbody role="rowgroup">
              <button
                class="rm-btn-styles w-full"
                @focus="calendarFocused"
                ref="datepicker"
                @click.prevent
              >
                <tr v-for="(row, rowIndex) in calendar" :key="rowIndex" class="flex w-full">
                  <td role="presentation" v-for="(cell, cellIndex) in row"
 
                  class="
                  relative
                  p-0
                  ">
                  <button
                   :key="cell.date"
                   @click="selectDate(cell)"
                   role="gridcell"
                   class="
                   inline-flex
                   items-center
                   justify-center
                   gap-2
                   whitespace-nowrap
                   rounded-md
                   text-sm
                   min-w-[33px]
                   min-h-[33px]
                   dark:text-white
                   "
                   :class="{
                       'current-date dark:bg-slate-400': isCurrentDate(cell),
                       focused: isFocused(rowIndex, cellIndex),
                       'hover:bg-[--gray] hover:text-black hover:rounded-[--small-radius] dark:hover:bg-dark dark:hover:border border-slate-200': cell.date !== ''
                   }"
                   :aria-selected="isSelectedDate(cell)"
                   tabindex="-1"
                   @focus="setFocus(rowIndex, cellIndex)"
                   @click.prevent
                  >
                  {{ cell.date }}
                  </button>
                  </td>
                </tr>
              </button>
              </tbody>
            </table>

          </focus-trap>
        </div>
    </div>
  `,
  data() {
    return {
      show: false,
      today: new Date(),
      currentMonth: 0,
      currentYear: 0,
      selectedDate: '',
      foo: this.value,
      focusedRow: -1,
      focusedCell: -1,
      enableArrowkeys: false,
      arr: 'false',
      uniqueId: Math.random().toString(36).substring(2), // Generate a unique ID
      uniqueIdTwo: Math.random().toString(36).substring(2) // Generate a unique ID

    };
  },
  computed: {
    weekdays() {
      return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    },
    calendar() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const startingDay = firstDay.getDay();
      const totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      let date = 1;
      const calendar = [];
      for (let i = 0; i < 6; i++) {
        const row = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < startingDay) {
            row.push({
              date: '',
            });
          } else if (date > totalDays) {
            break;
          } else {
            row.push({
              date: date,
              month: this.currentMonth,
              year: this.currentYear,
            });
            date++;
          }
        }
        calendar.push(row);
      }
      return calendar;
    },
  },
  mounted() {
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.selectedDate = this.today;

  },
  methods: {
     isSelectedDate(cell) {
        if (!cell.date) return false;
        const selectedDate = new Date(this.selectedDate);
        return cell.date === selectedDate.getDate() &&
               cell.month === selectedDate.getMonth() &&
               cell.year === selectedDate.getFullYear();
    },
    updateDate(newValue) {
      this.$emit('input', newValue);
    },
    calendarFocused(event)
    {
      this.enableArrowkeys = true;
      //event.target.blur(); // Remove focus from the button
    },
    focusPreviousMonth(){
      this.enableArrowkeys = false;
    },
    focusNextMonth(){
      this.enableArrowkeys = false;
    },
    open() {
      this.show = !this.show;
      if(this.show == true) {
         this.arr = 'true';
      }
      else {
         this.arr = 'false';
      }
      this.$nextTick(() => {
        this.$refs.datepicker.focus();
      });
    },
    away() {
      this.show = false;
      this.arr = 'false';
    },
    escapePressed() {
      this.show = false;
      this.arr = 'false';
    },
    formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      return (year.toString() + "-" + month.toString() + "-" + day.toString());
    },
    showPreviousMonth(cell) {
      this.currentMonth--;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }

      //Final focus UX tweaks
      //When tabbing
      const b = new Date(this.currentYear, this.currentMonth, 1);
      this.selectedDate = b;
      this.focusOnSelectedDate(b);

    },
    showNextMonth() {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }

      //Final focus UX tweaks
      //When tabbing
      const b = new Date(this.currentYear, this.currentMonth, 1);
      this.selectedDate = b;
      this.focusOnSelectedDate(b);
    },
    getMonthName(monthIndex) {
      const months = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return months[monthIndex];
    },
    selectDate(cell) {
      if (cell.date == '') {
        //empty nothing to do
      } else {
        const selectedDate = new Date(cell.year, cell.month, cell.date);
        this.selectedDate = selectedDate;
        this.moveFocus(0, 0);
        this.$refs.datepicker.focus();
        this.foo = this.formatDate(selectedDate);
        this.updateDate(this.foo);
      }
    },
    isCurrentDate(cell) {
      return cell.date === this.today.getDate() &&
        cell.month === this.today.getMonth() &&
        cell.year === this.today.getFullYear();
    },
    handleKeyDown(event) {
       if(this.enableArrowkeys) {
            if (event.key === 'ArrowLeft') {
              this.moveFocus(0, -1);
            } else if (event.key === 'ArrowRight') {
              this.moveFocus(0, 1);
            } else if (event.key === 'ArrowUp') {
              this.moveFocus(-1, 0);
            } else if (event.key === 'ArrowDown') {
              this.moveFocus(1, 0);
            } else if (event.key === 'Enter') {
              this.foo = this.formatDate(this.selectedDate);
              this.updateDate(this.foo);
            }
       }
    },
    moveFocus(rowChange, colChange) {
      let date = new Date(this.selectedDate);
      date.setDate(date.getDate() + (rowChange * 7) + colChange);
      if (date.getMonth() !== this.currentMonth) {
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
      }
      this.selectedDate = date;
      this.focusOnSelectedDate();
    },
    isFocused(rowIndex, cellIndex) {
      return rowIndex === this.focusedRow && cellIndex === this.focusedCell;
    },
    setFocus(rowIndex, cellIndex) {
      this.focusedRow = rowIndex;
      this.focusedCell = cellIndex;
      this.focusOnSelectedDate();
    },
    focusOnSelectedDate() {
      const date = new Date(this.selectedDate);
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const startingDay = firstDay.getDay();
      const selectedCell = date.getDate() + startingDay - 1;
      this.focusedRow = Math.floor(selectedCell / 7);
      this.focusedCell = selectedCell % 7;
    },
  },
});

