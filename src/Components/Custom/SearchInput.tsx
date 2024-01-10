import Input from "./Input";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const SearchInput = ({ search, setSearch }: any) => {
    const handleSearchChange = (e: { target: { value: any; }; }) => {
        setSearch(e.target.value);
    };
    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(145,158,171)" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
            <Input
                type="text"
                name="search"
                className="block w-full py-[16.5px] pl-10 pr-3.5 border border-gray-300 rounded-md text-sm"
                placeholder="Search by name, email, booking ID"
                value={search}
                onChange={handleSearchChange}
            />
        </div>
    );
}