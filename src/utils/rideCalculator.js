// Remova ou comente as constantes não utilizadas
const PRICE_PER_KM = 2.5;
const BASE_PRICE = 7.0;
const MIN_PRICE = 10.0;

// Se planeja usar depois, adicione um comentário
// const MULTIPLIERS = {
//   PEAK_HOUR: 1.5,
//   NIGHT_TIME: 1.2,
//   HIGH_DEMAND: 1.3
// }; 

// Exportar apenas o que está sendo usado
export const calculatePrice = (distance) => {
  return Math.max(
    BASE_PRICE + (distance * PRICE_PER_KM),
    MIN_PRICE
  );
};

// Remover ou comentar funções não utilizadas
/*
export const isPeakHour = () => {
  // ... código ...
};

export const isNightTime = () => {
  // ... código ...
};

export const getDemandMultiplier = () => {
  // ... código ...
};
*/ 