import React from "react"
import { motion } from "framer-motion"

export default function AdminHeader({ title, description, children }) {
    return (
        <motion.section
            className="relative px-4 md:px-8 pt-8 pb-10 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-indigo-50/30 to-purple-50/30" />
            <div className="relative z-10 container mx-auto max-w-7xl">
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-lg text-slate-600 max-w-2xl">
                                {description}
                            </p>
                        )}
                    </div>
                    {children && (
                        <div className="flex items-center gap-3">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </motion.section>
    )
}
