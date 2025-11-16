import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Modal,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
// import XIcon from '@mui/icons-material/X';
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  updateRestaurant,
  updateRestaurantStatus,
  getRestaurantByUserId,
} from "../../State/Customers/Restaurant/restaurant.action";

const Details = () => {
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [editData, setEditData] = React.useState({
    name: "",
    cuisineType: "",
    openingHours: "",
    email: "",
    mobile: "",
  });

  React.useEffect(() => {
    if (restaurant.usersRestaurant) {
      setEditData({
        name: restaurant.usersRestaurant.name || "",
        cuisineType: restaurant.usersRestaurant.cuisineType || "",
        openingHours: restaurant.usersRestaurant.openingHours || "",
        email: restaurant.usersRestaurant.contactInformation?.email || "",
        mobile: (restaurant.usersRestaurant.contactInformation?.mobile || "").replace("+91", "") || "",
      });
    }
  }, [restaurant.usersRestaurant]);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmitEdit = () => {
    // Crear el objeto siguiendo exactamente la estructura de CreateRestaurantRequest
    const payload = {
      id: restaurant.usersRestaurant.id,
      name: editData.name.trim(),
      description: restaurant.usersRestaurant.description,
      cuisineType: editData.cuisineType.trim(),
      address: restaurant.usersRestaurant.address,
      contactInformation: {
        email: editData.email.trim(),
        mobile: editData.mobile.trim().startsWith('+91') ? editData.mobile.trim() : '+91' + editData.mobile.trim(),
        instagram: restaurant.usersRestaurant.contactInformation?.instagram,
        facebook: restaurant.usersRestaurant.contactInformation?.facebook,
        twitter: restaurant.usersRestaurant.contactInformation?.twitter
      },
      openingHours: editData.openingHours.trim(),
      images: restaurant.usersRestaurant.images,
      registrationDate: restaurant.usersRestaurant.registrationDate
    };

    console.log('Datos a enviar:', payload);
    
    dispatch(
      updateRestaurant({ 
        restaurantId: restaurant.usersRestaurant.id, 
        restaurantData: payload, 
        jwt: auth.jwt || jwt 
      })
    ).then(() => {
      dispatch(getRestaurantByUserId(auth.jwt || jwt));
    });
    
    handleCloseEdit();
  };


  // Determina si el estado es automático (no permitir cambio manual)
  const isAutomaticStatus = (() => {
    // Parsear el horario y comparar con la hora actual
    const openingHours = restaurant.usersRestaurant?.openingHours;
    if (!openingHours) return false;
    const day = new Date().toLocaleDateString('en-US', { weekday: 'short' }); // Ej: 'Mon', 'Tue', ...
    const dayMap = {
      'Mon': 'Mon', 'Tue': 'Tue', 'Wed': 'Wed', 'Thu': 'Thu', 'Fri': 'Fri', 'Sat': 'Sat', 'Sun': 'Sun',
      'lun.': 'Mon', 'mar.': 'Tue', 'mié.': 'Wed', 'jue.': 'Thu', 'vie.': 'Fri', 'sáb.': 'Sat', 'dom.': 'Sun'
    };
    const currentDay = dayMap[day] || day;
    const days = openingHours.split(';');
    for (let d of days) {
      d = d.trim();
      if (d.startsWith(currentDay)) {
        const parts = d.split(':');
        if (parts.length < 2) return false;
        const hours = parts[1].split('-');
        if (hours.length < 2) return false;
        try {
          const parseTime = (str) => {
            const [time, period] = str.trim().split(' ');
            let [h, m] = time.split(':');
            h = parseInt(h);
            m = parseInt(m);
            if (period.toUpperCase() === 'PM' && h !== 12) h += 12;
            if (period.toUpperCase() === 'AM' && h === 12) h = 0;
            return h * 60 + m;
          };
          const now = new Date();
          const nowMinutes = now.getHours() * 60 + now.getMinutes();
          const openMinutes = parseTime(hours[0]);
          const closeMinutes = parseTime(hours[1]);
          return nowMinutes >= openMinutes && nowMinutes <= closeMinutes;
        } catch {
          return false;
        }
      }
    }
    return false;
  })();

  const handleRestaurantStatus = () => {
    if (isAutomaticStatus) return;
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.usersRestaurant.id,
        jwt: auth.jwt || jwt,
      })
    );
  };

  const renderDashboardLink = () => (
    <a
      href="https://app.powerbi.com/reportEmbed?reportId=cfd1fb0e-f470-4134-a915-6e2cb82c840c&autoAuth=true&ctid=9d12bf3f-e4f6-47ab-912f-1a2f0fc48aa4"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        margin: "16px 0",
        padding: "10px 20px",
        background: "#2563eb",
        color: "#fff",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      Ver Dashboard de Análisis
    </a>
  );

  return (
    <div className="lg:px-20 px-5">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1
          className="text-2xl lg:text-7xl text-center font-bold p-5"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {restaurant.usersRestaurant?.name}
        </h1>
        <div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRestaurantStatus}
              size="large"
              className="py-[1rem] px-[2rem]"
              variant="contained"
              color={restaurant.usersRestaurant?.open ? "error" : "primary"}
              disabled={isAutomaticStatus}
            >
              {restaurant.usersRestaurant?.open ? "Cerrar" : "Abrir"}
            </Button>
            <IconButton onClick={handleOpenEdit} aria-label="edit">
              <EditIcon />
            </IconButton>
          </div>
          {isAutomaticStatus && (
            <div className="text-xs text-gray-400 mt-2">El estado se actualiza automáticamente según el horario configurado.</div>
          )}
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300"> Restaurante</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Propietario</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.owner.fullName}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Nombre del restaurante</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.name}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Tipo de cocina</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Horario de apertura</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Estado</p>
                  <div className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                        Abierto
                      </span>
                    ) : (
                      <span className="text-black px-5 py-2 rounded-full bg-red-400">
                        Cerrado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300"> Dirección</span>}
            />
            <CardContent>
              <div className="space-y-3 text-gray-200">
                <div className="flex">
                  <p className="w-48">País</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.address.country}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Ciudad</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.address.city}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Código Postal</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.address.postalCode}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Dirección</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.address.streetAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300"> Contacto</span>}
            />
            <CardContent>
              <div className="space-y-3 text-gray-200">
                <div className="flex">
                  <p className="w-48">Correo electrónico</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.contactInformation.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Teléfono</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>
                    {" +91"}
                    {restaurant.usersRestaurant?.contactInformation.mobile}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-48">Redes sociales</p>
                  <div className="text-gray-400 flex items-center pb-3">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    <a
                      target="_blank"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      rel="noreferrer"
                    >
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="ml-5"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TwitterIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="ml-5"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LinkedInIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="ml-5"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>
                {/* <div className="flex">
                  <p className="w-48">Twitter</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    <a
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TwitterIcon sx={{fontSize:"3rem"}} />
                    </a>
                  </p>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {renderDashboardLink()}
      <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="edit-restaurant">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h2 className="text-lg font-bold mb-4">Editar Restaurante</h2>
          <div className="space-y-3">
            <TextField fullWidth label="Nombre" name="name" value={editData.name} onChange={handleEditChange} />
            <TextField fullWidth label="Tipo de cocina" name="cuisineType" value={editData.cuisineType} onChange={handleEditChange} />
            <TextField fullWidth label="Horario de apertura" name="openingHours" value={editData.openingHours} onChange={handleEditChange} />
            <TextField fullWidth label="Correo" name="email" value={editData.email} onChange={handleEditChange} />
            <TextField fullWidth label="Teléfono" name="mobile" value={editData.mobile} onChange={handleEditChange} />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outlined" onClick={handleCloseEdit}>Cancelar</Button>
              <Button variant="contained" onClick={handleSubmitEdit}>Guardar</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Details;
