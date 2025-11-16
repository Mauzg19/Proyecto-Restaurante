import React, { useState, useEffect } from 'react';
import { TextField, Button, makeStyles, Card } from '@mui/material';
import { Create } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, updateCategoryAction } from '../../State/Customers/Restaurant/restaurant.action';



const CreateCategory = ({handleClose, initialCategory = null}) => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const {auth,restaurant}=useSelector(store=>store)
    const jwt = localStorage.getItem("jwt")

  const [formData, setFormData] = useState({
    categoryName: initialCategory?.name || '',
    restaurantId: '',
  });

  useEffect(() => {
    if (initialCategory) {
      setFormData((f) => ({ ...f, categoryName: initialCategory.name || '' }));
    } else {
      setFormData((f) => ({ ...f, categoryName: '' }));
    }
  }, [initialCategory]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
  const restaurantId = restaurant.usersRestaurant?.id || id;
  const data={
    name:formData.categoryName,
    restaurant:{
      id: restaurantId
    }
  }
    if(initialCategory && initialCategory.id){
      dispatch(updateCategoryAction({ categoryId: initialCategory.id, data, jwt: auth.jwt || jwt }))
    } else {
      dispatch(createCategoryAction({reqData:data, jwt: auth.jwt || jwt}))
    }
    setFormData({
      categoryName: '',
      restaurantId: '',
    })
    handleClose()
    console.log('Form submitted:', formData);
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
          <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
      <TextField
        label="Category Name"
        name="categoryName"
        value={formData.categoryName}
        onChange={handleInputChange}
        fullWidth
      />
     
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </form>
    </div>
    </div>
  );
};

export default CreateCategory;
