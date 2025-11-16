import React, { useState } from "react";
import { TextField, Button, makeStyles, Card, Modal, Box } from "@mui/material";
import { Create } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../State/Customers/Restaurant/restaurant.action";
import { createIngredientCategory, updateIngredientCategory } from "../../State/Admin/Ingredients/Action";

const CreateIngredientCategoryForm = ({ handleClose, initialCategory = null }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    name: "",
  });
  const [editingCategory, setEditingCategory] = useState(initialCategory);

  // prefill when initialCategory is provided
  React.useEffect(() => {
    if (initialCategory) {
      console.log('CreateIngredientCategory initialCategory', initialCategory);
      setEditingCategory(initialCategory);
      setFormData({ name: initialCategory.name || "" });
    }
  }, [initialCategory]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("CreateIngredientCategory submit, editingCategory=", editingCategory, "formData=", formData);
    const data = {
      name: formData.name,
      restaurantId: restaurant.usersRestaurant.id,
    };
    if (editingCategory && editingCategory.id) {
      dispatch(updateIngredientCategory({ id: editingCategory.id, data, jwt: auth.jwt || jwt }));
    } else {
      dispatch(createIngredientCategory({ data, jwt: auth.jwt || jwt }));
    }
    setFormData({ name: "" });
    setEditingCategory(null);
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=" ">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Crear categoría de ingrediente
        </h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <TextField
            label="Nombre de la categoría"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Crear
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
