import React from "react";
import { Box, Typography, Button } from "@mui/material";

const DashboardSection = () => (
  <Box sx={{ p: 3, mb: 3, background: "#f5f5f5", borderRadius: 2 }}>
    <Typography variant="h4" gutterBottom>
      Dashboard de Análisis
    </Typography>
    <Typography variant="body1" gutterBottom>
      Visualiza las métricas clave y el rendimiento de tu restaurante en tiempo real. Accede a gráficos interactivos y reportes detallados para tomar mejores decisiones.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      href="https://app.powerbi.com/reportEmbed?reportId=cfd1fb0e-f470-4134-a915-6e2cb82c840c&autoAuth=true&ctid=9d12bf3f-e4f6-47ab-912f-1a2f0fc48aa4"
      target="_blank"
      rel="noopener noreferrer"
      sx={{ mt: 2 }}
    >
      Ir al Dashboard
    </Button>
  </Box>
);

export default DashboardSection;