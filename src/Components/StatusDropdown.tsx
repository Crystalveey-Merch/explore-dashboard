/* eslint-disable @typescript-eslint/no-explicit-any */
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

const statusOptions = [
    { name: 'Paid', value: "paid"},
    { name: 'In Review', value: "pending"},
    {name: "Cancelled", value: "cancelled"},
    {name: "Refunded", value: "refunded"}
]

export const StatusDropDown = ({ booking }: any) => {
    return (
        <div className="max-w-sm">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : ''}
                group inline-flex items-center rounded-md  px-3 py-2 text-sm font-bold border border-[rgba(145,158,171,0.32)] transition duration-200 ease-out hover:bg-[rgba(145,158,171,0.08)] hover:border-[#000000]`}
                        >
                            <p className='capitalize'>
                                {booking?.status === "paid" && (
                                    <span>
                                        Paid
                                    </span>
                                )}
                                {booking?.status === "pending" && (
                                    <span>
                                        In Review
                                    </span>
                                )}
                                {/* {booking?.installment && (
                    <span>
                        Installment
                    </span>
                )} */}
                                {booking?.isCancelled && (
                                    <span>
                                        Cancelled
                                    </span>
                                )}
                                {booking?.status === "refunded" && (
                                    <span>
                                        Refunded
                                    </span>
                                )}
                            </p>
                            <ChevronDownIcon
                                className={`${open ? '' : ''}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-black`}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                    <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                                        {statusOptions.map((item) => (
                                            <button
                                            key={item.value}
                                            className={`-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 ${booking?.status === item.value ? "bg-gray-50" : (booking?.isCancelled && item.value === "cancelled") ? "bg-gray-50" : ""}`}
                                          >
                                               <p className='capitalize'>
                                                    {item.name}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}
