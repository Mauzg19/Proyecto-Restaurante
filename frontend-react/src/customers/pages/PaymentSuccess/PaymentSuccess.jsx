import React, { useEffect, useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { green } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartAction } from "../../../State/Customers/Cart/cart.action";
import { api } from "../../../config/api";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [invoice, setInvoice] = useState(null);

  // Suponiendo que el orderId viene en el query string (?orderId=123)
  useEffect(() => {
    dispatch(clearCartAction());
    const params = new URLSearchParams(location.search);
    const orderId = params.get("orderId");
    if (orderId) {
      const jwt = localStorage.getItem("jwt");
      api
        .get(`/api/invoice/${orderId}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => setInvoice(res.data));
    }
  }, []);

  return (
    <div className="min-h-screen  px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="box w-full lg:w-1/4 flex flex-col items-center rounded-md">
          <TaskAltIcon sx={{ fontSize: "5rem", color: green[600] }} />
          <h1 className="py-5 text-2xl font-semibold">¡Orden exitosa!</h1>
          <p className="py-3 text-center text-gray-400">
            ¡Gracias por elegir nuestro restaurante! Agradecemos tu pedido.
          </p>
          <p className="py-2 text-center text-gray-200 text-lg">
            ¡Que tengas un gran día!
          </p>
          {invoice && (
            <div className="py-4 text-center">
              <h2 className="font-bold text-lg mb-2">Factura electrónica</h2>
              <p>Folio: {invoice.folio}</p>
              {invoice.pdfUrl && (
                <a
                  href={invoice.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline block my-2"
                >
                  Descargar PDF
                </a>
              )}
              {invoice.xmlUrl && (
                <a
                  href={invoice.xmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline block my-2"
                >
                  Descargar XML
                </a>
              )}
            </div>
          )}
          <Button
            variant="contained"
            className="my-5"
            sx={{ margin: "1rem 0rem" }}
            onClick={() => navigate("/")}
          >
            Ir al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
