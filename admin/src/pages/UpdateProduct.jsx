import axios from "axios";
import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const UpdateProduct = ({ token }) => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const res = await axios.post(backendUrl + "/api/product/single", {
        productId,
      });

      if (res.data.success) {
        const p = res.data.product;
        setName(p.name);
        setDescription(p.description);
        setPrice(p.price);
        setCategory(p.category);
        setSubCategory(p.subCategory);
        setBestseller(p.bestseller);
        setSizes(p.sizes);
        setOldImages(p.images);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSizeChange = (size) => {
    setSizes((prev) => {
      const exists = prev.find((s) => s.size === size);
      if (exists) {
        return prev.filter((s) => s.size !== size);
      }
      return [...prev, { size, stock: 0 }];
    });
  };

  const handleStockChange = (size, stock) => {
    setSizes((prev) =>
      prev.map((s) => (s.size === size ? { ...s, stock: Number(stock) } : s))
    );
  };

  const onUpdateHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("productId", productId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const res = await axios.post(
        backendUrl + "/api/product/update-product",
        formData,
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getImageSrc = (fileImage, index) => {
    if (fileImage) return URL.createObjectURL(fileImage);
    if (oldImages[index]) return oldImages[index];
    return null;
  };

  return (
    <form onSubmit={onUpdateHandler} className="space-y-6 sm:space-y-8">
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          Product Images
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { image: image1, setImage: setImage1, label: "Main Image" },
            { image: image2, setImage: setImage2, label: "Image 2" },
            { image: image3, setImage: setImage3, label: "Image 3" },
            { image: image4, setImage: setImage4, label: "Image 4" },
          ].map((item, index) => {
            const imgSrc = getImageSrc(item.image, index);

            return (
              <div key={index} className="group">
                <label
                  htmlFor={`image${index + 1}`}
                  className="cursor-pointer block"
                >
                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-2 hover:border-yellow-400 transition-colors duration-300 group-hover:bg-yellow-50 h-28 sm:h-36 flex items-center justify-center">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        className="w-full h-full object-full rounded-lg"
                        alt="Product"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl sm:text-4xl text-gray-400 mb-1 sm:mb-2">
                          📷
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-600">
                          {item.label}
                        </span>
                        <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                          Click to upload
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  id={`image${index + 1}`}
                  hidden
                  onChange={(e) => item.setImage(e.target.files[0])}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 text-sm sm:text-base"
            type="text"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price (₹)
          </label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 text-sm sm:text-base"
            type="number"
            placeholder="Enter price"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Product Description
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 resize-none text-sm sm:text-base"
          placeholder="Write product description"
          rows={4}
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 text-sm sm:text-base"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sub Category
          </label>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 text-sm sm:text-base"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Ethnic Wear">Ethnic Wear</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Available Sizes & Stock
        </label>
        <div className="flex flex-wrap gap-4">
          {["S", "M", "L", "XL", "XXL"].map((size) => {
            const sizeData = sizes.find((item) => item.size === size);
            return (
              <div key={size} className="flex flex-col gap-2">
                <div
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 sm:px-4 py-2 border-2 rounded-lg cursor-pointer transition-all duration-200 text-sm sm:text-base ${
                    sizeData
                      ? "border-yellow-500 bg-yellow-100 text-yellow-700"
                      : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50"
                  }`}
                >
                  {size}
                </div>
                {sizeData && (
                  <input
                    type="number"
                    placeholder="Stock"
                    value={sizeData.stock}
                    onChange={(e) => handleStockChange(size, e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 text-sm"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 border-2 border-gray-300 rounded focus:ring-yellow-500"
        />
        <label
          htmlFor="bestseller"
          className="text-sm font-medium text-gray-700 cursor-pointer"
        >
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateProduct;
