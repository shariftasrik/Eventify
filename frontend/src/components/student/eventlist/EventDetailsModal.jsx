import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function EventDetailsModal({ event, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    semester: "",
    tshirt: "M",
    notes: "",
  });

  const MotionDiv = motion.div;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(event, form);
    onClose();
  };

  return (
    <AnimatePresence>
      {event && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Simple gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30 pointer-events-none" />
            
            {/* Header with image + details */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 relative"
            >
              {/* Image section */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                {event?.photo ? (
                  <motion.img
                    src={event.photo}
                    alt={event.title}
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
                )}
                
                {/* Simple overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* New badge */}
                <div className="absolute top-4 left-4">
                  {event?.newest && (
                    <motion.span
                      className="inline-flex items-center px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold shadow-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      ✨ New
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Details section */}
              <div className="flex flex-col justify-between p-6 relative">
                <div>
                  <motion.h2 
                    className="text-xl md:text-2xl font-bold text-gray-900 mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {event?.title}
                  </motion.h2>
                  
                  <MotionDiv
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                      📅 {event?.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                      👥 {event?.perticipant ?? 0} seats
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      💰 {event?.fee} Tk
                    </span>
                  </MotionDiv>
                </div>

                {/* Simple close button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </MotionDiv>

            {/* Registration form */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="px-6 py-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Complete Your Registration</h3>
                <p className="text-sm text-gray-600">Fill in your details to secure your spot at this event.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "name", placeholder: "Full Name", type: "text", required: true, icon: "👤" },
                  { name: "email", placeholder: "Email Address", type: "email", required: true, icon: "📧" },
                  { name: "phone", placeholder: "Phone Number", type: "tel", required: true, icon: "📱" },
                  { name: "department", placeholder: "Department", type: "text", required: true, icon: "🎓" },
                  { name: "semester", placeholder: "Semester / Year", type: "text", required: false, icon: "📚" },
                ].map((field, index) => (
                  <MotionDiv
                    key={field.name} 
                    className="relative group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                      {field.icon}
                    </div>
                    <input
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border-2 border-gray-200 bg-white pl-10 pr-3 py-2.5 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 hover:border-gray-300"
                    />
                  </MotionDiv>
                ))}

                {/* T-shirt selector */}
                <MotionDiv
                  className="relative group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                >
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                    👕
                  </div>
                  <select
                    name="tshirt"
                    value={form.tshirt}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-2 border-gray-200 bg-white pl-10 pr-3 py-2.5 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 hover:border-gray-300"
                  >
                    <option value="S">T-Shirt Size - S</option>
                    <option value="M">T-Shirt Size - M</option>
                    <option value="L">T-Shirt Size - L</option>
                    <option value="XL">T-Shirt Size - XL</option>
                    <option value="XXL">T-Shirt Size - XXL</option>
                  </select>
                </MotionDiv>

                {/* Notes textarea */}
                <MotionDiv 
                  className="md:col-span-2 relative group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                >
                  <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                    📝
                  </div>
                  <textarea
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Additional notes or special requirements (optional)"
                    className="w-full rounded-lg border-2 border-gray-200 bg-white pl-10 pr-3 py-2.5 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 hover:border-gray-300 resize-none"
                  />
                </MotionDiv>
              </div>

              {/* Footer buttons */}
              <motion.div 
                className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.4 }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Submit Registration
                </button>
              </motion.div>
            </motion.form>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}