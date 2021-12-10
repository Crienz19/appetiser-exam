import { AxiosError } from "axios";
import { defineStore } from "pinia";
import http from "../http-common";

export interface EventTypes {
    id: number;
    title: string,
    date: string
}

export interface ErrorTypes {
    title: string[],
    start_date: string[],
    end_date: string[]
}

export const useEventStore = defineStore({
    id: 'events',
    state: () => ({
        events: [] as EventTypes[],
        errors: {} as ErrorTypes,
        isRequestLoading: false
    }),
    getters: {
        getAllEvents() : EventTypes[] {
            return this.events;
        }
    },
    actions: {
        async loadAllEvents() : Promise<void> {
            this.isRequestLoading = true;
            let response = await http.get('/getEvents');
            this.events = response.data.data;
            this.isRequestLoading = false;
        },
        async storeEvents(data: any) {
            try {
                this.isRequestLoading = true;
                let response = await http.post('/storeEvents', data);
                console.log(response);
                this.isRequestLoading = false;
                this.errors = {
                    title : [],
                    start_date: [],
                    end_date: []
                };
            } catch (error) {
                this.isRequestLoading = false;
                this.errors = (error as AxiosError).response?.data.errors;
                throw new Error('Internal Error!');
            }
        }
    }
});