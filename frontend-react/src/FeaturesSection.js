import React from "react";

const features = [
  {
    title: "Pide a casa o recoge tu pedido en el restaurante que prefieras",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="60" height="40" rx="10" fill="#FFD600"/>
        <rect x="25" y="35" width="30" height="15" rx="4" fill="#fff"/>
        <circle cx="30" cy="60" r="5" fill="#FFD600"/>
        <circle cx="50" cy="60" r="5" fill="#FFD600"/>
        <rect x="35" y="40" width="10" height="5" rx="2" fill="#FFBC0D"/>
      </svg>
    ),
  },
  {
    title: "Disfruta de grandes descuentos y beneficios solo por registrarte",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="40" height="40" rx="20" fill="#FFD600"/>
        <rect x="30" y="35" width="20" height="10" rx="5" fill="#fff"/>
        <rect x="37" y="45" width="6" height="10" rx="3" fill="#FFBC0D"/>
        <circle cx="40" cy="32" r="4" fill="#FFBC0D"/>
      </svg>
    ),
  },
  {
    title: "La experiencia del restaurante 100% pensada para ti y para los tuyos",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="35" width="50" height="20" rx="10" fill="#FFD600"/>
        <circle cx="30" cy="55" r="6" fill="#fff"/>
        <circle cx="50" cy="55" r="6" fill="#fff"/>
        <text x="40" y="50" textAnchor="middle" fontSize="24" fill="#FFBC0D" fontWeight="bold">%</text>
      </svg>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full py-12 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
