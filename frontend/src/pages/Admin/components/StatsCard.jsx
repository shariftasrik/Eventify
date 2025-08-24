import React from "react"

export default function StatsCard({
    title,
    value,
    icon,
    color = "indigo",
    change,
}) {
    const colorClasses = {
        indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
        green: "bg-green-50 text-green-700 border-green-200",
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        purple: "bg-purple-50 text-purple-700 border-purple-200",
        orange: "bg-orange-50 text-orange-700 border-orange-200",
    }

    return (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                        {title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                    {change && (
                        <p
                            className={`text-sm ${
                                change > 0 ? "text-green-600" : "text-red-600"
                            }`}>
                            {change > 0 ? "+" : ""}
                            {change}% from last month
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
        </div>
    )
}
