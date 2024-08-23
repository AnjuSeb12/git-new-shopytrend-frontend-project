import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authSellerSuccess } from "../../redux/sellerAuthentication";
import { useDispatch } from "react-redux";





const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6),
  })
  .required();




const SellerSignin = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()

   
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/seller/sellerlogin",
        data,
        {
          withCredentials: true,
        }
      );
      
      if (res.data.success) {
        if (res.data.isAuthenticated) {
          dispatch(authSellerSuccess({
            seller: res.data.seller,
           
            isAuthenticated: res.data.isAuthenticated
          }));
          console.log(res.data.seller.role)
          const role = res.data.seller.role;
          
          // Check the role and redirect accordingly
          if (role === 'admin') {
            toast.success('Login successful! Redirecting to admin dashboard...');
            navigate('/admin/admindashboard');
          } else {
            toast.success('Login successful! Redirecting to seller dashboard...');
            navigate('/sellerdashboard');
          } 
        }
      } 
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
   
  };


  return (
    <div>
        <ToastContainer/>
        <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 rounded-md border p-6 border-success"
    >
      <input
        {...register("email")}
        placeholder="email"
        type="email"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        {...register("password")}
        placeholder="password"
        type="password"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="submit" className="rounded-md bg-green-500 py-1 text-white" />
      <p>
        Instructor not created yet{" "}
        <Link to="/seller/signup" className="text-green-500 underline">
          Signup
        </Link>
      </p>
    </form>
        
    </div>
  )
}

export default SellerSignin