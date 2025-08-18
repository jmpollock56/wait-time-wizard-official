import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../style/ParkDetails.css';

export default function ParkDetails() {
  const [rides, setRides] = useState([]);
  const [parkName, setParkName] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
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

  const sortData = (rides) => {
    if (!sortConfig.key) return rides;

    return [...rides].sort((a, b) => {
      if (sortConfig.key === 'wait_time') {
        return sortConfig.direction === 'ascending' 
          ? a.wait_time - b.wait_time 
          : b.wait_time - a.wait_time;
      }
      if (sortConfig.key === 'is_open') {
        return sortConfig.direction === 'ascending'
          ? (a.is_open === b.is_open ? 0 : a.is_open ? -1 : 1)
          : (a.is_open === b.is_open ? 0 : a.is_open ? 1 : -1);
      }
      // Sort by name
      return sortConfig.direction === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  };

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' 
        ? 'descending' 
        : 'ascending',
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <div className="park-details">
      <h1>{parkName || 'Loading...'}</h1>
      <div className="table-container">
        <table className="rides-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('name')} className="sortable">
                Ride Name {getSortIcon('name')}
              </th>
              <th onClick={() => requestSort('is_open')} className="sortable">
                Status {getSortIcon('is_open')}
              </th>
              <th onClick={() => requestSort('wait_time')} className="sortable">
                Wait Time {getSortIcon('wait_time')}
              </th>
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
              sortData(rides).map((ride) => (
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
