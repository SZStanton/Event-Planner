import { Link } from 'react-router-dom';
import useEvents from '../context/useEvents';

//=== DASHBOARD PAGE ===
// Displays all upcoming events
function Dashboard() {
  const { events, deleteEvent } = useEvents();

  return (
    <div className="container py-4">
      {/* Dashboard heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Dashboard</h2>
          <p className="text-muted mb-0">Manage your upcoming events</p>
        </div>

        {/* Dashboard heading */}
        <Link to="/add" className="btn btn-primary">
          Add Event
        </Link>
      </div>

      {/* Dashboard heading */}
      {events.length === 0 && (
        <div className="alert alert-info">No events added yet.</div>
      )}

      {/* Dashboard heading */}
      <div className="row g-3">
        {events.map(event => (
          <div className="col-12 col-md-6 col-lg-4" key={event.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                {/* Dashboard heading */}
                <h5 className="card-title">{event.name}</h5>

                {/* Dashboard heading */}
                <p className="mb-2">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="mb-2">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="mb-2">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="card-text">{event.description}</p>

                {/* Dashboard heading */}
                <div className="mt-auto d-flex gap-2">
                  {/* Dashboard heading */}
                  <Link
                    to={`/edit/${event.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>

                  {/* Dashboard heading */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEvent(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

