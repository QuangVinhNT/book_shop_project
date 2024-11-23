import { useForm } from "react-hook-form";
import { categories } from "~/utils/util";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Grid } from 'swiper/modules';
import { useState } from "react";
import { environment } from "~/utils/environment";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import 'swiper/css/navigation';
import 'swiper/css/pagination';

function EditProduct() {
  const [loading, setLoading] = useState(true)
  const param = useParams()

  const [deleteImageIds, setDeleteImageIds] = useState([])
  const [oldProdImages, setOldProdImages] = useState([])
  const [newProdImages, setProdImages] = useState([])
  const [previewProdImages, setPreviewProdImages] = useState([])

  const { register, handleSubmit, formState: { errors }, reset, } = useForm({
    defaultValues: async () => {
      const response = await fetch(`${environment.BACKEND_URL}/product/${param.id}`)
      const data = await response.json()
      setLoading(false)
      setOldProdImages(data.product.image)
      return data.product
    },
    mode: 'onTouched'
  });

  const handleUploadProdImages = (e) => {
    const fileList = Array.from(e.target.files)
    const previewImages = fileList.reduce((result, file) => {
      const tempUrl = URL.createObjectURL(file)
      return [
        ...result,
        tempUrl
      ]
    }, [])

    setProdImages(prevImages => [...prevImages, ...fileList])
    setPreviewProdImages(prevPreviews => [...prevPreviews, ...previewImages])
  }

  const onSubmit = async (data) => {
    if (oldProdImages.length === 0 && newProdImages.length === 0) return
    const toastId = toast.loading("Please wait...");
    try {
      const { images, image, ...productInfo } = data

      const responseUpdatedProduct = await fetch(`${environment.BACKEND_URL}/update-product/${param.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productUpdated: { ...productInfo },
          deleteImageIds
        })
      })

      if (responseUpdatedProduct.ok) {
        const dataUpdatedProduct = await responseUpdatedProduct.json()

        if (newProdImages.length !== 0) {
          const imageDatas = new FormData();
          // Array.from(images).forEach((image) => {
          //   imageDatas.append(`images[]`, image);
          // });
          newProdImages.forEach((image) => {
            imageDatas.append(`images[]`, image);
          });
          imageDatas.append('product_id', dataUpdatedProduct.product.id)

          const responseImages = await fetch(`${environment.BACKEND_URL}/uploads-with-product-id`, {
            method: 'POST',
            body: imageDatas,
            credentials: 'include',
          })

          if (responseImages.ok) {
            const productData = await responseImages.json()
            setOldProdImages(productData.product.image)
            setPreviewProdImages([])
            setDeleteImageIds([])
            setProdImages([])
            toast.update(toastId, { render: 'Update product success', type: 'success', isLoading: false, autoClose: 3000 });
          }
          else {
            toast.update(toastId, { render: 'Update product failed', type: 'error', isLoading: false, autoClose: 3000 });
          }
        }
        else {
          setDeleteImageIds([])
          setOldProdImages(dataUpdatedProduct.product.image)
          toast.update(toastId, { render: data.message || 'Update product success', type: 'success', isLoading: false, autoClose: 3000 });
        }
      }
      else {
        toast.update(toastId, { render: data.message || 'Update product failed', type: 'error', isLoading: false, autoClose: 3000 });
      }

    } catch (error) {
      toast.update(toastId, { render: 'Internal server error.', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  if (loading) {
    return <div className="flex items-center text-3xl justify-center h-screen text-blue-500">
      Get product {param.id}
    </div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Edit Product {param.id}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters long" }
            })}
            type="text"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Category ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
          <select
            {...register("category_id", { required: "Category is required" })}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
          <input
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be greater than 0" }
            })}
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Reduced Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reduced Price</label>
          <input
            defaultValue='0'
            {...register("reduced_price")}
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.reduced_price && <p className="text-red-500 text-sm">{errors.reduced_price.message}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
          <input
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" }
            })}
            type="number"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
          <input
            {...register("author", {
              required: "Author is required",
              minLength: { value: 3, message: "Author name must be at least 3 characters long" }
            })}
            type="text"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
          <input
            {...register("language", { required: "Language is required" })}
            type="text"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.language && <p className="text-red-500 text-sm">{errors.language.message}</p>}
        </div>

        {/* Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Format</label>
          <input
            {...register("format", { required: "Format is required" })}
            type="text"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.format && <p className="text-red-500 text-sm">{errors.format.message}</p>}
        </div>

        {/* Date Published */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Published</label>
          <input
            {...register("date_published", { required: "Date published is required" })}
            type="date"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.date_published && <p className="text-red-500 text-sm">{errors.date_published.message}</p>}
        </div>

        {/* Publisher */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Publisher</label>
          <input
            {...register("publisher", {
              required: "Publisher is required",
              minLength: { value: 3, message: "Publisher name must be at least 3 characters long" }
            })}
            type="text"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.publisher && <p className="text-red-500 text-sm">{errors.publisher.message}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="md:col-span-2">
          <div>
            <label className="block text-blue-500" htmlFor="multiple_files">++ ADD product images</label>
            <input hidden {...register("images")} onChange={e => handleUploadProdImages(e)} id="multiple_files" type="file" multiple />
            {(oldProdImages.length === 0 && newProdImages.length === 0) && <p className="text-red-500 text-sm">Require at least one image</p>}
          </div>
          <div className='mt-5'>
            <Swiper
              slidesPerView={4}
              spaceBetween={0}
              pagination={{
                clickable: true
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              modules={[Grid, Pagination]}
              className="mySwiper"
            >
              {oldProdImages &&
                oldProdImages.map((prodImg, index) =>
                  <SwiperSlide key={index}>
                    <div className="w-full h-[200px] border flex items-center flex-col justify-center p-4">
                      <img src={prodImg.image_name} className='w-full h-[80px] object-contain' />
                      <button type="button"
                        onClick={() => {
                          setDeleteImageIds(prev => [...prev, prodImg.id])
                          setOldProdImages(prevImages => prevImages.filter((_, i) => i !== index))
                        }}
                        className="bg-red-500 text-white py-1 px-3 mt-5">Delete</button>
                    </div>
                  </SwiperSlide>
                )}
              {previewProdImages &&
                previewProdImages.map((tempUrl, index) =>
                  <SwiperSlide key={index}>
                    <div className="w-full h-[200px] border flex-col flex items-center justify-center p-4">
                      <img src={tempUrl} className='w-full h-[80px] object-contain' />
                      <button type="button"
                        onClick={() => {
                          setPreviewProdImages(prevPreviews => prevPreviews.filter((_, i) => i !== index))
                          setProdImages((prevImages) =>
                            prevImages.filter((_, i) => i !== index)
                          );
                        }}
                        className="bg-red-500 text-white py-1 px-3 mt-5">Delete</button>
                    </div>
                  </SwiperSlide>
                )}
            </Swiper>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>

  );
}

export default EditProduct;
