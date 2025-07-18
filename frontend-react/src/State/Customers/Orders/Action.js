import { api } from "../../../config/api";
import { createOrderFailure, createOrderRequest, createOrderSuccess, getUsersOrdersFailure, getUsersOrdersRequest, getUsersOrdersSuccess } from "./ActionCreators";
import { GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_SUCCESS } from "./ActionTypes";


export const createOrder = (reqData) => async (dispatch) => {
  try {
    const jwt = localStorage.getItem("jwt"); // <-- obtiene el token del localStorage
    const { data } = await api.post(
      "/api/order",
      reqData.order,
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // <-- ENVÍA EL JWT EN EL HEADER
        },
      }
    );
    if(data.payment_url){
      window.location.href=data.payment_url;
    }
    console.log("created order data",data)
    dispatch(createOrderSuccess(data));
  } catch (error) {
    console.log("error ",error)
    dispatch(createOrderFailure(error));
  }
};


export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch(getUsersOrdersRequest());
    try {
      const {data} = await api.get(`/api/order/user`,{
        headers: {
            Authorization: `Bearer ${jwt}`,
          },
      });
      console.log("users order ",data)
      dispatch(getUsersOrdersSuccess(data));
    } catch (error) {
      dispatch(getUsersOrdersFailure(error));
    }
  };
};


export const getUsersNotificationAction = () => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const {data} = await api.get('/api/notifications');
     
      console.log("all notifications ",data)
      dispatch({type:GET_USERS_NOTIFICATION_SUCCESS,payload:data});
    } catch (error) {
      console.log("error ",error)
      dispatch({type:GET_USERS_NOTIFICATION_FAILURE,payload:error});
    }
  };
};
