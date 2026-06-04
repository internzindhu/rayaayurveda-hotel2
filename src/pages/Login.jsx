import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality is not implemented (demo version)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5E17EB] to-[#7B3FF2]">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-32">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#5E17EB] hover:text-[#4B12BD]">Forgot password?</a>
            </div>

            <button type="submit" className="w-full bg-[#5E17EB] hover:bg-[#4B12BD] text-white py-3 rounded-lg font-semibold transition-colors">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/consultation" className="text-[#5E17EB] hover:text-[#4B12BD] font-semibold">
                Contact us
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t">
            <p className="text-center text-sm text-gray-500">
              This is a demo version. Login functionality is not implemented.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

