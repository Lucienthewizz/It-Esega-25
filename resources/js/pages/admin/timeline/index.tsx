import * as React from "react";
import { usePage, useForm } from "@inertiajs/react";
import AuthenticatedAdminLayout from "@/layouts/admin/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { UserType } from "@/types/user";
import { EventTimeline } from "@/components/event/event-timeline";
import { EventForm } from "@/components/event/event-form";
import { EventCard } from "@/components/event/event-card";
import { route } from "ziggy-js";

export default function AdminTimelinePage() {
    const { user, timelines, flash } = usePage<{
        user: { data: UserType };
        timelines: { data: Event[] };
        flash: { success?: string; error?: string };
    }>().props;

    const auth = user.data;
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [editingEvent, setEditingEvent] = React.useState<Event | null>(null);

    const events = timelines.data;

    const { setData, post, put, delete: destroy, processing, reset } = useForm<Omit<Event, "id">>({
        title: '',
        description: '',
        due_date: new Date(),
        category: '',
        location: '',
        status: true,
    });

    const handleAddEvent = (event: Omit<Event, "id">) => {
        setData(event);
        post(route("timeline.store"), {
            onSuccess: () => {
                setIsFormOpen(false);
                reset();
            },
        });
    };

    const handleEditEvent = (updatedEvent: Event) => {
        setData({
            title: updatedEvent.title,
            description: updatedEvent.description,
            due_date: updatedEvent.due_date,
            location: updatedEvent.location || '',
            category: updatedEvent.category,
            status: updatedEvent.status
        });
        put(route("timeline.update", updatedEvent.id), {
            onSuccess: () => {
                setEditingEvent(null);
                setIsFormOpen(false);
                reset();
            },
        });
    };

    const handleDeleteEvent = (id: number) => {
        if (confirm("Are you sure you want to delete this event?")) {
            destroy(route("timeline.destroy", id));
        }
    };

    const openEditForm = (event: Event) => {
        setEditingEvent(event);
        setIsFormOpen(true);
    };

    return (
        <AuthenticatedAdminLayout title="Timeline Management" headerTitle="Timeline Management" user={auth}>
            <div className="container mx-auto py-8 px-4">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold  mb-2">Event Timeline Management</h1>
                    <p className="text-gray-600">Organize and manage IT-essega event schedule with ease.</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Event List */}
                    <div className="lg:w-2/3">
                        <div className=" rounded-xl shadow-md p-6 mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold ">Event Timeline</h2>
                                <Button
                                    onClick={() => {
                                        setEditingEvent(null);
                                        setIsFormOpen(true);
                                    }}
                                    className="bg-teal-600 hover:bg-teal-700"
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Event
                                </Button>
                            </div>

                            <EventTimeline events={events} onEdit={openEditForm} onDelete={(id) => handleDeleteEvent(id)} />
                        </div>
                    </div>

                    {/* Form / Details */}
                    <div className="lg:w-1/3">
                        {isFormOpen ? (
                            <div className=" rounded-xl shadow-md p-6 sticky top-8">
                                <h2 className="text-xl font-semibold  mb-4">
                                    {editingEvent ? "Edit Event" : "Add New Event"}
                                </h2>
                                <EventForm
                                    processing={processing}
                                    onSubmit={editingEvent ? handleEditEvent : handleAddEvent}
                                    onCancel={() => {
                                        setIsFormOpen(false);
                                        setEditingEvent(null);
                                    }}
                                    initialData={editingEvent}
                                />
                            </div>
                        ) : (
                            <div className=" rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-semibold  mb-4">Event Details</h2>
                                <p className="text-gray-600 mb-4">
                                    Select an event from the timeline or add a new one to see details here.
                                </p>

                                <div className="space-y-4">
                                    {events.slice(0, 3).map((event) => (
                                        <EventCard
                                            key={event.id}
                                            event={event}
                                            onEdit={() => openEditForm(event)}
                                            onDelete={() => handleDeleteEvent(event.id)}
                                            compact
                                        />
                                    ))}
                                    {events.length > 3 && (
                                        <p className="text-sm text-gray-500 text-center">
                                            +{events.length - 3} more events
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {flash.success && (
                    <div className="mt-6">
                        <Alert variant="default" className="mb-4">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Berhasil!</AlertTitle>
                            <AlertDescription>{flash.success}</AlertDescription>
                        </Alert>
                    </div>
                )}
            </div>
        </AuthenticatedAdminLayout>
    );
}
