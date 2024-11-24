import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { environment } from "~/utils/environment";
import { categories } from "~/utils/util";

function ViewProduct() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const getProduct = async () => {
    const response = await fetch(`${environment.BACKEND_URL}/product/${id}`);
    const data = await response.json();

    if (response.ok) {
      setProduct(data.product);
    } else {
      setProduct(null);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-3xl text-red-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Details */}
            <div>
              <p className="text-lg text-gray-700">
                <strong>Category:</strong> {categories.find(cate => cate.id == product.category_id).name} 
              </p>
              <p className="text-lg text-gray-700">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Reduced Price:</strong> ${product.reduced_price}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Quantity:</strong> {product.quantity}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Author:</strong> {product.author}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Language:</strong> {product.language}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Format:</strong> {product.format}
              </p>
            </div>

            {/* Additional Information */}
            <div>
              <p className="text-lg text-gray-700">
                <strong>Published Date:</strong> {new Date(product.date_published).toLocaleDateString()}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Publisher:</strong> {product.publisher}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Updated At:</strong> {new Date(product.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
          {/* Product Description */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>
        </div>

        {/* Product Images */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 px-6">Product Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
            {product.image.map((img) => (
              <div key={img.id} className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={img.image_name}
                  alt={`Image ${img.id}`}
                  className="object-contain w-full h-48"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
