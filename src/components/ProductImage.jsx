import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import productService from "../services/productService";

function ProductImage({ productId, size }) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Replace 'your-api-url' with the actual URL of your Django API
    productService
      .getImage(productId)
      .then((response) => {
        // Create a Blob from the binary data
        setImageData(URL.createObjectURL(response.data)); // Create a URL for the Blob
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, [productId]);

  return (
    <>
      {imageData ? (
        <Image
          src={imageData}
          alt="Product"
          className="card-img-top p-3 "
          height={size}
        />
      ) : (
        <p>Loading image...</p>
      )}
    </>
  );
}

export default ProductImage;
