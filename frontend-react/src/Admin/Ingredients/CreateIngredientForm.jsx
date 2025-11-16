

import React, { useState, useEffect } from 'react';
import { TextField, Button, makeStyles, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Create } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../State/Customers/Restaurant/restaurant.action';
import { createIngredient, updateIngredient } from '../../State/Admin/Ingredients/Action';



const CreateIngredientForm = ({handleClose, initialData = null}) => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const {auth,restaurant,ingredients}=useSelector(store=>store)
    const jwt = localStorage.getItem("jwt")

 
  const [formData, setFormData] = useState({
    name: '',
    ingredientCategoryId:''
  });

  // Prefill when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        ingredientCategoryId: initialData.category?.id || ''
      });
    }
  }, [initialData]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);

    const data = { ...formData, restaurantId: restaurant.usersRestaurant.id };
    if (initialData && initialData.id) {
      dispatch(updateIngredient({ id: initialData.id, data, jwt: auth.jwt || jwt }));
    } else {
      dispatch(createIngredient({jwt:auth.jwt || jwt,data}));
    }

    setFormData({ name: '', ingredientCategoryId: '' });
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
    <div className=' '>
        <div className='p-5'>
          <h1 className='text-gray-400 text-center text-xl pb-10'>Crear ingrediente</h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
      <TextField
        label="Ingrediente"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.ingredientCategoryId}
          label="Categoría"
          name='ingredientCategoryId'
          onChange={handleInputChange}
        >
          
          {ingredients.category.map((item)=> <MenuItem value={item.id}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
     
      <Button type="submit" variant="contained" color="primary">
        Crear
      </Button>
    </form>
    </div>
    </div>
  );
};

export default CreateIngredientForm;
