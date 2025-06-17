import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Fragment, useState, useRef, useEffect } from 'react';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';

export default function index({ schedule }) {

    const {data, setData, put, processing, errors} = useForm({

    })
    
    console.log(schedule)

    const eventsService = useState(() => createEventsServicePlugin())[0]
    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: [
            ...schedule.map(e=>({
                id: e.id,
                title: e.title,
                start: e.start,
                end: e.end,
                description: e.description,
                
            }))
        ],
        selectedDate:'2025-06-13',
        plugins: [
            createEventModalPlugin(),
            createDragAndDropPlugin(),
        ],
        callbacks: {
            onEventClick(event, mouseEvent) {
                // if (mouseEvent.button === 2) {
                    // Right-click detected
                    console.log(mouseEvent.button);
                    // You can show custom context menu here
                // }
            },
            onEventUpdate(updatedEvent) {
                console.log(updatedEvent)
                router.visit(route('drag_and_drop_update.update', updatedEvent.id), {
                    method: 'put',
                    data: updatedEvent,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
            },
            onBeforeEventUpdate(oldEvent, newEvent, $app) {
                return true
            }
        }
    })

    const [customMenu, setCustomMenu] = useState({
        visible: false,
        top: 0,
        left: 0,
        eventId: null,
      });

    
    
      useEffect(() => {
        const handleContextMenu = (e) => {
          const eventEl = e.target.closest('.sx__time-grid-event-inner');
          console.log(eventEl)
          const eventId = e.target.closest('.sx__time-grid-event.sx__event') || e.target.closest('[data-event-id]');
        //   console.log(eventEls)
          if (eventEl) {
            e.preventDefault(); // Disable browser context menu
      
            const id = eventId?.getAttribute('data-event-id'); // You might need to inspect ScheduleX DOM for actual attr
            const position = {
              top: e.pageY,
              left: e.pageX,
            };
      
            setCustomMenu({
              visible: true,
              top: position.top,
              left: position.left,
              eventId: id,
            });
      
            console.log('Right click detected. Mouse button:', e.button, 'Event ID:', id);
          }
        };
      
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
          document.removeEventListener('contextmenu', handleContextMenu);
        };
      }, []);

      useEffect(() => {
        const hideMenu = () => setCustomMenu(prev => ({ ...prev, visible: false }));
        document.addEventListener('click', hideMenu);
        return () => document.removeEventListener('click', hideMenu);
      }, []);
      
      
    
    return (
        <AuthenticatedLayout
            header={
                <>
                    <h1 className="text-6xl mt-8 font-semibold leading-tight text-[#1c1c1c] mb-2">
                        Kalender 📆
                    </h1>
                    <p className='text-2xl'>
                        Finally , you have completed the task. You can now proceed to the next task.
                    </p>
                </>
            }
        >
        <Head title="Client" />
            <div className='mx-10 my-5 mb-10'>
                <Link href={route('kalender.create')} className="px-5 py-4 mb-10 bg-yellow-500 text-white rounded-lg">+ Add Event</Link>
            </div>
            <div>
                <ScheduleXCalendar calendarApp={calendar}/>
                {customMenu.visible && (
                <div
                    className="absolute bg-white border border-gray-300 rounded-md shadow-lg z-[9999]"
                    style={{ top: customMenu.top, left: customMenu.left }}
                    onClick={() => setCustomMenu({ ...customMenu, visible: false })}
                >
                    <ul className=" flex flex-col p-5">
                        <Link id="edit" href={route('kalender.edit', customMenu.eventId)} className='text-left ml-2 text-sm pr-3 pb-2 w-fit hover:text-green-600'>Edit</Link>
                        <button id="delete" 
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(route('kalender.destroy',customMenu.eventId ), {
                                        onSuccess: () => {
                                            alert("Kalender deleted!"),
                                            window.location.reload()
                                        },
                                        onError: (errors) => console.error(errors),
                                    });
                                }
                            }}
                            className='text-left ml-2 text-sm pr-3 w-fit hover:text-red-600'>Delete
                        </button>
                    </ul>
                </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
