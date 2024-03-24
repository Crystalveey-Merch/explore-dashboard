/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import TablePagination from '@mui/material/TablePagination';
import { deleteDoc, doc, db } from '../../../Config/firebase';
import { toast } from "react-toastify";
import { BlueButton, SearchInput } from "../../../Components"
import PlusSVG from "../../../assets/SVG/Dashboard/plus.svg"
import { Sort } from "../../../Hooks";
import noResultImg from "../../../assets/Images/Dashboard/no-results.png"



export const Blogs = ({ blogs, setBlogs }: any) => {
    const [displayedBlogs, setDisplayedBlogs] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)

    const [sort, setSort] = useState("");
    const [activeTab, setActiveTab] = useState("");

    const handleSortChange = (value: string, tab: string) => {
        setSort(value);
        setActiveTab(tab);
    };

    useEffect(() => {
        if (blogs) {
            setDisplayedBlogs(blogs)
            setLoading(false)
        }
    }, [blogs])

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await deleteDoc(doc(db, "blogs", id))
                const updatedBlogs = blogs.filter((blog: any) => blog.id !== id)
                setBlogs(updatedBlogs)
                setDisplayedBlogs(updatedBlogs)
                toast.success("Blog deleted successfully")
            } catch (error: any) {
                toast.error(error.message)
            }
        }
    }

    useEffect(() => {
        if (sort === "asc" && activeTab === "title") {
            setDisplayedBlogs([...displayedBlogs].sort((a, b) => a.tilte.localeCompare(b.title)));
        } else if (sort === "desc" && activeTab === "title") {
            setDisplayedBlogs([...displayedBlogs].sort((a, b) => b.title.localeCompare(a.title)));
        } else if (sort === "asc" && activeTab === "category") {
            setDisplayedBlogs([...displayedBlogs].sort((a, b) => a.category.localeCompare(b.category)));
        } else if (sort === "desc" && activeTab === "category") {
            setDisplayedBlogs([...displayedBlogs].sort((a, b) => b.category.localeCompare(a.category)));
        } else if (sort === "asc" && activeTab === "authorName") {
            setDisplayedBlogs([...displayedBlogs].sort((a, b) => a.authorName.localeCompare(b.authorName)));
        } else if (sort === "desc" && activeTab === "authorName") {
            setDisplayedBlogs([...displayedBlogs].sort((a, b) => b.authorName.localeCompare(a.authorName)));
        } else if (sort === "asc" && activeTab === "createdAt") {
            setDisplayedBlogs([...displayedBlogs].sort((a, b) => a.createdAt - b.createdAt));
        } else if (sort === "desc" && activeTab === "createdAt") {
            setDisplayedBlogs([...displayedBlogs].sort((a, b) => b.createdAt - a.createdAt));
        } else {
            setDisplayedBlogs(blogs)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, activeTab])

    const [search, setSearch] = useState<string>("");

    // search by title, category and authorName
    useEffect(() => {
        setDisplayedBlogs(blogs.filter((blog: any) => blog.title.toLowerCase().includes(search.toLowerCase()) || blog.category.toLowerCase().includes(search.toLowerCase()) || blog.authorName.toLowerCase().includes(search.toLowerCase())))
    }, [search, blogs])


    // pagination 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
        );
    }


    return (
        <div className="px-10 py-14 flex flex-col gap-20 xl:px-6 xl:w-[calc(100vw-10px)] lg:gap-16 md:gap-12 md:w-[100vw] sm:gap-9">
            <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-3">
                <h1 className="text-3xl font-bold text-gray-800 xl:text-2xl lg:text-xl">
                    Blogs
                </h1>
                <NavLink to="/explore/blogs/add">
                    <BlueButton
                        className="lg:py-1.5"
                        label={
                            <div className="flex items-center gap-2">
                                <img src={PlusSVG} alt="plus" className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
                                <p className="xl:text-sm xl:font-normal">
                                    Add Blog
                                </p>
                            </div>
                        }
                        onClick={undefined} />
                </NavLink>
            </div>
            <div
                className="w-full rounded-2xl flex flex-col gap-4"
                style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }}
            >
                <div className="flex justify-end pt-5 px-4">
                    <SearchInput search={search} setSearch={setSearch} placeholder="Search by title, category, author name" />
                </div>
                <div className="relative w-full lg:overflow-x-scroll xl:overflow-y-hidden xl:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>

                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="title"
                                        label="Blog Title"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="category"
                                        label="Category"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="createdAt"
                                        label="Created Date"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="authorName"
                                        label="Author Name"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {displayedBlogs.length === 0 ? (
                            <tbody className="bg-white border-b border-gray-200">
                                <tr className="bg-white border-b">
                                    <td className="px-6 py-6" colSpan={5}>
                                        <div className="flex flex-col gap-1 items-center">
                                            <img
                                                src={noResultImg}
                                                alt="No result found"
                                                className="max-w-[145px]"
                                            />
                                            <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                                                No result found
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <>
                                {displayedBlogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((blog: any) => (
                                    <tbody key={blog.id} >
                                        <tr className="bg-white border-b hover:bg-gray-50 ">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-2 items-center mx-6">
                                                <img
                                                    src={blog.image}
                                                    alt="travelPackage"
                                                    className="w-14 h-14 rounded-md object-cover"
                                                />
                                                <p className="">
                                                    {/* title must not be greater than 20 characterrs */}
                                                    {blog.title.length > 45 ? blog.title.slice(0, 45) + "..." : blog.title}
                                                </p>
                                            </th>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {blog.category}
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {blog.authorName}
                                            </td>
                                            <td className="flex items-center px-6 py-4 space-x-3">

                                                <NavLink to={`/explore/blogs/edit/${blog.id}`}
                                                    className="font-medium my-auto text-blue-600 dark:text-blue-500 hover:underline">Edit</NavLink>
                                                <button
                                                    onClick={() => handleDelete(blog.id)}
                                                    className="font-medium my-auto text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </>
                        )}
                    </table>
                </div>
                <div className="p-2">
                    <TablePagination
                        component="div"
                        count={displayedBlogs.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="flex justify-end"
                    />
                </div>
            </div>
        </div>
    );
}