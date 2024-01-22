import React from 'react'
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Config/AtelierFirebase/auth";
// import { useParams } from 'react-router';
import { NavLink } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "@mui/material";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


const CustonMade = () => {
    const [custonMade, setCustonMade] = useState([]);
  const [search, setSearch] = useState("");
  const [productsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [productId, setCustonMadeId] = useState("");


  useEffect(() => {
    // setLoading(true);
    const fetchCustonMade = async () => {
      try {
        // setLoading(true);
        const querySnapshot = await getDocs(collection(db, "custommade"));
        const productsData = [];
        const productsIds = [];
        const tags = [];
        const categories = [];

        // Parallelize fetching data
        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const productsDoc = doc.data();
            productsDoc.id = doc.id;
            productsData.push(productsDoc);
           
            productsIds.push(doc.id);

            if (Array.isArray(productsDoc.tags)) {
              tags.push(...productsDoc.tags);
            }

            const category = productsDoc.category;
            if (category) {
              categories.push(category);
            }
          })
        );
         productsData.sort((a, b) => {
          return b.dateTime - a.dateTime;
        });

        // Set the productsId state with the collected custonMade IDs
        setCustonMadeId(productsIds);
        setCustonMade([...productsData]);
      } catch (error) {
        console.error("Error fetching productss:", error);
        setCustonMade([]);
        // setLoading(false);
      }
    };

    fetchCustonMade();
  }, []);
  const handleSearch = () => {
    if (search.trim() === "") {
      return custonMade; // Return all users when search input is empty
    } else {
      return custonMade.filter(
        (custonMade) =>
          (custonMade.name &&
            custonMade.name.toLowerCase().includes(search.toLowerCase())) ||
          (custonMade.email &&
            custonMade.email.toLowerCase().includes(search.toLowerCase())) ||
          (custonMade.category &&
            custonMade.phone.toLowerCase().includes(search.toLowerCase()))
      );
    }
  };

  const indexOfLastPage = currentPage * productsPerPage;
  const indexOfFirstPage = indexOfLastPage - productsPerPage;
  const currentCustonMade = handleSearch().slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the user post?")) {
      try {
        // Delete the document from Firestore
        await deleteDoc(doc(db, "custommade", id));

        // Update the state after successful deletion
        const updatedCustonMade = custonMade.filter(
          (product) => product.id !== id
        );
        setCustonMade(updatedCustonMade);

        toast.success("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("An error occurred while deleting the post");
      }
    }
  };
  console.log(custonMade);
  return (
    <div className='p-5'>CustonMade
     <div >
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative my-5">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for CustonMade"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative overflow-scroll shadow-md sm:rounded-lg m-8 sm:w-screen  ">
         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
         <thead className="text-xs text-gray-300 uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              <th scope="col" className="px-6 py-3">
                  Date
                </th>
              <th scope="col" className="px-6 py-3">
                  Name
                </th>
               
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Measurement Mode
                </th>
                <th scope="col" className="px-6 py-3">
                  custommization
                </th>
                
                <th scope="col" className="px-6 py-3">
                  Images
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {currentCustonMade?.map((products) => (
              <tbody key={products.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td
                      scope="row"
                      className="px-6 py-4 font-medium Aceh  text-gray-900 whitespace-nowrap dark:text-white"
                    >
{products.dateTime}                    </td>
                <td
                      scope="row"
                      className="px-6 py-4 font-medium Aceh  text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {products.firstName}{" "}{products.lastName}
                    </td>
                
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium Aceh  text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {products.email}
                    </td>
                  <td className="px-6 py-4">{products.phone}</td>

                  <td className="px-6 py-4">{products.address}</td>
                  <td className="px-6 py-4">{products.measurementMode}</td>

                  <td className="px-6 py-4">{products.customization}</td>

                  <td className="px-6 py-4">{products.images.map((img) =>(
                    <Zoom  key={products.id} className="flex"><img src={img} width={40}></img></Zoom>
                  ))}</td>  

                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(products.id)}>
                      Delete
                    </button>
                  </td>
                  
                </tr>
                <dialog id="my_modal_4" className="modal">
                  <div className="modal-box text-center">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <FontAwesomeIcon
                      icon={faWarning}
                      className="text-red-500 text-2xl border rounded-full p-5 flex w-fit m-auto"
                    />

                    <h3 className="font-bold text-lg text-center ">
                      Are you sure you want to delete this products?
                    </h3>
                    <div
                      className="btn bg-red-500 text-white my-2"
                      onClick={() => console.log(products.id)}
                    >
                      Yes, Sure
                    </div>

                    <p className="py-4">
                      Press ESC key or click on ✕ button to close
                    </p>
                  </div>
                </dialog>
              </tbody>
            ))}
          </table>
         
          
        </div>
         <Pagination
            count={Math.ceil(handleSearch().length / productsPerPage)}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            hidePrevButton={currentPage === 1}
          />
      </div></div>
  )
}

export default CustonMade