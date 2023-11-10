import { Timestamp } from "firebase/firestore"
import moment from "moment"

function handleFormatDateB(date: string) {
    return moment(date).format("dddd, MMM Do YYYY")
}

function handleFormatTimestampToDateC(timestamp: Timestamp) {
    const createdAtDate = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6)//1e6 = 1000000
    return moment(createdAtDate).format("DD MMM YYYY")
}

export { handleFormatDateB, handleFormatTimestampToDateC }