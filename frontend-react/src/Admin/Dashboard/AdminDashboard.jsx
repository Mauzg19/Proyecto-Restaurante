import React, { useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../../State/Customers/Restaurant/restaurant.action";
import AddressCard from "../../customers/components/Address/AddressCard";
import AddRestaurantCard from "./AddRestaurantCard";


const AdminDashboard = () => {
  const params = useParams();
  const {restaurant}=useSelector(state=>state);
  console.log("params", params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantByUserId());
  }, []);

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
        fontWeight: "bold"
      }}
    >
      Ver Dashboard de Análisis
    </a>
  );

  return (
    <div className="lg:px-20">
      {renderDashboardLink()}
      <div className="lg:flex flex-wrap justify-center">
        {restaurant.usersRestaurant.map((item) => (
          <RestaurantCard item={item}/>
        ))}
        {restaurant.usersRestaurant.length<1 && <AddRestaurantCard/>}
      </div>
    </div>
  );
};

export default AdminDashboard;
