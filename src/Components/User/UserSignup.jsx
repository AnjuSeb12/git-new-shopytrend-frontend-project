import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup
    .object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    })
    .required();

const UserSignup = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
       
        try {
            const res = await axios.post(
                "http://localhost:4000/api/v1/user/signup",
                data,
                {
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                toast.success(res.data.message,{
                    autoClose:2000

                });



            } else {
                toast.error(res.data.message,{
                    autoclose:2000
                });

            }
        } catch (error) {
            console.error("Error signing up:", error.response ? error.response.data : error.message);

        }
    };

    return (
        <div>
            <ToastContainer />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-2 rounded-md border p-6 border-success"
            >
                <input
                    {...register("firstName")}
                    placeholder="first name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                <input
                    {...register("lastName")}
                    placeholder="Last name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}
              
                <input
                    {...register("email")}
                    placeholder="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.email && <p>{errors.email.message}</p>}
                <input
                    {...register("password")}
                    type="password"
                    placeholder="password"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.password && <p>{errors.password.message}</p>}
                <input type="submit" className="rounded-md bg-green-500 py-1 text-white" />
                <p>
                    User already exists{" "}
                    <Link to="/user/signin" className="text-green-500 underline">
                        Sign in
                    </Link>
                </p>
            </form>

        </div>

    );
};

export default UserSignup;
