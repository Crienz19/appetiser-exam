<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use DateTime;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function getEvents()
    {
        $events = Event::get();

        return EventResource::collection($events);
    }

    public function storeEvents(CreateEventRequest $request)
    {
        $request->validated();

        $begin = new DateTime($request->start_date);
        $end   = new DateTime($request->end_date);
        
        $temp = array();

        $weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

        for($i = $begin; $i <= $end; $i->modify('+1 day')){
            $day = date('w', strtotime($i->format("Y-m-d")));
            foreach($request->selected_days as $keys => $isChecked) {
                if ($day == $keys) {
                    if ($isChecked == 1) {
                        array_push($temp, $i->format("Y-m-d").' '.$weekdays[$day]);
                        Event::updateOrCreate(
                            ['date' => $i->format("Y-m-d")],
                            ['date' => $i->format("Y-m-d"), 'title' => $request->title]
                        );
                    } else {
                        Event::updateOrCreate(
                            ['date' => $i->format("Y-m-d")],
                            ['date' => $i->format("Y-m-d"), 'title' => '']
                        );
                    }
                }
            }
        }
        
        return $temp;
        // $storedEvent = Event::create([
        //     'title' => $request->title,
        //     'start_date' => $request->start_date,
        //     'end_date' => $request->end_date,
        //     'selected_days' => json_encode($request->selected_days)
        // ]);

        // return new EventResource($storedEvent);
    }
}
