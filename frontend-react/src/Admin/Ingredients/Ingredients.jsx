import { Create } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import CreateIngredientCategoryForm from "./CreateIngredientCategory";
import { useEffect, useState } from "react";
import CreateIngredientForm from "./CreateIngredientForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteIngredient, deleteIngredientCategory } from '../../State/Admin/Ingredients/Action';
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientCategory,
  getIngredientsOfRestaurant,
  updateStockOfIngredient,
} from "../../State/Admin/Ingredients/Action";
import { getRestaurantById } from "../../State/Customers/Restaurant/restaurant.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Ingredients = () => {
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [openIngredientCategory, setOpenIngredientCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const handleOpenIngredientCategory = () => setOpenIngredientCategory(true);
  const handleCloseIngredientCategory = () => { setOpenIngredientCategory(false); setEditingCategory(null); };

  const [openIngredient, setOpenIngredient] = useState(false);
  const handleOpenIngredient = () => setOpenIngredient(true);
  const handleCloseIngredient = () => {
    setOpenIngredient(false);
    setEditingIngredient(null);
  };
  const [editingIngredient, setEditingIngredient] = useState(null);

  const handleUpdateStocke = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
  };

  const handleDeleteIngredient = (id) => {
    console.log('handleDeleteIngredient clicked, id=', id);
    if(!window.confirm('¿Eliminar ingrediente?')) return;
    dispatch(deleteIngredient({ id, jwt: auth.jwt || jwt }));
  }

  const handleEditIngredient = (ingredient) => {
    console.log('handleEditIngredient clicked, ingredient=', ingredient);
    setEditingIngredient(ingredient);
    handleOpenIngredient();
  }

  return (
    <div className="px-2">
      <Grid container spacing={1}>
        <Grid  item xs={12} lg={8}>
          <Card className="mt-1">
            <CardHeader
              title={"Ingredientes"}
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
              action={
                <IconButton onClick={handleOpenIngredient}>
                  {" "}
                  <Create />
                </IconButton>
              }
            />
            <TableContainer className="h-[88vh] overflow-y-scroll">
              <Table sx={{}} aria-label="table in dashboard">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Categoría</TableCell>
                    <TableCell>Disponibilidad</TableCell>
                    <TableCell>Stock</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.ingredients.map((item, index) => (
                    <TableRow
                      className="cursor-pointer"
                      hover
                      key={item.id}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                    >
                      <TableCell>{item?.id}</TableCell>

                      <TableCell className="">{item.name}</TableCell>
                      <TableCell className="">{item.category.name}</TableCell>
                      <TableCell className="">
                        <Button
                          onClick={() => handleUpdateStocke(item.id)}
                          color={item.inStoke ? "success" : "primary"}
                        >
                          {item.inStoke ? "En stock" : "Sin stock"}
                        </Button>
                      </TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditIngredient(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteIngredient(item.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className="mt-1">
            <CardHeader
              title={"Category"}
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
              action={
                <IconButton onClick={handleOpenIngredientCategory}>
                  {" "}
                  <Create />
                </IconButton>
              }
            />
            <TableContainer>
              <Table sx={{}} aria-label="table in dashboard">
                <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>

                        <TableCell>Name</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ingredients.category?.map((item, index) => (
                        <TableRow
                          className="cursor-pointer"
                          hover
                          key={item.id}
                          sx={{
                            "&:last-of-type td, &:last-of-type th": { border: 0 },
                          }}
                        >
                          <TableCell>{item?.id}</TableCell>

                          <TableCell className="">{item.name}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => { console.log('edit category click', item); setEditingCategory(item); handleOpenIngredientCategory(); }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => { console.log('delete category click', item.id); if(!window.confirm('¿Eliminar categoría?')) return; dispatch(deleteIngredientCategory({ id: item.id, jwt: auth.jwt || jwt })); }}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      <Modal
        open={openIngredient}
        onClose={handleCloseIngredient}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientForm handleClose={handleCloseIngredient} initialData={editingIngredient} />
        </Box>
      </Modal>

      <Modal
        open={openIngredientCategory}
        onClose={handleCloseIngredientCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientCategoryForm
            handleClose={handleCloseIngredientCategory}
            initialCategory={editingCategory}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Ingredients;
