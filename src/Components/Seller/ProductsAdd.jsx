import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.string(),
    category: yup.string().required(),
    subcategory: yup.string(),
    stock: yup.number().positive().integer().required(),
    image: yup.mixed().required(),
  })
  .required();

const ProductsAdd = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState("");
  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const selectedCategory = watch("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/category/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const category = categories.find(cat => cat._id === selectedCategory);
    if (category) {
      setSelectedCategoryName(category.name);
      setSubcategories(category.subcategories);
    } else {
      setSelectedCategoryName("");
      setSubcategories([]);
    }
  }, [selectedCategory, categories]);

  useEffect(() => {
    const subcategory = subcategories.find(sub => sub === watch("subcategory"));
    if (subcategory) {
      setSelectedSubcategoryName(subcategory);
    } else {
      setSelectedSubcategoryName("");
    }
  }, [watch("subcategory"), subcategories]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', selectedCategoryName); 
    formData.append('subcategory', selectedSubcategoryName); 
    formData.append('image', data.image[0]);
    formData.append('stock', data.stock);

    try {
      const response = await axios.post("http://localhost:4000/api/v1/product/addproduct", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message,{
        autoclose:2000
      });
      await new Promise((resolve) => setTimeout(resolve,1000));
                navigate('/seller/productsview');

    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2 rounded-md border p-6">
        <input {...register("title")} type="text" placeholder="Title" className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
        {errors.title && <p>{errors.title.message}</p>}

        <input {...register("description")} type="text" placeholder="Description" className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
        {errors.description && <p>{errors.description.message}</p>}

        <input {...register("price")} type="text" placeholder="Price" className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
        {errors.price && <p>{errors.price.message}</p>}

        <input {...register("stock")} type="number" placeholder="Stock" className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
        {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}

        <input {...register("image")} type="file" className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
        {errors.image && <p>{errors.image.message}</p>}

        <select {...register("category")} className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <p>{errors.category.message}</p>}

        <select {...register("subcategory")} className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select a subcategory</option>
          {subcategories.length > 0 ? (
            subcategories.map((subcategory, index) => (
              <option key={index} value={subcategory}>
                {subcategory}
              </option>
            ))
          ) : (
            <option value="">No subcategories available</option>
          )}
        </select>
        {errors.subcategory && <p>{errors.subcategory.message}</p>}

        <input type="submit" className="rounded-md bg-blue-500 py-1 text-white" />
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductsAdd;

