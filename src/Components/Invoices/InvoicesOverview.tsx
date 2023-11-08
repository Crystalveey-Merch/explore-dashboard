/* eslint-disable @typescript-eslint/no-explicit-any */
import allInvoicesSVG from "../../assets/SVG/Invoice/invoice-bill.svg"
import paidInvoiceSVg from "../../assets/SVG/Invoice/invoice-paid.svg"
import reviewInvoiceSVG from "../../assets/SVG/Invoice/contract-pending-line.svg"
import installmentInvoiceSVG from "../../assets/SVG/Invoice/dollar-finance-money.svg"

export const InvoicesOverview = ({ invoices }: { invoices: any }) => {
    return (
        <div
            className="w-full rounded-2xl flex justify-evenly"
            style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }}
        >
            <div className="min-w-[200px] font-public-sans py-4 px-5 flex gap-5 items-center">
                <div className="w-14 h-14 p-2 rounded-full border-[3px] border-[#90e0ef]">
                    <img src={allInvoicesSVG} alt="All Invoices" className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-1 w-max">
                    <h5 className="font-semibold text-base">
                        Total
                    </h5>
                    <p className="text-[rgb(145,158,171)] font-normal text-sm">
                        {invoices.length} Invoices
                    </p>
                    <h6 className="font-semibold text-sm">
                        {/* check all invoices and retun sum of their price */}
                        {invoices.reduce((acc: any, curr: { overallPrice: any }) => acc + curr.overallPrice, 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                    </h6>
                </div>
            </div>
            <hr className="shrink-0 border border-dashed border-[rgba(145,158,171,0.2)] h-auto self-stretch" />
            <div className="min-w-[200px] font-public-sans py-4 px-5 flex gap-5 items-center">
                <div className="w-14 h-14 p-2 rounded-full border-[3px] border-green-300">
                    <img src={paidInvoiceSVg} alt="All Invoices"
                        className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-1 w-max">
                    <h5 className="font-semibold text-base">
                        Paid
                    </h5>
                    <p className="text-[rgb(145,158,171)] font-normal text-sm">
                        {invoices.filter((invoice: { status: string }) => invoice.status === "paid").length} Invoices
                    </p>
                    <h6 className="font-semibold text-sm">
                        {invoices.filter((invoice: { status: string }) => invoice.status === "paid").reduce((acc: any, curr: { overallPrice: any }) => acc + curr.overallPrice, 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                    </h6>
                </div>
            </div>
            <hr className="shrink-0 border border-dashed border-[rgba(145,158,171,0.2)] h-auto self-stretch" />
            <div className="min-w-[200px] font-public-sans py-4 px-5 flex gap-5 items-center">
                <div className="w-14 h-14 p-2 rounded-full border-[3px] border-purple-400">
                    <img src={installmentInvoiceSVG} alt="All Invoices" className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-1 w-max">
                    <h5 className="font-semibold text-base">
                        Installment
                    </h5>
                    <p className="text-[rgb(145,158,171)] font-normal text-sm">
                        {invoices.filter((invoice: { status: string }) => invoice.status === "installment").length} Invoices
                    </p>
                    <h6 className="font-semibold text-sm">
                        {invoices.filter((invoice: { status: string }) => invoice.status === "installment").reduce((acc: any, curr: { overallPrice: any }) => acc + curr.overallPrice, 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                    </h6>
                </div>
            </div>
            <hr className="shrink-0 border border-dashed border-[rgba(145,158,171,0.2)] h-auto self-stretch" />
            <div className="min-w-[200px] font-public-sans py-4 px-5 flex gap-5 items-center">
                <div className="w-14 h-14 p-2 rounded-full border-[3px] border-orange-300">
                    <img src={reviewInvoiceSVG} alt="All Invoices" className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-1 w-max">
                    <h5 className="font-semibold text-base">
                        In Review
                    </h5>
                    <p className="text-[rgb(145,158,171)] font-normal text-sm">
                        {invoices.filter((invoice: { status: string }) => invoice.status === "pending").length} Invoices
                    </p>
                    <h6 className="font-semibold text-sm">
                        {invoices.filter((invoice: { status: string }) => invoice.status === "pending").reduce((acc: any, curr: { overallPrice: any }) => acc + curr.overallPrice, 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                    </h6>
                </div>
            </div>
            {/* <hr className="shrink-0 border border-dashed border-[rgba(145,158,171,0.2)] h-auto self-stretch" />
            <div className="min-w-[200px] font-public-sans py-4 px-5 flex gap-5 items-center">
                <div className="w-14 h-14 p-2 rounded-full border-[3px] border-[#90e0ef]">
                    <img src={allInvoicesSVG} alt="All Invoices" className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-1 w-max">
                    <h5 className="font-semibold text-base">
                        Draft
                    </h5>
                    <p className="text-[rgb(145,158,171)] font-normal text-sm">
                        20 Invoices
                    </p>
                    <h6 className="font-semibold text-sm">
                        $46,218.04
                    </h6>
                </div>
            </div> */}
        </div>
    )
}