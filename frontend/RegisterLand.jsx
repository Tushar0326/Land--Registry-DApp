import { useState } from "react";
import { motion } from "framer-motion";

const RegisterLand = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    id: "",
    location: "",
    area: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <motion.div
      className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-xl dark:bg-gray-900"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
        Register Land
      </h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-600 dark:text-gray-300">Land ID</label>
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 dark:text-gray-300">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 dark:text-gray-300">Area (sq. ft.)</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register Land
        </motion.button>
      </form>
    </motion.div>
  );
};

export default RegisterLand;
