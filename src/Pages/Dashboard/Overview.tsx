/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice"
import { collection, getDocs, db } from '../../Config/firebase';
import totalSvg from "../../assets/SVG/Dashboard/Overview/total.svg"
import canceledSvg from "../../assets/SVG/Dashboard/Overview/cancelled.svg"
import soldSvg from "../../assets/SVG/Dashboard/Overview/sold.svg"


export const Overview = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])


    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTravelPackages = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, 'transactions'));
                const packagedata = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTransactions(packagedata);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchTravelPackages();
    }, [])

    const totalTransactions = transactions.length;

    // pending transactions
    const pendingTransactionsLength = transactions.filter((transaction) => transaction.status === 'pending').length;

    const pendingPercentage = (pendingTransactionsLength / totalTransactions) * 100;

    // paid transactions
    const paidTransactionsLength = transactions.filter((transaction) => transaction.status === 'paid').length;

    const paidPercentage = (paidTransactionsLength / totalTransactions) * 100;

    // cancelled transactions
    const cancelledTransactionsLength = transactions.filter((transaction) => transaction.isCancelled === true).length;

    const cancelledPercentage = (cancelledTransactionsLength / totalTransactions) * 100;

    // installments transactions
    const installmentsTransactionsLength = transactions.filter((transaction) => transaction.installment === true).length;

    const installmentsPercentage = (installmentsTransactionsLength / totalTransactions) * 100;

    // Exciting Activities transactions
    const excitingActivitiesTransactionsLength = transactions.filter((transaction) => transaction.type === 'Exciting Activities').length;

    const excitingActivitiesPercentage = (excitingActivitiesTransactionsLength / totalTransactions) * 100;

    // Promoted Travel Package  transactions
    const promotedTravelPackageTransactionsLength = transactions.filter((transaction) => transaction.type === 'Promoted Travel Package').length;

    const promotedTravelPackagePercentage = (promotedTravelPackageTransactionsLength / totalTransactions) * 100;


    const [paidTransactions, setPaidTransactions] = useState<any[]>([]);

    useEffect(() => {
        // if (loading && transactions.length > 0) {
        const paidTransactions = transactions.filter((transaction) => transaction.status === "paid");
        setPaidTransactions(paidTransactions);
        console.log(paidTransactions);
        // } 
    }, [transactions])

    const lastMonthTotalIncome = paidTransactions.filter((transaction) => {
        const transactionDate = moment(transaction.dateCreated, 'MMMM Do YYYY');

        const lastMonthStartDate = moment().subtract(1, 'month').startOf('month');
        const lastMonthEndDate = moment().subtract(1, 'month').endOf('month');

        return transactionDate.isBetween(lastMonthStartDate, lastMonthEndDate, null, '[]');
    }).reduce((acc: any, curr: { overallPrice: any }) => acc + curr.overallPrice, 0);

    // const lastMonthTotalIncome = 3000000

    // filter out this month's paid transactions
    const thisMonthTotalIncome = paidTransactions
        .filter((transaction) => {
            const transactionDate = moment(transaction.dateCreated, 'MMMM Do YYYY');

            const thisMonthStartDate = moment().startOf('month');
            const thisMonthEndDate = moment().endOf('month');

            return transactionDate.isBetween(thisMonthStartDate, thisMonthEndDate, null, '[]');
        })
        .reduce((acc: any, curr: { overallPrice: any }) => acc + curr.overallPrice, 0);

    const percentageDifference = ((thisMonthTotalIncome - lastMonthTotalIncome) / ((thisMonthTotalIncome + lastMonthTotalIncome) / 2)) * 100;



    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="px-10 py-14 font-public-sans flex flex-col gap-5 xl:px-6 xl:w-[calc(100vw-100px)] sm:w-[100vw]">
            <div className="flex justify-between items-center gap-5 lg:flex-col sm:gap-4">
                <div className="rounded-2xl bg-white w-full py-4 pr-6 pl-4 flex gap-6 justify-between"
                    style={{
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[2rem] font-public-sans font-bold text-black xl:text-2xl lg:text-xl">
                            {transactions.length}
                        </h4>
                        <p className="text-sm font-medium text-[rgb(99,115,129)]">
                            Total Bookings
                        </p>
                    </div>
                    <div style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(34,197,94,0.16)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"

                    }}>
                        <img src={totalSvg} alt="totalSvg" className="w-[120px] h-[120px]" />
                    </div>
                </div>
                <div className="rounded-2xl bg-white w-full py-4 pr-6 pl-4 flex gap-6 justify-between"
                    style={{
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[2rem] font-public-sans font-bold text-black xl:text-2xl lg:text-xl">
                            {transactions.length}
                        </h4>
                        <p className="text-sm font-medium text-[rgb(99,115,129)]">
                            Sold
                        </p>
                    </div>
                    <div style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(34,197,94,0.16)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"

                    }}>
                        <img src={soldSvg} alt="soldSvg" className="w-[120px] h-[120px]" />
                    </div>
                </div>
                <div className="rounded-2xl bg-white w-full py-4 pr-6 pl-4 flex gap-6 justify-between"
                    style={{
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[2rem] font-public-sans font-bold text-black xl:text-2xl lg:text-xl">
                            0
                        </h4>
                        <p className="text-sm font-medium text-[rgb(99,115,129)]">
                            Cancelled
                        </p>
                    </div>
                    <div style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(34,197,94,0.16)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"

                    }}>
                        <img src={canceledSvg} alt="canceledSvg" className="w-[120px] h-[120px]" />
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-start gap-5 lg:flex-col sm:gap-4">
                <div className="p-6 flex flex-col gap-6 sm:p-5" style={{
                    width: "100%",
                    // height: "400px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)) rgb(255, 255, 255)",
                    color: "rgb(0, 75, 80)",
                }}>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold sm:text-sm">
                                Total Income
                            </p>
                            <h5 className="font-bold text-[2rem] sm:text-[1.5rem]">
                                {paidTransactions.reduce((acc: any, curr: { overallPrice: any }) => acc + curr.overallPrice, 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                            </h5>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className={`place-self-end flex items-center gap-1 ${lastMonthTotalIncome > thisMonthTotalIncome ? "text-red-600" : ""}`}>
                                <div
                                >{lastMonthTotalIncome > thisMonthTotalIncome ?
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className={`component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva  ${lastMonthTotalIncome > thisMonthTotalIncome ? "" :
                                        ""}`} width="1em" height="1em" viewBox="0 0 24 24"><g id="iconifyReact695"><g id="iconifyReact696"><path id="iconifyReact697" fill="currentColor" d="M21 12a1 1 0 0 0-2 0v2.3l-4.24-5a1 1 0 0 0-1.27-.21L9.22 11.7L4.77 6.36a1 1 0 1 0-1.54 1.28l5 6a1 1 0 0 0 1.28.22l4.28-2.57l4 4.71H15a1 1 0 0 0 0 2h5a1.1 1.1 0 0 0 .36-.07l.14-.08a1.19 1.19 0 0 0 .15-.09a.75.75 0 0 0 .14-.17a1.1 1.1 0 0 0 .09-.14a.64.64 0 0 0 .05-.17A.78.78 0 0 0 21 17Z"></path></g></g>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className={`component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva  ${lastMonthTotalIncome > thisMonthTotalIncome ? "" :
                                        ""}`} width="1em" height="1em" viewBox="0 0 24 24"><g id="iconifyReact333"><g id="iconifyReact334"><path id="iconifyReact335" fill="currentColor" d="M21 7a.78.78 0 0 0 0-.21a.64.64 0 0 0-.05-.17a1.1 1.1 0 0 0-.09-.14a.75.75 0 0 0-.14-.17l-.12-.07a.69.69 0 0 0-.19-.1h-.2A.7.7 0 0 0 20 6h-5a1 1 0 0 0 0 2h2.83l-4 4.71l-4.32-2.57a1 1 0 0 0-1.28.22l-5 6a1 1 0 0 0 .13 1.41A1 1 0 0 0 4 18a1 1 0 0 0 .77-.36l4.45-5.34l4.27 2.56a1 1 0 0 0 1.27-.21L19 9.7V12a1 1 0 0 0 2 0V7Z"></path>
                                        </g></g>
                                    </svg>}
                                </div>
                                <p className="text-sm font-semibold">
                                    {lastMonthTotalIncome > thisMonthTotalIncome ? "" : "+"}
                                    {percentageDifference.toFixed(2)}%
                                </p>
                            </div>
                            <p className="text-sm font-normal text-black sm:text-xs">
                                {lastMonthTotalIncome > thisMonthTotalIncome ? "less than last month" : "than last month"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl bg-white text-[rgb(33,43,54)] w-full py-4 pr-6 pl-4 flex flex-col justify-between"
                    style={{
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
                    }}
                >
                    <h5 className="text-lg font-bold">
                        Booked
                    </h5>
                    <div className="flex flex-col gap-6 p-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p className="uppercase text-xs font-bold">
                                    Pending
                                </p>
                                <p className="">
                                    {pendingTransactionsLength}
                                </p>
                            </div>
                            <div className="relative w-full">
                                <p className="h-2 bg-[rgba(145,158,171,0.16)] w-full rounded"></p>
                                <p className="h-2 bg-[rgb(255,171,0)] rounded absolute top-0 left-0"
                                    style={{ width: `${pendingPercentage}%` }}></p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p className="uppercase text-xs font-bold">
                                    Paid
                                </p>
                                <p className="">
                                    {paidTransactionsLength}
                                </p>
                            </div>
                            <div className="relative w-full">
                                <p className="h-2 bg-[rgba(145,158,171,0.16)] w-full rounded"></p>
                                <p className="h-2 bg-[rgb(34,197,94)] rounded absolute top-0 left-0"
                                    style={{ width: `${paidPercentage}%` }}></p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p className="uppercase text-xs font-bold">
                                    Cancelled
                                </p>
                                <p className="">
                                    {cancelledTransactionsLength}
                                </p>
                            </div>
                            <div className="relative w-full">
                                <p className="h-2 bg-[rgba(145,158,171,0.16)] w-full rounded"></p>
                                <p className="h-2 bg-[rgb(255,0,0)] rounded absolute top-0 left-0"
                                    style={{ width: `${cancelledPercentage}%` }}></p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p className="uppercase text-xs font-bold">
                                    Installments
                                </p>
                                <p className="">
                                    {installmentsTransactionsLength}
                                </p>
                            </div>
                            <div className="relative w-full">
                                <p className="h-2 bg-[rgba(145,158,171,0.16)] w-full rounded"></p>
                                <p className="h-2 bg-[rgb(0,171,255)] rounded absolute top-0 left-0"
                                    style={{ width: `${installmentsPercentage}%` }}></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl bg-white text-[rgb(33,43,54)] w-full py-4 pr-6 pl-4 flex flex-col gap-9 justify-between"
                    style={{
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
                    }}
                >
                    <h5 className="text-lg font-bold">
                        Booking Types
                    </h5>
                    <div className="flex flex-col gap-6 p-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p className="uppercase text-xs font-bold">
                                    Exciting Activities
                                </p>
                                <p className="">
                                    {excitingActivitiesTransactionsLength}
                                </p>
                            </div>
                            <div className="relative w-full">
                                <p className="h-2 bg-[rgba(145,158,171,0.16)] w-full rounded"></p>
                                <p className="h-2 bg-[rgb(255,171,0)] rounded absolute top-0 left-0"
                                    style={{ width: `${excitingActivitiesPercentage}%` }}></p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p className="uppercase text-xs font-bold">
                                    Promoted Travel Package
                                </p>
                                <p className="">
                                    {promotedTravelPackageTransactionsLength}
                                </p>
                            </div>
                            <div className="relative w-full">
                                <p className="h-2 bg-[rgba(145,158,171,0.16)] w-full rounded"></p>
                                <p className="h-2 bg-[rgb(34,197,94)] rounded absolute top-0 left-0"
                                    style={{ width: `${promotedTravelPackagePercentage}%` }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}