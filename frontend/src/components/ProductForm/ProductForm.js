import "./ProductForm.css";
import Selector from "../../components/Selectors/Selector/Selector";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useState } from "react";
import { uploadImage } from "../../Services/ImagesAPICalls";

function ProductForm({ product, setProduct }) {
  const [createProduct, setCreateProduct] = useState(product.id ? false : true);

  const [newImages, setNewImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      setNewImages((prevState) => [...prevState, file]);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    // isDragAccept,
    // isDragReject,
  } = useDropzone({ onDrop });

  const HandleImageUpload = async () => {
    const formData = new FormData();
    newImages.forEach((image) => {
      formData.append(`file`, image);
    });

    try {
      uploadImage(product.id, formData).then((data) => {
        setOldImages((prevState) => [...prevState, ...data]);
        setNewImages([]);
      });
    } catch (error) {
      console.log("imageUpload" + error);
    }
  };

  useEffect(() => {
    setOldImages(product.images);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setAllImages([...oldImages, ...newImages]);
  }, [newImages, oldImages]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteImage = (image) => {
    if (typeof image === "string") {
      // handle delete image from database
      console.log("delete image from database");
      setOldImages((prevState) => prevState.filter((img) => img !== image));
    } else {
      setNewImages((prevState) => prevState.filter((img) => img !== image));
    }
  };

  const HandleUpdateProductInfo = () => {
    console.log("update product info");
  };

  const HandleCreateProduct = () => {
    console.log("create product");
  };

  return (
    <div className="admin-edit-product-form">
      <div className="admin-edit-product-title">
        <div className="admin-edit-product-title-title font-5">Title</div>
        <div className="admin-edit-product-title-content">
          <div className="admin-edit-product-field-wrapper">
            <input
              type="text"
              placeholder="Title"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="admin-edit-product-price-category">
        <div className="admin-edit-product-price">
          <div className="admin-edit-product-price-title font-5">Price</div>
          <div className="admin-edit-product-price-content">
            <div className="admin-edit-product-field-wrapper">
              <input
                type="text"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="admin-edit-product-category">
          <div className="admin-edit-product-category-title font-5">
            Category
          </div>
          <div className="admin-edit-product-category-content">
            <div className="admin-edit-product-field-wrapper">
              <Selector
                options={[
                  { value: "T-Shirts", label: "T-Shirts" },
                  { value: "Shirts", label: "Shirts" },
                  { value: "Pants", label: "Pants" },
                  { value: "Shorts", label: "Shorts" },
                  { value: "Jackets", label: "Jackets" },
                  { value: "Shoes", label: "Shoes" },
                ]}
                selectedOption={{
                  value: product.category,
                  label: product.category,
                }}
                setSelectedOption={(category) =>
                  setProduct({ ...product, category: category.value })
                }
                defaultOption={{
                  value: product.category,
                  label: product.category,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="admin-edit-product-description-sizes">
        <div className="admin-edit-product-description">
          <div className="admin-edit-product-description-title font-5">
            Description
          </div>
          <div className="admin-edit-product-description-content">
            <div className="admin-edit-product-field-wrapper ">
              <textarea
                type="text"
                placeholder="Description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                style={{ resize: "none" }}
              />
            </div>
          </div>
        </div>

        <div className="admin-edit-product-sizes">
          <div className="admin-edit-product-sizes-title font-5">Sizes</div>
          <div className="admin-edit-product-sizes-content">
            <div className="admin-edit-product-sizes-wrapper">
              {product.sizes.map((size) => (
                <div className="admin-edit-product-size" key={size.size}>
                  <div className="admin-edit-product-size-name font-2">
                    {size.size}:
                  </div>
                  <div className="admin-edit-product-size-quantity">
                    <input
                      type="text"
                      placeholder="Quantity"
                      value={size.quantity}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          sizes: product.sizes.map((s) =>
                            s.size === size.size
                              ? { ...s, quantity: e.target.value }
                              : s
                          ),
                        })
                      }
                    />
                    <div className="admin-edit-product-size-pcs font-1">
                      pcs
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!createProduct && (
        <div className="admin-edit-product-update-info">
          <div
            className="admin-edit-product-update-info-button button-wrapper"
            onClick={HandleUpdateProductInfo}
          >
            <div className="button-green font-2">Update Info</div>
          </div>
        </div>
      )}

      <div className="admin-edit-product-image">
        <div className="admin-edit-product-image-title font-5">Image</div>
        <div className="admin-edit-product-image-content">
          <div className="admin-edit-product-image-wrapper">
            <div className="admin-edit-product-image-dropzone-wrapper">
              <div
                className="admin-edit-product-image-dropzone"
                {...getRootProps()}
              >
                <input {...getInputProps()} accept="image/*" />
                {isDragActive ? (
                  <p>Drop file(s) here ...</p>
                ) : (
                  <p>Drag and drop file(s) here, or click to select files</p>
                )}
              </div>

              {allImages.length > 0 && (
                <div className="admin-edit-product-images-wrapper">
                  {allImages.map((image, index) => (
                    <div
                      className="admin-edit-product-image-preview"
                      key={index}
                    >
                      <img
                        src={
                          typeof image === "string"
                            ? image
                            : URL.createObjectURL(image)
                        }
                        key={index}
                        alt=""
                      />

                      <div
                        className="admin-edit-product-image-preview-delete"
                        onClick={() => handleDeleteImage(image)}
                      >
                        <img
                          src="http://localhost:3001/close-white.png"
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {!createProduct && (
            <div
              className="button-wrapper admin-edit-product-image-upload"
              onClick={HandleImageUpload}
            >
              {newImages.length > 0 && (
                <div className="button-green font-2">Upload Images</div>
              )}
            </div>
          )}

          {createProduct && (
            <div
              className="button-wrapper admin-edit-product-image-upload"
              onClick={HandleCreateProduct}
            >
              <div className="button-green font-2">Create Product</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
