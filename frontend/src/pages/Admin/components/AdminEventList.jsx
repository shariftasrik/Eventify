import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AdminEventCard from "./AdminEventCard"
import Pagination from "../../../components/Pagination"

export default function AdminEventList({ events, onEdit, onDelete }) {
    const [currentPage, setCurrentPage] = useState(1)
    const PAGE_SIZE = 6

    // Reset to page 1 when events change
    useEffect(() => {
        setCurrentPage(1)
    }, [events])

    // Pagination math
    const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE))
    const start = (currentPage - 1) * PAGE_SIZE
    const pageItems = events.slice(start, start + PAGE_SIZE)

    if (events.length === 0) {
        return (
            <div className="col-span-full rounded-xl border border-dashed p-8 text-center text-slate-500">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-slate-700 mb-2">
                    No events found
                </h3>
                <p className="text-slate-500">
                    Create your first event to get started!
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Events Grid */}
            <motion.div
                className="grid gap-6 sm:gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                initial="hidden"
                animate="show"
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.05 } },
                }}>
                <AnimatePresence mode="wait">
                    {pageItems.map((event) => (
                        <motion.div
                            key={event.id}
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                show: { opacity: 1, y: 0 },
                            }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}>
                            <AdminEventCard
                                event={event}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                    <p className="mt-3 text-center text-xs text-slate-500">
                        Showing {events.length === 0 ? 0 : start + 1}–
                        {Math.min(start + PAGE_SIZE, events.length)} of{" "}
                        {events.length} events
                    </p>
                </div>
            )}
        </div>
    )
}
