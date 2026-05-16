import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useEvents from '../context/useEvents';

//=== EDIT EVENT PAGE ===
// Allows users to edit existing event
function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEvent, updateEvent } = useEvents();

  // Get event immediately (no copying into state via effect)
  const event = getEvent(id);

  // Redirect if event does not exist
  useEffect(() => {
    if (!event) {
      navigate('/');
    }
  }, [event, navigate]);

  // Form state initialized from event (no effect needed)
  const [formData, setFormData] = useState(() => ({
    name: event?.name || '',
    date: event?.date || '',
    time: event?.time || '',
    location: event?.location || '',
    description: event?.description || '',
  }));

  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();

    const { name, date, time, location, description } = formData;

    // Basic validation
    if (!name || !date || !time || !location || !description) {
      setError('Please fill in all fields.');
      return;
    }

    // Update event in context
    updateEvent(id, formData);

    // Return to dashboard
    navigate('/');
  };

  return (
    <div className="container py-4">
      {/* Page heading */}
      <div className="mb-4">
        <h2>Edit Event</h2>
        <p className="text-muted mb-0">Update your existing event</p>
      </div>

      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Edit form */}
      <form className="card p-4 shadow-sm event-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Event Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter event name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Description</label>

          <textarea
            rows="4"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
          ></textarea>
        </div>

        {/* Submit button */}
        <button className="btn btn-warning">Update Event</button>
      </form>
    </div>
  );
}

export default EditEvent;

