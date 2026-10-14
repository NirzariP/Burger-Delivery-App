// src/data/coupons.js — quick version to start
export const coupons = [
  { code: "WELCOME10", label: "10% off your first order", type: "percent", value: 10 },
  { code: "SAVE5", label: "$5 off orders over $20", type: "flat", value: 5, minTotal: 20 },
  { code: "BURGER20", label: "20% off, max $8 discount", type: "percent", value: 20, maxDiscount: 8 },
];