import { useState, useEffect } from 'react';
import axios from 'axios';
import { Property } from '../types/property';

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('/api/users/me');
        setIsOwner(userResponse.data.is_owner);

        if (userResponse.data.is_owner) {
          const propertiesResponse = await axios.get('/api/properties/my_properties');
          setProperties(propertiesResponse.data);
        } else {
          // Fetch tenant's property
          const tenantResponse = await axios.get('/api/tenants/me');
          if (tenantResponse.data.property) {
            setProperties([tenantResponse.data.property]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {isOwner ? (
        <div>
          <h2>My Properties</h2>
          {properties.map((property) => (
            <div key={property.id}>
              <h3>{property.address}</h3>
              <p>{property.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>My Rental</h2>
          {properties.length > 0 && (
            <div>
              <h3>{properties[0].address}</h3>
              <p>{properties[0].description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}