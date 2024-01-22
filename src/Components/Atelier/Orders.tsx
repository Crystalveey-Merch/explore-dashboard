/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../Config/AtelierFirebase/auth";
// import { useParams } from 'react-router';
// import { NavLink } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "@mui/material";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Orders = () => {
  const [order, setOrder] = useState([] as any);
  const [search, setSearch] = useState("");
  const [productsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [prodictId, setOrderId] = useState("");
  // const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    {} as { id: string; status: string }
  );


  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    // setLoading(true);
    const fetchOrder = async () => {
      try {
        // setLoading(true);
        const querySnapshot = await getDocs(collection(db, "orders"));
        const productsData: DocumentData[] = []
        const productsIds = [] as any;
        const tags = [];
        const categories = [];
        // const productsData2 = []

        // Parallelize fetching data
        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const productsDoc = doc.data();
            productsDoc.id = doc.id;
            productsData.push(productsDoc);
            // productsData.push(productsData2)
            productsIds.push(doc.id);
            productsData.sort((a, b) => {
              return b.dateTime - a.dateTime;
            });
            if (Array.isArray(productsDoc.tags)) {
              tags.push(...productsDoc.tags);
            }

            const category = productsDoc.category;
            if (category) {
              categories.push(category);
            }
          })
        );


        const status = productsData.map((product) => product.status);
        setSelectedStatus({
          id: status[0].id,
          status: status[0].status,
        });
        console.log(selectedStatus)
        // Set the productsId state with the collected order IDs
        // setOrderId(productsIds);
        setOrder([...productsData]);
      } catch (error) {
        console.error("Error fetching productss:", error);
        setOrder([]);
        // setLoading(false);
      }
    };

    fetchOrder();
  }, [selectedStatus]);

  const handleSearch = () => {
    if (search.trim() === "") {
      return order; // Return all users when search input is empty
    } else {
      return order.filter(
        (order: { id: string; billingData: { email: string; }; paymentReference: string; orderDetails: { name: string; }; }) =>
          (order.id && order.id.toLowerCase().includes(search.toLowerCase())) ||
          (order.billingData.email &&
            order.billingData.email
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          (order.paymentReference &&
            order.paymentReference
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          (order.orderDetails.name &&
            order.orderDetails.name
              .toLowerCase()
              .includes(search.toLowerCase()))
      );
    }
  };

  const indexOfLastPage = currentPage * productsPerPage;
  const indexOfFirstPage = indexOfLastPage - productsPerPage;
  const currentCustonMade = handleSearch().slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete the oredr?")) {
      try {
        // Delete the document from Firestore
        await deleteDoc(doc(db, "orders", id));

        // Update the state after successful deletion
        const updatedCustonMade = order.filter((product: { id: string; }) => product.id !== id);
        setOrder(updatedCustonMade);

        toast.success("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("An error occurred while deleting the order");
      }
    }
  };

  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>, id: any) => {
    // Get the selected status from the dropdown
    const status = e.target.value;
    setSelectedStatus({ id, status });
  };

  useEffect(() => {
    const updateStatus = async () => {
      try {
        // Update the order status in Firestore
        await updateDoc(doc(db, "orders", selectedStatus.id), {
          status: selectedStatus.status,
        });
        // Show a toast for success
        toast.success("Order status updated successfully");
      } catch (error) {
        // Show a toast for error
        toast.error("An error occurred while updating the order status");
      }
    };

    if (selectedStatus.id && selectedStatus.status) {
      updateStatus();
    }

  }, [selectedStatus]);

  // const handleOrderStatus= async(id) =>{
  //   try {
  //     // Delete the document from Firestore
  //     await updateDoc(doc(db, "orders", id));

  // }catch(error){
  //   console.error("Error pushing status:", error);
  //   toast.error("An error occurred while selecting the status");
  // }}
  return (
    <div className="p-5">
      <div>
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
            placeholder="Search for Sell"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative overflow-scroll shadow-md sm:rounded-lg m8 sm:w-screen  m-auto  ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-300 uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Ref.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Paymt
                </th>
                <th scope="col" className="px-6 py-3">
                  Order
                </th>
                <th scope="col" className="px-6 py-3">
                  Delivery/Billing
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="">Action</span>
                </th>
              </tr>
            </thead>
            {currentCustonMade?.map((products: any) => (
              <tbody key={products.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium Aceh  text-gray-900  dark:text-white"
                  >
                    {products.dateTime}
                  </td>
                  <td className="px-6 py-4">{products.paymentReference}</td>
                  <td className="px-6 py-4">
                    {products?.billingData.firstName}{" "}
                    {products?.billingData.lastName}
                  </td>

                  <td className="px-6 py-4">{products.billingData.email}</td>
                  <td className="px-6 py-4">
                    {products.billingData.phoneNumber}
                  </td>
                  <td className="px-6 py-4">N{products.totalCost}({products.selectedPayment})</td>

                  <td className="px-6 py-4">
                    <button
                      className="btn bg-sky-800 text-white capitalize text-xs"
                      onClick={() =>
                        (document.getElementById(`my_modal_${products.id}`) as HTMLDialogElement)?.showModal()
                      }
                    >
                      View Order
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      className=" btn bg-yellow-400 text-black capitalize text-xs"
                      onClick={() =>
                        (document.getElementById(`my_modal_2${products.id}`) as HTMLDialogElement)?.showModal()
                      }
                    >
                      Billing Address
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <select id="select" value={products.status} onChange={(e) => handleStatusSelect(e, products.id)}>
                      <option value="In Review" >
                        In Review
                      </option>
                      <option value="On Transit" >
                        On Transit
                      </option>
                      <option value="Delivered" >
                        Delivered
                      </option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(products.id)}>
                      Delete
                    </button>
                  </td>
                </tr>

                <dialog id={`my_modal_${products.id}`} className="modal">
                  <div className="modal-box text-left">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <p className="text-xl text-sky-500 Aceh text-center">
                      {" "}
                      Order Details
                    </p>
                    {products.orderDetails.map((cart: any) => (
                      <div className=" rounded-xl border shadow-md p-3 flex m-2" key={cart.id}>
                        <div>
                          <Zoom>
                            <img src={cart.src} width={50}></img>
                          </Zoom></div>
                        <div>
                          <p className="text-xl Aceh" key={cart.id}>
                            {" "}
                            {cart.name}
                          </p>
                          <h3 className=" text-xl  ">
                            Color: {cart.color}
                          </h3>
                          <h3 className=" text-xl  ">
                            Price: N {cart.price}
                          </h3>
                          <h3 className=" text-xl  ">
                            Size: {cart.size}
                          </h3>
                        </div>
                      </div>
                    ))}



                  </div>
                </dialog>
                <dialog id={`my_modal_2${products.id}`} className="modal">
                  <div className="modal-box text-left">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <p className="text-xl text-sky-500 Aceh text-center">
                      {" "}
                      Delivery Data
                    </p>
                    <p className="text-xl text-sky-500 Aceh text-center">
                      {" "}
                      Product ID: {products.id}{" "}
                    </p>

                    <p className="text-xl">
                      {" "}
                      Delivery Method {products.selectedDelivery}
                    </p>

                    <h3 className=" text-xl  ">
                      Payment Method: {products.selectedPayment}
                    </h3>
                    <p className="text-xl">
                      {" "}
                      Total Cost: N{products.totalCost}
                    </p>
                    <div className="border rounded-xl p-4 ">
                      <p className="text-center text-xl ">Delivery Form</p>
                      <p className="text-lg">
                        {" "}
                        Address: {products.deliveryForm.address}
                      </p>
                      <p className="text-lg">
                        {" "}
                        City: {products.deliveryForm.city}
                      </p>
                      <p className="text-lg">
                        {" "}
                        State: {products.deliveryForm.state}
                      </p>
                      <p className="text-lg">
                        {" "}
                        Country: {products.deliveryForm.country}
                      </p>
                      <p className="text-lg">
                        {" "}
                        Email: {products.deliveryForm.email}
                      </p>
                      <p className="text-lg">
                        {" "}
                        Name: {products.deliveryForm.name}{" "}
                        {products.deliveryForm.lastname}
                      </p>

                      <p className="text-lg">
                        {" "}
                        Phonr No.: {products.deliveryForm.phoneNumber}
                      </p>
                      <p className="text-lg">
                        {" "}
                        postalCode: {products.deliveryForm.postalCode}
                      </p>
                      <p className="text-lg">
                        {" "}
                        Email: {products.deliveryForm.email}
                      </p>
                    </div>

                    <div className="border rounded-xl p-4 my-2 ">
                      <p className="text-center text-xl ">Billing Data</p>
                      <p className="text-lg">
                        {" "}
                        Address: {products.billingData.address}
                      </p>
                      <p className="text-lg">
                        {" "}
                        City: {products.billingData.city}
                      </p>
                      <p className="text-lg">
                        {" "}
                        State: {products.billingData.state}
                      </p>
                      <p className="text-lg">
                        {" "}
                        Country: {products.billingData.country}
                      </p>
                      <p className="text-lg">
                        {" "}
                        Email: {products.billingData.email}
                      </p>
                      <p className="text-lg">
                        {" "}
                        Name:   {products.billingData.firstName}{" "}
                        {products.billingData.lastName}
                      </p>

                      <p className="text-lg">
                        {" "}
                        Phonr No.: {products.deliveryForm.phoneNumber}
                      </p>
                      <p className="text-lg">
                        {" "}
                        postalCode: {products.deliveryForm.postalCode}
                      </p>
                      <p className="text-lg">
                        {" "}
                        Email: {products.deliveryForm.email}
                      </p>

                    </div>
                  </div>
                </dialog>
              </tbody>
            ))}
          </table>
        </div>
        <Pagination
          count={Math.ceil(handleSearch().length / productsPerPage)}
          page={currentPage}
          onChange={(_event, page) => setCurrentPage(page)}
          hidePrevButton={currentPage === 1}
        />
      </div>

      <div></div>
    </div>
  );
};

export default Orders;
