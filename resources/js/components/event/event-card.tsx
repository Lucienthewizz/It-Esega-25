"use client"

import type { Event } from "@/types/event"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Edit, Trash2, CheckCircle2 } from "lucide-react"
import { formatDate, formatTime } from "@/utils/formated-date"

interface EventCardProps {
    event: Event
    onEdit: () => void
    onDelete: () => void
    compact?: boolean
}

export function EventCard({ event, onEdit, onDelete, compact = false }: EventCardProps) {
    const isEventPassed = event.due_date < new Date()

    const statusColor = isEventPassed ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
    const borderColor = isEventPassed ? "border-green-500" : "border-blue-500"

    return (
        <Card className={`overflow-hidden ${compact ? "border-l-4" : "border-t-4"} ${borderColor}`}>
            <CardContent className={compact ? "p-3" : "p-5"}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className={`font-semibold text-gray-900 ${compact ? "text-sm" : "text-lg"}`}>{event.title}</h3>

                        {!compact && <p className="text-gray-600 mt-2 text-sm">{event.description}</p>}

                        <div className={`flex flex-wrap gap-2 ${compact ? "mt-1" : "mt-3"}`}>
                            <div className="flex items-center text-gray-500 text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{formatDate(event.due_date)}</span>
                            </div>

                            <div className="flex items-center text-gray-500 text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{formatTime(event.due_date)}</span>
                            </div>

                            <Badge variant="outline" className="text-xs capitalize">
                                {event.category}
                            </Badge>

                            <Badge className={`text-xs ${statusColor}`}>
                                {isEventPassed ? (
                                    <span className="flex items-center">
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Completed
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        On Progress
                                    </span>
                                )}
                            </Badge>
                        </div>
                    </div>

                    {!compact && (
                        <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onDelete}
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>

            {compact && (
                <CardFooter className="p-2 pt-0 flex justify-end">
                    <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" onClick={onEdit} className="h-7 w-7">
                            <Edit className="h-3 w-3" />
                            <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onDelete}
                            className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="h-3 w-3" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}
