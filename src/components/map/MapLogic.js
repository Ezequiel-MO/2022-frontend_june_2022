/* import { getCenter } from "geolib"; */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentProject } from "../../redux/features/currentProjectSlice";

export const getCentralCoords = (location) => {
  if (location === "Barcelona") {
    return [2.168665992, 41.385331792];
  } else if (location === "Madrid") {
    return [-3.7033, 40.4167];
  } else return [2.168665992, 41.385331792];
};

const MapLogic = () => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [coords, setCoords] = useState([]);
  const [viewport, setViewport] = useState({});
  const { hotels, schedule, groupLocation } = useSelector(selectCurrentProject);

  const [viewState, setViewState] = useState({
    latitude: getCentralCoords(groupLocation)[1],
    longitude: getCentralCoords(groupLocation)[0],
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    if (hotels.length > 0) {
      const hotelCoords = hotels.map((hotel) => {
        return {
          longitude: hotel.location.coordinates[1],
          latitude: hotel.location.coordinates[0],
          name: hotel.name,
          icon: "carbon:hotel",
          id: hotel._id,
        };
      });
      setCoords((prevState) => [...prevState, ...hotelCoords]);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    schedule.forEach((day) => {
      day.morningEvents.forEach((event) => {
        if (event.location.coordinates.length > 0) {
          setCoords((coords) => [
            ...coords,
            {
              latitude: event.location.coordinates[0],
              longitude: event.location.coordinates[1],
              name: event.name,
              id: event._id,
              icon: "carbon:events",
            },
          ]);
        }
      });
    });
    schedule.forEach((day) => {
      day.lunch.forEach((event) => {
        if (event.location.coordinates.length > 0) {
          setCoords((coords) => [
            ...coords,
            {
              latitude: event.location.coordinates[0],
              longitude: event.location.coordinates[1],
              name: event.name,
              id: event._id,
              icon: "bx:bx-restaurant",
            },
          ]);
        }
      });
    });
    schedule.forEach((day) => {
      day.afternoonEvents.forEach((event) => {
        if (event.location.coordinates.length > 0) {
          setCoords((coords) => [
            ...coords,
            {
              latitude: event.location.coordinates[0],
              longitude: event.location.coordinates[1],
              name: event.name,
              id: event._id,
              icon: "carbon:events",
            },
          ]);
        }
      });
    });
    schedule.forEach((day) => {
      day.dinner.forEach((event) => {
        if (event.location.coordinates.length > 0) {
          setCoords((coords) => [
            ...coords,
            {
              latitude: event.location.coordinates[0],
              longitude: event.location.coordinates[1],
              name: event.name,
              id: event._id,
              icon: "bx:bx-restaurant",
            },
          ]);
        }
      });
    });
    // eslint-disable-next-line
  }, []);

  /* useEffect(() => {
    if (coords.length > 0) {
      const centerObj = getCenter(coords);
      setViewport({
        width: "100%",
        height: "100%",
        latitude: centerObj.latitude,
        longitude: centerObj.longitude,
        zoom: 12,
      });
    }
  }, [coords]); */

  return {
    selectedLocation,
    setSelectedLocation,
    coords,
    viewport,
    setViewport,
    viewState,
    setViewState,
  };
};

export default MapLogic;
