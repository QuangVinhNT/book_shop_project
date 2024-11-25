  import { useForm } from "react-hook-form";
  import { categories } from "~/utils/util";
  import { Swiper, SwiperSlide } from 'swiper/react'
  import { Pagination, Grid } from 'swiper/modules';
  import { useState } from "react";
  import { environment } from "~/utils/environment";
  import { toast } from "react-toastify";

  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  function AddProduct() {
    const [imageIsRequired, setImageIsRequired] = useState(false)
    const [prodImages, setProdImages] = useState([])
    const [previewProdImages, setPreviewProdImages] = useState([])

    const {  register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
      defaultValues: {
        name: "Sample Book",
        category_id: 1,
        price: 10.0,
        reduced_price: 8.0,
        quantity: 1,
        author: "John Doe",
        language: "English",
        format: "Paperback",
        date_published: "2023-01-01",
        publisher: "Default Publisher",
        description: "This is a default description for the product.",
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

      setImageIsRequired(fileList.length === 0)
      setProdImages(fileList)
      setPreviewProdImages(previewImages)
    }

    const onSubmit = async (data) => {
      const toastId = toast.loading("Please wait...");
      try {
        const { images, ...productInfo } = data

        const imageDatas = new FormData();
        Array.from(images).forEach((image) => {
          imageDatas.append(`images[]`, image);
        });

        const responseImages = await fetch(`${environment.BACKEND_URL}/uploads`, {
          method: 'POST',
          body: imageDatas,
          credentials: 'include',
        })

        if (responseImages.ok) {
          const dataImages = await responseImages.json()

          const responseProduct = await fetch(`${environment.BACKEND_URL}/add-product`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              product_info: productInfo,
              images: dataImages.images
            }),
            credentials: 'include'
          })
          if (responseProduct.ok) {
            const productData = await responseProduct.json()
            reset()
            toast.update(toastId, { render: data.message || 'Upload product success.', type: 'success', isLoading: false, autoClose: 3000 });
            setPreviewProdImages([])
            setProdImages([])
          }
          else {
            toast.update(toastId, { render: data.message || 'Upload product failed.', type: 'error', isLoading: false, autoClose: 3000 });
          }
        }
        else {
          toast.update(toastId, { render: data.message || 'Upload product failed size image <= 2048 kilobytes.', type: 'error', isLoading: false, autoClose: 3000 });
        }
      } catch (error) {
        console.log(error)
        toast.update(toastId, { render: 'Internal server error.', type: 'error', isLoading: false, autoClose: 3000 });
      }
    };

    const onError = (data) => {
      setImageIsRequired(prodImages.length === 0)
    }

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Add Product</h3>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className="block" htmlFor="multiple_files">More product images</label>
              <input {...register("images", {
                required: 'Images is required'
              })} onChange={e => handleUploadProdImages(e)} id="multiple_files" type="file" multiple
              />
              {(errors.images && prodImages.length === 0 && imageIsRequired) && <p className="text-red-500 text-sm">{errors.images.message}</p>}
            </div>
            <div className='mt-5 relative'>
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
                {previewProdImages &&
                  previewProdImages.map((tempUrl, index) =>
                    <SwiperSlide key={index}>
                      <div className="w-full h-[200px] border flex items-center justify-center p-4">
                        <img src={tempUrl} className='w-full object-cover' />
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

  export default AddProduct;
