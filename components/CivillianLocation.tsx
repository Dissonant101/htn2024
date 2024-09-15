import { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Id } from "../convex/_generated/dataModel"; // Import Id correctly
import { useGeolocation } from '../contexts/GeolocationContext';

interface Position {
  latitude: number | null;
  longitude: number | null;
}

const CivilianLocation: React.FC = () => {
    const { position }: { position: Position } = useGeolocation();
    const addCoordinate = useMutation(api.tasks.add);
    const editCoordinate = useMutation(api.tasks.edit);
    const removeCoordinate = useMutation(api.tasks.remove);
  
    const [coordinateId, setCoordinateId] = useState<Id<"coordinates"> | null>(null);
  
    useEffect(() => {
      const handleAddCoordinate = async () => {
        if (position.latitude !== null && position.longitude !== null) {
          const lat = position.latitude;
          const long = position.longitude;
          const result = await addCoordinate({ lat, long });
          const newCoordinate = result
          setCoordinateId(newCoordinate);
        }
      };
  

      if (coordinateId == null) {
        handleAddCoordinate();
      }
  
      const intervalId = setInterval(async () => {
        if (coordinateId && position.latitude !== null && position.longitude !== null) {
          const lat = position.latitude;
          const long = position.longitude;
          if (coordinateId) await editCoordinate({ id: coordinateId, lat, long });
        }
      }, 10000);
  
      return () => {
        clearInterval(intervalId);
        if (coordinateId) {
          removeCoordinate({ id: coordinateId });
        }
      };
    }, [position, coordinateId, addCoordinate, editCoordinate, removeCoordinate]);
  
    return <div></div>;
  };
  
  export default CivilianLocation;  



