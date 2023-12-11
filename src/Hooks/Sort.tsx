/* eslint-disable @typescript-eslint/no-explicit-any */
export const Sort = ({ sort, activeTab, handleSortChange, tab, label }: any) => {
    return (
      // sort reusable component
      <button
        className="flex items-center gap-1"
        onClick={() => handleSortChange(sort === "asc" ? "desc" : "asc", tab)}
      >
        <p className="uppercase">{label}</p>
        <div className="flex flex-col gap-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="10"
            viewBox="0 0 320 512"
            className="-mb-2"
          >
            <path
              opacity="1"
              fill={sort === "asc" && activeTab === tab ? "#24bac3" : "#e7eaf3"}
              d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="10"
            viewBox="0 0 320 512"
            className="-mt-2"
          >
            <path
              opacity="1"
              fill={sort === "desc" && activeTab === tab ? "#24bac3" : "#e7eaf3"}
              d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
            />
          </svg>
        </div>
      </button>
    );
  };
  