import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/ParkDetails.css';

export default function ParkDetails() {
  const [rides, setRides] = useState([]);
  const [parkName, setParkName] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchRideData = async () => {
      try {
        console.log('Fetching data for park ID:', id);
        const response = await fetch(`http://localhost:3000/api/parks/${id}`);
        const data = await response.json();
        console.log('API Response:', data);

        if (data) {
          setRides(data.rides);
          setParkName(data.name);
        } else {
          console.error('Invalid data structure:', data);
          setRides([]);
          setParkName('Theme Park');
        }
      } catch (error) {
        console.error('Error fetching ride data:', error);
        setRides([]);
        setParkName('Error Loading Park');
      }
    };

    fetchRideData();
  }, [id]);

  return (
    <div className="park-details">
      <h1>{parkName || 'Loading...'}</h1>
      <div className="table-container">
        <table className="rides-table">
          <thead>
            <tr>
              <th>Ride Name</th>
              <th>Status</th>
              <th>Wait Time</th>
            </tr>
          </thead>
          <tbody>
            {rides.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-rides">
                  <div className="empty-state">
                    <p>No ride information available at this time</p>
                    <small>Please check back later</small>
                  </div>
                </td>
              </tr>
            ) : (
              rides.map((ride) => (
                <tr key={ride.id || Math.random()}>
                  <td className="ride-name">{ride.name || 'Unknown Ride'}</td>
                  <td>
                    <span className={`status ${ride.is_open ? 'open' : 'closed'}`}>
                      {typeof ride.is_open === 'boolean' ? (ride.is_open ? 'Open' : 'Closed') : 'Unknown'}
                    </span>
                  </td>
                  <td className="wait-time">
                    {ride.is_open && typeof ride.wait_time === 'number' ? (
                      <>
                        <span className="time">{ride.wait_time}</span>
                        <span className="unit">mins</span>
                      </>
                    ) : (
                      <span className="na">N/A</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
             
}
