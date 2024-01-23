/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { SetStateAction, useState } from "react";
import { db } from "../../../Config/AtelierFirebase/auth";
import { toast } from "react-toastify";
import { storage } from "../../../Config/AtelierFirebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Multiselect from "multiselect-react-dropdown";
import { TagsInput } from "react-tag-input-component";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFileUpload } from "react-firebase-file-upload";

type FormData = {
  name: string;
  category: string;
  price: string;
  color: string[];
  fabricType: string[];
  filter: string[];
  newarrival: string;
  giftcards: string;
  untagged: string;
  collection: string;
  imgSrc: string[];
  description: string[];
  size: string[];
};


export const UploadProductForm = () => {
  const { id } = useParams();
  // const [imageUrl, setImageUrl] = useState([] as any);

  const [fabricType, setFabricType] = useState([]);
  // const [images, setImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [colors, setColors] = useState([] as any);
  const [colorInput, setColorInput] = useState("");
  const [descriptionInput, setDesctiptionInput] = useState("");
  const [description, setDescription] = useState([] as any);

  const _input = useFileUpload(storage, {
    // the type of files to upload
    accept: "image/png, image/jpeg, image/jpg, image/webp",
    // whether to accept multiple files or just one
    multiple: true,
    // where you want to save the uploaded files in firebase storage
    path: `product-images`,
  });
  const {
    /** Input type */
    type,
    /** Accepted file types (e.g. "image/png, image/jpeg") */
    accept,
    /** Allow multiple files to be selected */
    multiple,
    /** Disable input */
    disabled,
    /** onChange event to set selected files */
    onChange,
    /** Selected files */
    files,
    /** Loading state */
    loading,
    /** Error message */
    error,
    /** Upload progress for each file */
    progress,
    /** Upload status for each file */
    // status,
    /** Download URL for each file */
    downloadURL,
    /** Upload complete state */
    isCompleted,
    /** Upload files to firebase storage */
    onUpload,
    /** Reset states when finished uploading */
    /** Remove file from selected files */
    onRemove,
  } = _input;

  useEffect(() => {
    id && getPostDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPostDetail = async () => {
    const docRef = doc(db, "products", id as string);
    const snapshot = await getDoc(docRef);
    //  const blogId = id
    if (snapshot.exists()) {
      const data = snapshot.data();

      const newData: FormData = {
        ...data,
        name: "",
        category: "",
        price: "",
        color: [],
        fabricType: [],
        filter: [],
        newarrival: "",
        giftcards: "",
        untagged: "",
        collection: "",
        imgSrc: [],
        description: [],
        size: []
      };
      setFormData(newData);
      // setFormData({ ...data });

      setColors(data.color);
      setSelectedSize(data.size);
      setDescription(data.description);
      setFabricType(data.fabricType);
      // setImageUrl(data.imgSrc);
      console.log(data);
    }
  };


  // useEffect(() => {
  //   if (downloadURL) {
  //     setImageUrl((prevState: any) => [...prevState, downloadURL]);
  //   }
  // }, [downloadURL]);


  // const handleTags = (fabricType = []) => {
  //   setFormData({ ...formData, fabricType });
  // };
  const handleTags: (tags: string[]) => void = (fabricType) => {
    setFormData({ ...formData, fabricType });
  };

  const handleDesctiptionchange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setDesctiptionInput(event.target.value);
    setFormData({
      ...formData,
      description: [...description, descriptionInput],
    });
  };
  const addDesctiption = () => {
    setDescription([...description, descriptionInput]);
    setDesctiptionInput("");

    toast.success("Description Added");
  };

  const removeDesctiption = (event: React.MouseEvent<HTMLElement>) => {
    // Extract the data-index attribute from the clicked element
    const index = event.currentTarget.getAttribute("data-index");

    // Check if index is not null and parse it as a number
    if (index !== null) {
      const i = parseInt(index, 10);

      // Your existing logic to remove the description
      const updatedDescription = [...description];
      updatedDescription.splice(i, 1);
      setDescription(updatedDescription);
    }
  };

  const handleColorInputChange = (e: { target: { value: any; }; }) => {
    const inputValue = e.target.value;
    setColorInput(inputValue);
    setFormData({
      ...formData,
      color: [...colors, inputValue],
    });
  };
  const addColor = () => {
    if (colorInput.match(/^#[0-9A-fa-f]{6}$/)) {
      setColors([...colors, colorInput]);
      setColorInput("");
    } else {
      toast.error(
        "Invalid color Format. Please use a valid hexadecimal color code (e.g. #FF0000)."
      );
    }
  };
  const removeColorInput = (index: number | undefined) => {
    const updatedColor = [
      ...colors.slice(0, index),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...colors.slice(index! + 1),
    ];

    setColors(updatedColor);
  };
  // console.log(colors)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    price: "",
    color: [],
    fabricType: [],
    filter: [],
    newarrival: "",
    giftcards: "",
    untagged: "",
    collection: "",
    imgSrc: [],
    description: [],
    size: [],
  });

  console.log(formData);
  const handleCategoryChange = (e: { target: { value: any; }; }) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const handleCollectionChange = (e: { target: { value: any; }; }) => {
    setFormData({
      ...formData,
      collection: e.target.value,
    });
  };
  const handleGiftcardChange = (e: { target: { value: any; }; }) => {
    setFormData({
      ...formData,
      giftcards: e.target.value,
    });
  };

  const handleNewArrivalChange = (e: { target: { value: any; }; }) => {
    setFormData({
      ...formData,
      newarrival: e.target.value,
    });
  };
  const handleUntaggedChange = (e: { target: { value: any; }; }) => {
    setFormData({
      ...formData,
      untagged: e.target.value,
    });
  }

  const handleFilterChange = (e: { target: { value: any; }; }) => {
    setFormData({
      ...formData,
      filter: e.target.value,
    });
  };
  const handleSelect = (selectedSizes: SetStateAction<never[]>) => {
    setSelectedSize(selectedSizes);
    const selectedKeys = selectedSize.map((option: { key: any; }) => option.key);
    setFormData({
      ...formData,
      size: selectedKeys,
    });
  };
  // console.log(selectedSize.map((option) => option.key));

  const handleRemove = (removedOption: { key: any; }) => {
    const updatedOptions = selectedSize.filter(
      (option: { key: any; }) => option.key !== removedOption.key
    );
    setSelectedSize(updatedOptions);
  };
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };



  // const selectedKeys = selectedSize.map((option) => option.key);
  // const selectedSizeObject = selectedKeys.map((key) => ({ key }));

  // const onUploadComplete = () => {
  //   // Set the imageUrl after the upload is complete
  //   setImageUrl(_input.downloadURL);
  // };

  console.log(downloadURL)
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    // const id = uuidv4();
    e.preventDefault();


    if (!id) {

      try {
        // Initialize Firebase if you haven't already
        // Add the form data to Firestore
        await addDoc(collection(db, "products"), {
          ...formData,
          imgSrc: downloadURL,
        });
        // Reset the form after successful submission
        setFormData({
          name: "",
          category: "",
          price: "",
          color: [],
          filter: [],
          fabricType: [],
          newarrival: "",
          giftcards: "",
          untagged: "",
          collection: "",
          imgSrc: [],
          description: [],
          size: [],
        });
        window.location.reload()
        // Display a success message or redirect the user
        toast.success("Product submitted successfully!");
      } catch (error) {
        console.error("Error submitting form: ", error);
        // Handle error appropriately, e.g., show an error message to the user
        alert("An error occurred while submitting the form.");
      }
    } else {
      if (id) {
        try {
          await updateDoc(doc(db, "products", id), {
            ...formData,
          });
          toast.success("Product updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <div>
      <div className="  sm:px-5 w-full px-20">
        <div>
          <h1 className="text-center text-xl my-10">Product Upload</h1>
        </div>
        <form className="AcehLight" onSubmit={handleSubmit}>
          <label className="Aceh">Product Name</label>
          <div className="flex flex-row gap-4 w-full m-auto  ">
            <input
              name="name"
              type="text"
              placeholder="Product name"
              value={formData.name} // Set the value from the state
              onChange={handleInputChange}
              className="p-3 my-4 bg-white border   w-full"
            />
          </div>
          <div></div>
          <label className="Aceh">Category</label>
          <br />
          <select
            className="  p-3 my-4 bg-white border   w-60"
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option className="p-3 my-4 bg-white border px-10 text-gray-300 ">
              Select a Category
            </option>
            <option value="Clothing" className="p-3 my-4 bg-white border ">
              Clothing
            </option>
            <option value="Two-pieces" className="p-3 my-4 bg-white border ">
              Two-pieces
            </option>
            <option value="Shoes" className="p-3 my-4 bg-white border ">
              Shoes
            </option>
            <option value="Accessories" className="p-3 my-4 bg-white border ">
              Accessories
            </option>
            <option value="Hoodies" className="p-3 my-4 bg-white border ">
              Hoodies
            </option>
            <option value="Merch" className="p-3 my-4 bg-white border ">
              Merch
            </option>
          </select>
          <br />
          <label className="Aceh">Collection</label>
          <br />
          <select
            className="  p-3 my-4 bg-white border   w-60"
            value={formData.collection}
            onChange={handleCollectionChange}
          >
            <option className="p-3 my-4 bg-white border ">
              Select a Collection
            </option>
            <option value="Party Wears" className="p-3 my-4 bg-white border ">
              Party Wears
            </option>
            <option value="Comfort Wears" className="p-3 my-4 bg-white border ">
              Comfort wears
            </option>
            <option value="Resort Wears" className="p-3 my-4 bg-white border ">
              Resort Wears
            </option>
            <option value="Occasion Wears" className="p-3 my-4 bg-white border ">
              Occasion Wears
            </option>
            <option
              value="Afrocentric Wears"
              className="p-3 my-4 bg-white border "
            >
              Afrocentric Wears
            </option>
            <option value="Formal Wears" className="p-3 my-4 bg-white border ">
              Formal wears
            </option>
          </select>
          <br></br>
          <label className="Aceh">Select Available Size</label>
          <Multiselect
            placeholder="Select  sizes"
            displayValue="key"
            selectedValues={selectedSize}
            onKeyPressFn={function noRefCheck() { }}
            onRemove={handleRemove}
            onSearch={function noRefCheck() { }}
            onSelect={handleSelect}
            className="mb-2  my-5"
            options={[
              {
                key: "6",
              },
              {
                key: "8",
              },
              {
                key: "10",
              },
              {
                key: "12",
              },
              {
                key: "14",
              },
              {
                key: "16",
              },
              {
                key: "18",
              },
              {
                key: "20",
              },
              {
                key: "S",
              },
              {
                key: "M",
              },
              {
                key: "L",
              },
              {
                key: "XL",
              },
              {
                key: "XXL",
              },
              {
                key: "1-2yr",
              },
              {
                key: "3-4yr",
              },
              {
                key: "5-6yr",
              },
              {
                key: "7-8yr",
              },
            ]}
            showCheckbox
          />
          <label className="Aceh my-2">Select Available Colors</label>
          <br></br>
          <div className="flex    my-4">
            <div className="border flex w-80 justify-between px-4">
              <input
                type="text"
                className="p-3"
                placeholder="Enter a Color"
                value={colorInput}
                onChange={handleColorInputChange}
              ></input>
              <input
                onChange={handleColorInputChange}
                type="color"
                value={colorInput}
                className="my-auto "
                multiple
              ></input>
            </div>
            <button type="button" className="btn mx-2" onClick={addColor}>
              Add Color
            </button>
          </div>
          <ul className="flex flex-wrap gap-5 p-2 ">
            {colors.map((color: string, i: number | undefined) => (
              <li key={i} style={{ backgroundColor: color }} className="p-2">
                <span className="relative text-gray-300">
                  {color}
                  <i
                    onClick={() => removeColorInput(i)}
                    className="fas fa-xmark px-2 hover:text-md cursor-pointer"
                  />
                </span>
              </li>
            ))}
          </ul>
          <label className="Aceh">Price</label>
          <div className="flex flex-row gap-4 w-full m-auto  ">
            <input
              name="price"
              type="text"
              placeholder="Product Price (N)"
              value={formData.price} // Set the value from the state
              onChange={handleInputChange}
              className="p-3 my-4 bg-white border   w-full"
            />
          </div>
          <label className="Aceh my-10">Fabric Type (e.g. silk, cotton)</label>
          <TagsInput
            value={fabricType}
            name="Tags"
            // onChange={(tags: string[]) => handleTags(tags)}
            onChange={handleTags}
            separators={[",", " "]}
            isEditOnRemove
            placeHolder="Enter fabric type"
            classNames={{
              input: "text-black w-full text-xl rti--container",
              tag: "your-tag-class",
            }}
          />{" "}
          <label className="Aceh">Product Description</label>
          <div className="flex my-4  flex-row gap-4 m-auto   ">
            <input
              name="description"
              type="text"
              placeholder="Description"
              value={descriptionInput} // Set the value from the state
              onChange={handleDesctiptionchange}
              className="p-3 bg-white border   w-96"
            />
            <button
              type="button"
              className="btn text-xl"
              onClick={addDesctiption}
            >
              +
            </button>
          </div>
          <ul className="flex flex-col gap-5 my-4">
            {description.map((desc: string, i: number) => (
              <li key={i} className="list-disc">
                <span className="w-96 bg-gray-200 p-3">
                  {desc}
                  <i
                    onClick={removeDesctiption}
                    data-index={i} // Attach the index as a data attribute
                    className="fas fa-xmark px-2 hover:text-md cursor-pointer m-auto"
                  />
                </span>
              </li>
            ))}
          </ul>
          <div>
            <label className="Aceh">New Arrival (True/False)</label>
            <br />
            <select
              name="newarrival"
              value={formData.newarrival} // Set the value from the state
              onChange={handleNewArrivalChange}
              className="p-3 my-4 bg-white border  w-96"
            >
              <option className="text-gray-500">
                Select
              </option>
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
          </div>
          <div>
            <label className="Aceh">Untagged (True/False)</label>
            <br />
            <select
              name="untagged"
              value={formData.untagged} // Set the value from the state
              onChange={handleUntaggedChange}
              className="p-3 my-4 bg-white border  w-96"
            >
              <option className="text-gray-500">
                Select
              </option>
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
          </div>
          <div>
            <label className="Aceh">Filter (Men, Women, Children, GiftCard) </label>
            <br />
            <select
              name="filter"
              value={formData.filter} // Set the value from the state
              onChange={handleFilterChange}
              className="p-3 my-4 bg-white border  w-96"
            >
              <option value="select" className="text-gray-500">
                Select
              </option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>

              <option value="Children">Children</option>
              <option value="Giftcards">GiftCard</option>

            </select>
          </div>
          <div>
            <label className="Aceh">Giftcard (True/False)</label>
            <br />
            <select
              name="giftcards"
              value={formData.giftcards} // Set the value from the state
              onChange={handleGiftcardChange}
              className="p-3 my-4 bg-white border  w-96"
            >
              <option className="text-gray-500">
                Select
              </option>
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
          </div>
          <br></br>
          <div className="Aceh">
            Upload clear images of each item according to the selected color
            arrangement. After selecting productimages click on upload.
          </div>

          <div className="flex items-center justify-center w-full p-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                className="hidden"
                type={type}
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="flex gap-4 my-4">
          {files &&
            files.map((file: any, index: any) => (
              <div key={index} className="">
                {file.type?.includes("image") && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    className="rounded-full"
                  />
                )}
                <div onClick={() => onRemove(file)} className="text-red-500">
                  Remove
                </div>
              </div>
            ))}

          </div>
          {progress &&
            Object.keys(progress).map((key, index) => (
              <div
                key={index}
                className="w-full bg-gray-200 rounded-full dark:bg-gray-700"
              >
                <div
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition duration-400 ease-in-out"
                  style={{ width: `${progress[key]}%` }}
                >
                  {" "}
                  {progress[key]}%
                </div>
              </div>
            ))}
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {isCompleted && <div className="text-green-500">Upload Complete</div>}
          <div className="btn" onClick={onUpload}>
            Upload
          </div>
          {id ? (
            <button
              type="submit"
              className="btn p-4 flex m-auto text-center bg-black px-10 my-10 text-white rounded"
            // disabled={progress < 100}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="btn p-4 flex m-auto text-center bg-black px-10 my-10 text-white rounded"
              disabled={!isCompleted}
            >
              Submit
            </button>
          )}
        </form>
      </div>    </div>
  )
}
