import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEvents from '../context/useEvents';
import EventForm from '../components/EventForm';

//=== ADD EVENT PAGE ===
// Allows users to create a new event
function AddEvent() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Handle form submit
  const handleSubmit = formData => {
    const { name, date, time, location, description } = formData;

    // Basic validation
    if (!name || !date || !time || !location || !description) {
      setError('Please fill in all fields.');
      return;
    }

    // Add new event to context
    addEvent(formData);

    // Redirect back to dashboard
    navigate('/');
  };

  return (
    <div className="container py-4">
      {/* Page heading */}
      <div className="mb-4">
        <h2>Add Event</h2>
        <p className="text-muted mb-0">Create a new event</p>
      </div>

      {/* Event form */}
      <EventForm
        initialValues={{
          name: '',
          date: '',
          time: '',
          location: '',
          description: '',
        }}
        onSubmit={handleSubmit}
        submitLabel="Save Event"
        errorMessage={error}
      />
    </div>
  );
}

export default AddEvent;

