"use client"

import { useState } from "react";
import Sidebar from "@/app/(admin)/admin/components/Sidebar"
import { Menu,Upload,} from 'lucide-react';
import axios from "axios";
// import { title } from "process";




const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    catogery: string;
    file: File | null;
  }>({
    title: '',
    description: '',
    catogery: '',
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const file = e.target.files[0];
  //   setFormData(prev => ({
  //     ...prev,
  //     file: file
  //   }));
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      file: file
    }));
  }
};


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('catogery', formData.catogery);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      // Simulate API call (replace with your actual endpoint)
    //   await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await axios.post("/api/gallery",formDataToSend,{
        headers:{
            'Content-Type':"multipart/form-data",
        },
      });
      console.log(response);
      
      setSubmitMessage('Gallery item uploaded successfully!');
      setFormData({
        title: '',
        description: '',
        catogery: '',
        file: null
      });
      
    } catch (error:unknown) {
      console.log(error)
      setSubmitMessage('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-black  px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden mr-4 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-yellow-400">Dashboard</h1>
          </div>
          <div className="text-yellow-300 text-sm">
            Welcome back, Admin
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto bg-black">
          <div className="max-w-4xl mx-auto">
            {/* Stats Cards */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black border border-yellow-400 rounded-xl p-6 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Total Images</p>
                    <p className="text-3xl font-bold text-yellow-400 mt-2">247</p>
                  </div>
                  <div className="bg-yellow-400 bg-opacity-20 p-3 rounded-lg">
                    <Image className="text-yellow-400" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-black border border-yellow-400 rounded-xl p-6 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Categories</p>
                    <p className="text-3xl font-bold text-yellow-400 mt-2">12</p>
                  </div>
                  <div className="bg-yellow-400 bg-opacity-20 p-3 rounded-lg">
                    <Home className="text-yellow-400" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-black border border-yellow-400 rounded-xl p-6 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Recent Uploads</p>
                    <p className="text-3xl font-bold text-yellow-400 mt-2">23</p>
                  </div>
                  <div className="bg-yellow-400 bg-opacity-20 p-3 rounded-lg">
                    <Upload className="text-yellow-400" size={24} />
                  </div>
                </div>
              </div>
            </div> */}

            {/* Upload Form */}
            <div className="bg-black border border-yellow-400 rounded-xl p-8 shadow-xl w-[60%] mx-auto">
              <div className="flex items-center mb-6">
                <Upload className="text-yellow-400 mr-3" size={28} />
                <h2 className="text-2xl font-bold text-yellow-400">Upload New Gallery Item</h2>
              </div>

              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label htmlFor="title" className="block text-yellow-300 text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter image title"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label htmlFor="description" className="block text-yellow-300 text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Enter image description"
                  />
                </div>

                {/* Category Input */}
                <div>
                  <label htmlFor="catogery" className="block text-yellow-300 text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    id="catogery"
                    name="catogery"
                    value={formData.catogery}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a category</option>
                    <option value="nature">Nature</option>
                    <option value="architecture">Architecture</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                    <option value="abstract">Abstract</option>
                    <option value="wildlife">Wildlife</option>
                    <option value="street">Street Photography</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                {/* File Input */}
                <div>
                  <label htmlFor="file-input" className="block text-yellow-300 text-sm font-medium mb-2">
                    Upload Image *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="file-input"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black file:font-medium hover:file:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  {formData.file && (
                    <p className="mt-2 text-sm text-yellow-300">
                      Selected: {formData.file.name}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-black transition-all duration-200 transform hover:scale-105 ${
                      isSubmitting 
                        ? 'bg-yellow-600 cursor-not-allowed' 
                        : 'bg-yellow-400 hover:bg-yellow-300 hover:shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                        Uploading...
                      </div>
                    ) : (
                      'Upload to Gallery'
                    )}
                  </button>
                </div>

                {/* Submit Message */}
                {submitMessage && (
                  <div className={`p-4 rounded-lg ${
                    submitMessage.includes('Error') 
                      ? 'bg-red-900 border border-red-500 text-red-200' 
                      : 'bg-green-900 border border-green-500 text-green-200'
                  }`}>
                    {submitMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;