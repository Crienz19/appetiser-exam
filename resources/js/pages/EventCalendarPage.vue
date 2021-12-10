<template>
    <div class="row mt-2">
        <div class="col-4">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Calendar Event</div>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="title">Event Name</label>
                        <input v-model="title" type="text" class="form-control" placeholder="Event Name">
                        <small class="text-danger" v-if="event.errors.title">{{ event.errors.title[0] }}</small>
                    </div>
                    <div class="form-group">
                        <label for="start">Start</label>
                        <input v-model="start_date" type="date" class="form-control" min="2021-12-01" max="2021-12-31">
                        <small class="text-danger" v-if="event.errors.start_date">{{ event.errors.start_date[0] }}</small>
                    </div>
                    <div class="form-group">
                        <label for="end">End</label>
                        <input v-model="end_date" type="date" class="form-control" min="2021-12-01" max="2021-12-31">
                        <small class="text-danger" v-if="event.errors.end_date">{{ event.errors.end_date[0] }}</small>
                    </div>
                    <div class="form-group">
                        <input @change="addDaysToBeSelected($event)" type="checkbox" name="SUN"> Sun
                        <input @change="addDaysToBeSelected($event)" type="checkbox" name="MON"> Mon
                        <input @change="addDaysToBeSelected($event)" type="checkbox" name="TUE"> Tue
                        <input @change="addDaysToBeSelected($event)" type="checkbox" name="WED"> Wed
                        <input @change="addDaysToBeSelected($event)" type="checkbox" name="THU"> Thu
                        <input @change="addDaysToBeSelected($event)" type="checkbox" name="FRI"> Fri
                        <input @change="addDaysToBeSelected($event)" type="checkbox" name="SAT"> Sat
                    </div>
                </div>
                <div class="card-footer">
                    <button @click="saveEvents()" class="btn btn-primary btn-block">Save Event</button>
                </div>
            </div>
        </div>
        <div class="col-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">{{ monthNow() }}</h3>
                </div>
                <div class="card-body p-0">
                    <table class="table table-stripe">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Day</th>
                                <th>Events</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cal in dates" :class="(cal[2] !== '') ? 'bg-success' : ''">
                                <td>{{ cal[0] }}</td>
                                <td>{{ cal[1] }}</td>
                                <td>{{ cal[2] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount, reactive, toRefs } from "vue";
import { useEventStore } from "../store/events";
import useCalendar from "../composables/calendar";

export default defineComponent({
    setup() {
        const event = useEventStore();
        const { listDates, dates } = useCalendar();
        const events = computed(() => event.getAllEvents);

        const eventForm = reactive({
            title: '',
            start_date: '',
            end_date: '',
            selected_days: [
                0, 0, 0, 0, 0, 0, 0
            ]
        });

        onBeforeMount(async () => {
            await onRefresh();
        })

        const onRefresh = async () => {
            await event.loadAllEvents();
            await listDates();

            dates.value.forEach((c : Array<any>) => {
                events.value.forEach(e => {
                    if((new Date(c[0])).getTime() === (new Date(e.date)).getTime()) {
                        c.splice(2, 1, e.title);
                    }
                });
            })
        }

        const addDaysToBeSelected = (e: Event) => {
            enum DAYS {
                SUNDAY,
                MONDAY,
                TUESDAY,
                WEDNESDAY,
                THURSDAY,
                FRIDAY,
                SATURDAY
            }

            let target = (e.target as HTMLInputElement);

            switch(target.name) {
                case 'SUN':
                    if (target.checked) {
                        eventForm.selected_days.splice(DAYS.SUNDAY, 1, 1)
                    } else {
                        eventForm.selected_days.splice(DAYS.SUNDAY, 1, 0)
                    }
                break;

                case 'MON':
                    if (target.checked) {
                        eventForm.selected_days.splice(DAYS.MONDAY, 1, 1)
                    } else {
                        eventForm.selected_days.splice(DAYS.MONDAY, 1, 0)
                    }
                break;

                case 'TUE':
                    if (target.checked) {
                        eventForm.selected_days.splice(DAYS.TUESDAY, 1, 1)
                    } else {
                        eventForm.selected_days.splice(DAYS.TUESDAY, 1, 0)
                    }
                break;

                case 'WED':
                    if (target.checked) {
                        eventForm.selected_days.splice(DAYS.WEDNESDAY, 1, 1)
                    } else {
                        eventForm.selected_days.splice(DAYS.WEDNESDAY, 1, 0)
                    }
                break;

                case 'THU':
                    if (target.checked) {
                        eventForm.selected_days.splice(DAYS.THURSDAY, 1, 1)
                    } else {
                        eventForm.selected_days.splice(DAYS.THURSDAY, 1, 0)
                    }
                break;

                case 'FRI':
                    if (target.checked) {
                        eventForm.selected_days.splice(DAYS.FRIDAY, 1, 1)
                    } else {
                        eventForm.selected_days.splice(DAYS.FRIDAY, 1, 0)
                    }
                break;

                case 'SAT':
                    if (target.checked) {
                        eventForm.selected_days.splice(DAYS.SATURDAY, 1, 1)
                    } else {
                        eventForm.selected_days.splice(DAYS.SATURDAY, 1, 0)
                    }
                break;
            }
        }

        const saveEvents = async () : Promise<void> => {
            await event.storeEvents(eventForm);
            await onRefresh();
            alert('Event Added!')
        }

        const monthNow = () : string => {
            let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            
            return `${months[(new Date(Date.now()).getMonth())]} ${(new Date(Date.now()).getFullYear())}`;
        }

        return {
            ...toRefs(eventForm),
            saveEvents,
            addDaysToBeSelected,
            monthNow,
            dates,
            event
        }
    }
})
</script>