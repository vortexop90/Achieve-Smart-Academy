"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('updates');
  const [status, setStatus] = useState('');
  
  // Authentication Check
  useEffect(() => {
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('admin_auth='));
    if (!authCookie) {
      router.push('/admin/login');
    }
  }, [router]);

  // Data List State
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // --- Form States ---

  // 1. Updates
  const [updateForm, setUpdateForm] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Notice',
    category: 'General',
    description: '',
    isHighlight: true
  });

  // 2. Gallery
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Events',
    src: ''
  });

  // 3. Courses
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    duration: '',
    level: 'Foundation',
    image: '',
    features: '' // comma separated
  });

  // 4. Events
  const [eventForm, setEventForm] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Celebration',
    description: '',
    location: '',
    status: 'Upcoming'
  });

  // 5. Results
  const [resultForm, setResultForm] = useState({
    name: '',
    class: '',
    score: '',
    subject: '',
    image: ''
  });

  // 6. Director
  const [directorForm, setDirectorForm] = useState({
    name: '',
    role: '',
    image: '',
    qualifications: '',
    experience: '',
    message: '',
    vision: '',
    values: '',
    commitment: ''
  });

  // --- Fetch Data ---

  const fetchItems = useCallback(async () => {
    if (activeTab === 'director') return;
    
    try {
      const res = await fetch(`/api/${activeTab}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  }, [activeTab]);

  // Fetch Director Info or List Items on Tab Change
  useEffect(() => {
    setStatus('');
    setEditingId(null);
    
    // Reset forms to default when switching tabs
    resetForms();

    if (activeTab === 'director') {
      fetch('/api/director')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setDirectorForm(data.data);
          }
        });
    } else {
      fetchItems();
    }
  }, [activeTab, fetchItems]);

  const resetForms = () => {
    setUpdateForm({
      title: '',
      date: new Date().toISOString().split('T')[0],
      type: 'Notice',
      category: 'General',
      description: '',
      isHighlight: true
    });
    setGalleryForm({
      title: '',
      category: 'Events',
      src: ''
    });
    setCourseForm({
      title: '',
      description: '',
      duration: '',
      level: 'Foundation',
      image: '',
      features: ''
    });
    setEventForm({
      title: '',
      date: new Date().toISOString().split('T')[0],
      type: 'Celebration',
      description: '',
      location: '',
      status: 'Upcoming'
    });
    setResultForm({
      name: '',
      class: '',
      score: '',
      subject: '',
      image: ''
    });
  };

  // --- Action Handlers ---

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setStatus('Editing item...');
    
    if (activeTab === 'updates') {
      setUpdateForm({
        ...item,
        date: item.date ? item.date.split('T')[0] : '',
      });
    } else if (activeTab === 'gallery') {
      setGalleryForm(item);
    } else if (activeTab === 'courses') {
      setCourseForm({
        ...item,
        features: Array.isArray(item.features) ? item.features.join(', ') : item.features || ''
      });
    } else if (activeTab === 'events') {
      setEventForm({
        ...item,
        date: item.date ? item.date.split('T')[0] : '',
      });
    } else if (activeTab === 'results') {
      setResultForm(item);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const res = await fetch(`/api/${activeTab}?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setStatus('Item deleted successfully');
        fetchItems();
        if (editingId === id) {
            setEditingId(null);
            resetForms();
        }
      } else {
        setStatus('Failed to delete item');
      }
    } catch (err) {
      setStatus('Error deleting item');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForms();
    setStatus('');
  };

  // --- Submit Handlers ---

  const handleSubmit = async (endpoint: string, data: any, resetFn?: () => void, successMsg = 'Saved successfully!') => {
    setStatus('Submitting...');
    const method = editingId ? 'PUT' : 'POST';
    const body = editingId ? { ...data, _id: editingId } : data;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      const responseData = await res.json();

      if (res.ok && responseData.success) {
        setStatus(editingId ? 'Updated successfully!' : successMsg);
        if (resetFn) resetFn();
        setEditingId(null);
        fetchItems();
      } else {
        setStatus(`Error: ${responseData.error || 'Failed to save data'}`);
      }
    } catch (err) {
      setStatus('Error submitting form.');
      console.error(err);
    }
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit('/api/updates', updateForm, resetForms, 'Update added!');
  };

  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit('/api/gallery', galleryForm, resetForms, 'Image added!');
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...courseForm,
      features: courseForm.features.split(',').map(f => f.trim()).filter(f => f)
    };
    handleSubmit('/api/courses', payload, resetForms, 'Course added!');
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit('/api/events', eventForm, resetForms, 'Event added!');
  };

  const handleResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit('/api/results', resultForm, resetForms, 'Result added!');
  };

  const handleDirectorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit('/api/director', directorForm, undefined, 'Director info updated!');
  };

  // --- Render Helpers ---

  const TabButton = ({ id, label }: { id: string, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === id ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
    >
      {label}
    </button>
  );

  const ListItem = ({ title, subtitle, item }: { title: string, subtitle?: string, item: any }) => (
    <div className="flex justify-between items-center p-4 bg-white border rounded shadow-sm hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex gap-2">
        <button 
            onClick={() => handleEdit(item)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
            Edit
        </button>
        <button 
            onClick={() => handleDelete(item._id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
            Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button onClick={() => router.push('/')} className="text-blue-600 hover:underline">Back to Site</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden min-h-[600px]">
          {/* Scrollable Tabs */}
          <div className="flex border-b overflow-x-auto">
            <TabButton id="updates" label="Updates" />
            <TabButton id="gallery" label="Gallery" />
            <TabButton id="courses" label="Courses" />
            <TabButton id="events" label="Events" />
            <TabButton id="results" label="Results" />
            <TabButton id="director" label="Director Info" />
            <TabButton id="messages" label="Messages" />
          </div>

          <div className="p-6">
            {status && (
              <div className={`p-4 mb-6 rounded flex justify-between items-center ${status.includes('Error') || status.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                <span>{status}</span>
                {editingId && (
                    <button onClick={handleCancelEdit} className="text-sm underline ml-4">Cancel Edit</button>
                )}
              </div>
            )}

            {/* --- UPDATES TAB --- */}
            {activeTab === 'updates' && (
              <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <form onSubmit={handleUpdateSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Update' : 'Add New Update / Notice'}</h2>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" required className="w-full p-2 border rounded" value={updateForm.title} onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="date" required className="w-full p-2 border rounded" value={updateForm.date} onChange={(e) => setUpdateForm({ ...updateForm, date: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select className="w-full p-2 border rounded" value={updateForm.type} onChange={(e) => setUpdateForm({ ...updateForm, type: e.target.value })}>
                            <option>Notice</option>
                            <option>Homework</option>
                            <option>Test</option>
                            </select>
                        </div>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea required rows={4} className="w-full p-2 border rounded" value={updateForm.description} onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })} />
                        </div>
                        <div className="flex items-center gap-2">
                             <input type="checkbox" id="isHighlight" checked={updateForm.isHighlight} onChange={(e) => setUpdateForm({...updateForm, isHighlight: e.target.checked})} />
                             <label htmlFor="isHighlight" className="text-sm text-gray-700">Highlight this update (New)</label>
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">{editingId ? 'Update Notice' : 'Post Notice'}</button>
                            {editingId && <button type="button" onClick={handleCancelEdit} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>}
                        </div>
                    </form>
                  </div>
                  
                  <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Existing Updates</h3>
                      <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {items.length === 0 && <p className="text-gray-500 italic">No updates found.</p>}
                        {items.map((item: any) => (
                            <ListItem 
                                key={item._id} 
                                title={item.title} 
                                subtitle={`${item.type} • ${new Date(item.date).toLocaleDateString()}`}
                                item={item}
                            />
                        ))}
                      </div>
                  </div>
              </div>
            )}

            {/* --- GALLERY TAB --- */}
            {activeTab === 'gallery' && (
              <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <form onSubmit={handleGallerySubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Image' : 'Add Gallery Image'}</h2>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" required className="w-full p-2 border rounded" value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} />
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className="w-full p-2 border rounded" value={galleryForm.category} onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}>
                            <option>Events</option>
                            <option>Classroom</option>
                            <option>Labs</option>
                            <option>Facilities</option>
                        </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input type="url" required className="w-full p-2 border rounded" value={galleryForm.src} onChange={(e) => setGalleryForm({ ...galleryForm, src: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">{editingId ? 'Update Image' : 'Add to Gallery'}</button>
                            {editingId && <button type="button" onClick={handleCancelEdit} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>}
                        </div>
                    </form>
                  </div>

                  <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Gallery Items</h3>
                      <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {items.length === 0 && <p className="text-gray-500 italic">No images found.</p>}
                        {items.map((item: any) => (
                            <ListItem 
                                key={item._id} 
                                title={item.title} 
                                subtitle={item.category}
                                item={item}
                            />
                        ))}
                      </div>
                  </div>
              </div>
            )}

            {/* --- COURSES TAB --- */}
            {activeTab === 'courses' && (
              <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <form onSubmit={handleCourseSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Course' : 'Add New Course'}</h2>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                        <input type="text" required className="w-full p-2 border rounded" value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} />
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea required rows={3} className="w-full p-2 border rounded" value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input type="text" required placeholder="e.g. 12 Months" className="w-full p-2 border rounded" value={courseForm.duration} onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                            <input type="text" required placeholder="e.g. Foundation" className="w-full p-2 border rounded" value={courseForm.level} onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })} />
                        </div>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                        <input type="text" placeholder="Mock Tests, Study Material, Expert Faculty" className="w-full p-2 border rounded" value={courseForm.features} onChange={(e) => setCourseForm({ ...courseForm, features: e.target.value })} />
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input type="url" required className="w-full p-2 border rounded" value={courseForm.image} onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">{editingId ? 'Update Course' : 'Add Course'}</button>
                            {editingId && <button type="button" onClick={handleCancelEdit} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>}
                        </div>
                    </form>
                  </div>

                  <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Existing Courses</h3>
                      <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {items.length === 0 && <p className="text-gray-500 italic">No courses found.</p>}
                        {items.map((item: any) => (
                            <ListItem 
                                key={item._id} 
                                title={item.title} 
                                subtitle={`${item.level} • ${item.duration}`}
                                item={item}
                            />
                        ))}
                      </div>
                  </div>
              </div>
            )}

            {/* --- EVENTS TAB --- */}
            {activeTab === 'events' && (
              <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <form onSubmit={handleEventSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Event' : 'Add Event'}</h2>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                        <input type="text" required className="w-full p-2 border rounded" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="date" required className="w-full p-2 border rounded" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select className="w-full p-2 border rounded" value={eventForm.type} onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}>
                            <option>Celebration</option>
                            <option>Competition</option>
                            <option>Workshop</option>
                            </select>
                        </div>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select className="w-full p-2 border rounded" value={eventForm.status} onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })}>
                            <option>Upcoming</option>
                            <option>Completed</option>
                            <option>Coming Soon</option>
                            </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input type="text" className="w-full p-2 border rounded" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea required rows={3} className="w-full p-2 border rounded" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700">{editingId ? 'Update Event' : 'Add Event'}</button>
                            {editingId && <button type="button" onClick={handleCancelEdit} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>}
                        </div>
                    </form>
                  </div>

                  <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Existing Events</h3>
                      <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {items.length === 0 && <p className="text-gray-500 italic">No events found.</p>}
                        {items.map((item: any) => (
                            <ListItem 
                                key={item._id} 
                                title={item.title} 
                                subtitle={`${new Date(item.date).toLocaleDateString()} • ${item.status}`}
                                item={item}
                            />
                        ))}
                      </div>
                  </div>
              </div>
            )}

            {/* --- RESULTS TAB --- */}
            {activeTab === 'results' && (
              <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <form onSubmit={handleResultSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Result' : 'Add Topper / Result'}</h2>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                        <input type="text" required className="w-full p-2 border rounded" value={resultForm.name} onChange={(e) => setResultForm({ ...resultForm, name: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Class/Year</label>
                            <input type="text" required placeholder="e.g. Class 10 (2024)" className="w-full p-2 border rounded" value={resultForm.class} onChange={(e) => setResultForm({ ...resultForm, class: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Score / %</label>
                            <input type="text" required placeholder="e.g. 98.6%" className="w-full p-2 border rounded" value={resultForm.score} onChange={(e) => setResultForm({ ...resultForm, score: e.target.value })} />
                        </div>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Achievement Title</label>
                        <input type="text" required placeholder="e.g. School Topper" className="w-full p-2 border rounded" value={resultForm.subject} onChange={(e) => setResultForm({ ...resultForm, subject: e.target.value })} />
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student Image URL</label>
                        <input type="url" required className="w-full p-2 border rounded" value={resultForm.image} onChange={(e) => setResultForm({ ...resultForm, image: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700">{editingId ? 'Update Result' : 'Add Result'}</button>
                            {editingId && <button type="button" onClick={handleCancelEdit} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>}
                        </div>
                    </form>
                  </div>

                  <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Existing Results</h3>
                      <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {items.length === 0 && <p className="text-gray-500 italic">No results found.</p>}
                        {items.map((item: any) => (
                            <ListItem 
                                key={item._id} 
                                title={item.name} 
                                subtitle={`${item.class} • ${item.score}`}
                                item={item}
                            />
                        ))}
                      </div>
                  </div>
              </div>
            )}

            {/* --- DIRECTOR TAB --- */}
            {activeTab === 'director' && (
              <form onSubmit={handleDirectorSubmit} className="space-y-4 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Update Director's Info</h2>
                <div className="bg-blue-50 p-4 rounded text-sm text-blue-800 mb-4">
                  This form updates the content on the Director's page. All fields are required.
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" required className="w-full p-2 border rounded" value={directorForm.name} onChange={(e) => setDirectorForm({ ...directorForm, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input type="text" required className="w-full p-2 border rounded" value={directorForm.role} onChange={(e) => setDirectorForm({ ...directorForm, role: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="url" required className="w-full p-2 border rounded" value={directorForm.image} onChange={(e) => setDirectorForm({ ...directorForm, image: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                  <input type="text" required className="w-full p-2 border rounded" value={directorForm.qualifications} onChange={(e) => setDirectorForm({ ...directorForm, qualifications: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input type="text" required className="w-full p-2 border rounded" value={directorForm.experience} onChange={(e) => setDirectorForm({ ...directorForm, experience: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (Quote)</label>
                  <textarea required rows={4} className="w-full p-2 border rounded" value={directorForm.message} onChange={(e) => setDirectorForm({ ...directorForm, message: e.target.value })} />
                </div>
                <h3 className="font-medium pt-4">Additional Info</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vision Statement</label>
                  <textarea rows={2} className="w-full p-2 border rounded" value={directorForm.vision} onChange={(e) => setDirectorForm({ ...directorForm, vision: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Values Statement</label>
                  <textarea rows={2} className="w-full p-2 border rounded" value={directorForm.values} onChange={(e) => setDirectorForm({ ...directorForm, values: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commitment Statement</label>
                  <textarea rows={2} className="w-full p-2 border rounded" value={directorForm.commitment} onChange={(e) => setDirectorForm({ ...directorForm, commitment: e.target.value })} />
                </div>
                <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Update Director Info</button>
              </form>
            )}

            {/* --- MESSAGES TAB --- */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Contact Messages</h2>
                    <span className="text-sm text-gray-500">{items.length} messages</span>
                  </div>
                  <div className="space-y-4">
                    {items.length === 0 && <p className="text-gray-500 italic">No messages found.</p>}
                    {items.map((item: any) => (
                        <div key={item._id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                                        {item.class && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">{item.class}</span>}
                                    </div>
                                    <div className="text-sm text-gray-600 flex flex-col sm:flex-row sm:gap-4">
                                        <a href={`mailto:${item.email}`} className="hover:text-blue-600 flex items-center gap-1">
                                            ✉️ {item.email}
                                        </a>
                                        <a href={`tel:${item.phone}`} className="hover:text-blue-600 flex items-center gap-1">
                                            📞 {item.phone}
                                        </a>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-2">
                                    <span className="text-xs text-gray-400 font-medium">{new Date(item.createdAt).toLocaleString()}</span>
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-500 hover:text-red-700 text-sm hover:bg-red-50 px-2 py-1 rounded transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded text-gray-700 whitespace-pre-wrap border-l-4 border-gray-200">
                                {item.message}
                            </div>
                        </div>
                    ))}
                  </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
