import React, { useState } from "react";

const faqs = [
  {
    question: "¿Qué medios de pago acepta McDonald´s?",
    answer:
      "Puedes realizar tu compra con tarjetas de débito y crédito, Mastercard, Visa.",
  },
  {
    question: "¿Cómo puedo cancelar mi pedido?",
    answer:
      "Si aún no fue preparado, puedes cancelarlo rápidamente desde el botón 'Cancelar pedido' que se encuentra en la pantalla de confirmación. De lo contrario, comunícate por el formulario de contacto, para que podamos brindarte una solución personalizada.",
  },
  {
    question: "Seguimiento del estado de mi pedido",
    answer:
      "Desde el Menú, Mis Pedidos, seleccionando la opción Pedidos en Curso, puedes seguir en tiempo real el estado del mismo, o también hacer clic en el link que figura en el email de confirmación de pedido recibido.",
  },
  {
    question: "Mi pedido no llegó como esperaba",
    answer:
      "¡Lamentamos el inconveniente! Si tu pedido llegó frío, incompleto o tuviste otro inconveniente, comunícate por el formulario de contacto, para que podamos brindarte una solución personalizada.",
  },
  {
    question: "Mi tarjeta ha sido rechazada",
    answer:
      "Si tu tarjeta de débito ha sido rechazada, verifica, en primer lugar, en tu banco emisor si debe ser habilitada para compras en eCommerce, o Compras por internet en tu home banking.",
  },
  {
    question: "Confirmación de compra",
    answer:
      "Recibirás una confirmación de compra por mail con los datos de la transacción y lo verás también reflejado en la app. De no ser así, comunícate por el formulario de contacto, para que podamos brindarte una solución personalizada.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full py-12 bg-transparent">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-white">¿Necesitas alguna razón más?</h2>
        {faqs.map((faq, idx) => (
          <div key={idx} className="mb-6 border-b border-gray-200 pb-4">
            <button
              className="w-full text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggle(idx)}
            >
              <span className="text-lg font-bold text-white">{faq.question}</span>
              <span className="text-2xl text-white">{openIndex === idx ? "˄" : "˅"}</span>
            </button>
            {openIndex === idx && (
              <p className="mt-2 text-white text-base">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
