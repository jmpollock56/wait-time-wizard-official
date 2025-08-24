import { Link } from 'react-router-dom';
import '../style/Park.css'
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css';

export default function Park({park, searchTerm = ''}) {
  const companyParks = park.parks;
  const searchLower = searchTerm.toLowerCase();

  return (
    <div className="d-flex flex-column park">
      <div className="title">{park.name}</div>
      <div className="park-list d-flex flex-column">
       {companyParks.map((p) => {
          const isMatch = searchLower && p.name.toLowerCase().includes(searchLower);
          return (park.name || park.parks.length > 0) ? (
            <Link 
              to={`/park/${p.id}`} 
              key={p.id} 
              className={`park-link ${isMatch ? 'highlight' : ''}`}
            >
              {p.name}
            </Link>
          ) : (
            <Skeleton />
          );
        })}
      </div>
    </div>
  );
}
