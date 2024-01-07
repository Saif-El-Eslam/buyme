import "./ProductForm.css";
import Selector from "../../components/Selectors/Selector/Selector";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useState } from "react";
import { uploadImage, deleteImage } from "../../Services/ImagesAPICalls";
import InfoMessage from "../../components/Messages/InfoMessage";

function ProductForm({ product, setProduct, onAction, isCreateProduct }) {
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const formData = new FormData();
    newImages.forEach((image) => {
      formData.append(`file`, image);
    });

    try {
      uploadImage(product._id, formData).then((res) => {
        if (res?.status === 200) {
          setOldImages([...res.data]);
          setNewImages([]);
          setLoading(false);

          setInfoMessage("Images uploaded successfully");
          setInfoMessageType("info");
          setTimeout(() => {
            setInfoMessage("");
            setInfoMessageType("");
          }, 3000);
        } else {
          setInfoMessage(res.data.message);
          setInfoMessageType("error");

          setTimeout(() => {
            setInfoMessage("");
            setInfoMessageType("");
          }, 3000);
        }
        setLoading(false);
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

    if (isCreateProduct) {
      setProduct({ ...product, images: [...oldImages, ...newImages] });
    }
  }, [newImages, oldImages]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteImage = (image) => {
    if (typeof image === "string") {
      setLoading(true);
      deleteImage(product._id, [image]).then((data) => {
        setOldImages((prevState) => prevState.filter((img) => img !== image));
        setLoading(false);

        setInfoMessage("Image deleted successfully");
        setInfoMessageType("info");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      });
    } else {
      setNewImages((prevState) => prevState.filter((img) => img !== image));
    }
  };

  return (
    <div className="admin-edit-product-form">
      {infomessage && (
        <InfoMessage
          message={infomessage}
          setMessage={setInfoMessage}
          type={infoMessageType}
        />
      )}

      {loading && (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      )}

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
                  { value: "T-shirts", label: "T-shirts" },
                  { value: "shirts", label: "shirts" },
                  { value: "pants", label: "pants" },
                  { value: "shorts", label: "shorts" },
                  { value: "jackets", label: "jackets" },
                  { value: "hoodies", label: "hoodies" },
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

      {!isCreateProduct && (
        <div className="admin-edit-product-update-info">
          <div
            className="admin-edit-product-update-info-button button-wrapper"
            onClick={onAction}
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

          {!isCreateProduct && (
            <div
              className="button-wrapper admin-edit-product-image-upload"
              onClick={HandleImageUpload}
            >
              {newImages.length > 0 && (
                <div className="button-green font-2">Upload Images</div>
              )}
            </div>
          )}

          {isCreateProduct && (
            <div
              className="button-wrapper admin-edit-product-image-upload"
              onClick={onAction}
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
