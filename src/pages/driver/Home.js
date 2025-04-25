import React, { useEffect, useState } from 'react';

// Adicione _ para variáveis que serão usadas depois
const [rideStatus, setRideStatus] = useState(null);
const [_eta, _setEta] = useState(null);
const [_distanceToPassenger, _setDistanceToPassenger] = useState(null);
const [_showNotification, _setShowNotification] = useState(false);
const [_rideStage, _setRideStage] = useState('waiting');

// Corrigir os useEffects
useEffect(() => {
  if (isAvailable) {
    // seu código aqui
  }
}, [isAvailable]);

useEffect(() => {
  if (rideRequest && rideRequest.timeoutId) {
    calculateDistance();
    calculateRouteToPassenger();
    handleRejectRide();
    return () => clearTimeout(rideRequest.timeoutId);
  }
}, [rideRequest, calculateDistance, calculateRouteToPassenger, handleRejectRide]);

useEffect(() => {
  if (socket) {
    // seu código aqui
  }
}, [socket]);

useEffect(() => {
  if (currentRide) {
    // seu código aqui
  }
}, [currentRide]); 