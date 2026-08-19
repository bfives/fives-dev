// Shared package data and order helpers for the checkout flow.

const PACKAGES = {
  starter: {
    id: "starter",
    name: "Starter",
    price: "R1,500",
    priceNote: "once-off",
    tagline: "A polished one-page site to get you online fast.",
    delivery: "3–5 business days",
    revisions: "2 rounds of revisions",
  },
  business: {
    id: "business",
    name: "Business",
    price: "R3,000",
    priceNote: "once-off",
    tagline: "A multi-page site built to grow your business.",
    delivery: "7–10 business days",
    revisions: "3 rounds of revisions",
  },
  ecommerce: {
    id: "ecommerce",
    name: "E-Commerce",
    price: "From R5,500",
    priceNote: "once-off",
    tagline: "A full online store engineered to sell.",
    delivery: "10–14 business days",
    revisions: "Unlimited within scope",
  },
  custom: {
    id: "custom",
    name: "Custom Quote",
    price: "Let's talk",
    priceNote: "scoped per project",
    tagline: "Bespoke builds, integrations and platforms.",
    delivery: "Scoped per project",
    revisions: "Defined in your proposal",
  },
};

const ORDER_KEY = "fivesdev.order";

function generateOrderId() {
  const rand = Math.floor(10000 + Math.random() * 90000);
  const year = new Date().getFullYear();
  return `FD-${year}-${rand}`;
}

function saveOrder(data) {
  sessionStorage.setItem(ORDER_KEY, JSON.stringify(data));
}

function loadOrder() {
  const raw = sessionStorage.getItem(ORDER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}