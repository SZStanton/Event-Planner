import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEvents from '../context/useEvents';

//=== ADD EVENT PAGE ===
// Allows users to create a new event
function AddEvent() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Handle form submit
  const handleSubmit = e => {
    e.preventDefault();

    // Basic validation
    if (!name || !date || !time || !location || !description) {
      setError('Please fill in all fields.');
      return;
    }

    // Add mew event
    addEvent({
      name,
      date,
      time,
      location,
      description,
    });

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

      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Event form */}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Event Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter event name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter event description"
          ></textarea>
        </div>

        {/* Submit button */}
        <button className="btn btn-success">Save Event</button>
      </form>
    </div>
  );
}

export default AddEvent;

