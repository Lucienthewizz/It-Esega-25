"use client"

import { useState } from "react"
import type { Event } from "@/types/event"
import { EventCard } from "./event-card"
import { Button } from "@/components/ui/button"
import { Calendar, Filter, CheckCircle2, Clock } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EventTimelineProps {
    events: Event[]
    onEdit: (event: Event) => void
    onDelete: (id: number) => void
}

export function EventTimeline({ events, onEdit, onDelete }: EventTimelineProps) {
    const [filter, setFilter] = useState<string | null>(null)

    const categories = Array.from(new Set(events.map((event) => event.category)))

    const filteredEvents = filter ? events.filter((event) => event.category === filter) : events

    const sortedEvents = [...filteredEvents].sort((a, b) => a.due_date.getTime() - b.due_date.getTime())

    const isEventPassed = (date: Date) => {
        return date < new Date()
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                        {sortedEvents.length} event{sortedEvents.length !== 1 ? "s" : ""}
                    </span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            {filter ? `Filter: ${filter}` : "Filter"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => setFilter(null)}>All Categories</DropdownMenuItem>
                            {categories.map((category) => (
                                <DropdownMenuItem key={category} onClick={() => setFilter(category)}>
                                    {category}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                <div className="space-y-6">
                    {sortedEvents.length > 0 ? (
                        sortedEvents.map((event) => (
                            <div key={event.id} className="relative pl-12">
                                <div
                                    className={`absolute left-5 top-6 w-6 h-6 rounded-full bg-white transform -translate-x-3 -translate-y-1.5 flex items-center justify-center ring-4 ring-white`}
                                >
                                    {isEventPassed(event.due_date) ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <Clock className="h-5 w-5 text-blue-500" />
                                    )}
                                </div>
                                <EventCard event={event} onEdit={() => onEdit(event)} onDelete={() => onDelete(event.id)} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">No events found. Add your first event to get started.</div>
                    )}
                </div>
            </div>
        </div>
    )
}
