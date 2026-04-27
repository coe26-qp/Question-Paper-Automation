import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function EditQuestionModal({ question, onSave, onClose }) {
  const [form, setForm] = useState({ ...question });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-2 border-b">
            <h2 className="text-lg font-bold text-gray-800">
              Edit Question
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-2">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Question Text
              </label>
              <textarea
                name="question"
                value={form.question}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-40 min-h-20"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "marks", label: "Marks" },
                { name: "co", label: "CO" },
                { name: "bloomsTaxonomy", label: "Bloom's Taxonomy" },
                { name: "level", label: "Level" },
                { name: "part", label: "Part" },
                { name: "type", label: "Type" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs font-medium text-gray-500">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(form)}
              className="rounded-lg px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
