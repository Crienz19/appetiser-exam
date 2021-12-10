import { ref } from 'vue';

export default function useCalendar() {
    const dates = ref<any[]>([]);

    const listDates = () => {
        const d = new Date(Date.now());
        const month = d.getMonth();
        const year = d.getFullYear();

        // GET THE FIRST AND LAST DATE OF THE MONTH.
        var FirstDay = new Date(year, month, 1);
        var LastDay = new Date(year, month + 1, 0);

        // FINALLY, GET THE DAY.
        var weekday = new Array();
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";


        if (typeof weekday[FirstDay.getDay()] != 'undefined') {     // CHECK FOR 'undefined'.
            dates.value = [];
            const start = new Date(FirstDay.toDateString());
            const end = new Date(LastDay.toDateString());
        
            let loop = start;

            while (loop <= end) {      
                dates.value.push([loop.toDateString(), weekday[loop.getDay()], '']);
                let newDate = loop.setDate(loop.getDate() + 1);
                loop = new Date(newDate);
            }
        }
    }

    return {
        dates,
        listDates
    }
}