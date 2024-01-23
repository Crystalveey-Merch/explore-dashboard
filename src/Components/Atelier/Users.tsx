/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  // addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
// import { deleteUser as deleteAuthUser } from "firebase/auth";

import {  db } from "../../Config/AtelierFirebase/auth";
// import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBiohazard,
//   faInfo,
//   faWarning,
// } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([] as any);
  const [search, setSearch] = useState("");
  const [productsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [postPerPage] = useState(10);

  useEffect(() => {
    // setLoading(true);
    const fetchPosts = async () => {
      try {
        // setLoading(true);
        const querySnapshot = await getDocs(collection(db, "users"));
        const postData: DocumentData[] = [];

        // Parallelize fetching data
        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const postDoc = doc.data();
            postDoc.id = doc.id;
            postData.push(postDoc);
          })
        );

        // Set the postId state with the collected post IDs
        setUsers([...postData]);

        // setLoading(false)
      } catch (error) {
        console.error("Error fetching posts:", error);
        setUsers([]);
        // setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const deleteUser = async (user: { name: any; id: string; }) => {
    if (
      window.confirm(
        `Are you sure you want to delete '${user.name}'?. This user will no longer have  access to Atelier `
      )
    ) {
      try {
        // Delete the document from Firestore
        // await auth().deleteUser(user.id);
        await deleteDoc(doc(db, "users", user.id));
        toast.success("User deleted successfully");
        // Update the state after successful deletion
        const updatedUsers = users.filter((user: any) => user.user.id !== user.id);
        setUsers(updatedUsers);

        toast.success("User deleted successfully");
      } catch (error) {
        console.error("Error deleting User:", error);
        toast.error("An error occurred while deleting the user");
      }
    }
  };


  const handleSearch = () => {
    if (search.trim() === "") {
      return users; // Return all users when search input is empty
    } else {
      return users.filter(
        (user: any) =>
          user.name && user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email && user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  const indexOfLastPage = currentPage * productsPerPage;
  const indexOfFirstPage = indexOfLastPage - productsPerPage;
  const currentUsers = handleSearch().slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  return (
    <div className="py-10 sm:px-2 px-8 w-full ">
      <p className="text-center text-xl Aceh py-10">Users Data</p>

      <div className="relative overflow-x-auto sm:w-screen shadow-md sm:rounded-lg py-8">
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
            placeholder="Search for users"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overfloex-x-sccroll overflow-hidden">
          <thead className="text-xs text-gray-300 uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3"></th>

            </tr>
          </thead>
          {currentUsers?.map((user: any) => (
            <tbody key={user.id}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              
                  <th
                    scope="row"
                    className="px-6 py-4  Aceh  text-gray-900  dark:text-white"
                  >
                    {user.name}
                  </th>
                <td className="px-6 py-4">{user.email}</td>
               
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => deleteUser(user)}
                    className=" block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <Pagination
            count={Math.ceil(handleSearch().length / productsPerPage)}
            page={currentPage}
            onChange={(_event, page) => setCurrentPage(page)}
            hidePrevButton={currentPage === 1}
          />
      </div>
    </div>
  );
};
export default Users;
