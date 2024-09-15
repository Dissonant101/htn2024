import { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Id } from "../convex/_generated/dataModel";
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
    let intervalId: NodeJS.Timeout;

    const handleAddCoordinate = async () => {
      if (position.latitude !== null && position.longitude !== null) {
        const lat = position.latitude;
        const long = position.longitude;
        const result = await addCoordinate({ lat, long });
        setCoordinateId(result);
      }
    };

    const handleEditCoordinate = async () => {
      if (coordinateId && position.latitude !== null && position.longitude !== null) {
        const lat = position.latitude;
        const long = position.longitude;
        await editCoordinate({ id: coordinateId, lat, long });
      }
    };

    const handleRemoveCoordinate = async () => {
      if (coordinateId) {
        await removeCoordinate({ id: coordinateId });
      }
    };

    if (position.latitude !== null && position.longitude !== null) {
      if (coordinateId == null) {
        handleAddCoordinate();
      }

      intervalId = setInterval(handleEditCoordinate, 10000);
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      handleRemoveCoordinate();
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [position, coordinateId, addCoordinate, editCoordinate, removeCoordinate]);

  return null;
};

export default CivilianLocation;