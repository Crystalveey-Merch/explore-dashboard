import { Timestamp } from "firebase/firestore";
import moment from "moment";

function handleFormatToDateAndTime(timestamp: Timestamp) {
    const createdAtDate = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6); // 1e6 = 1000000
    return moment(createdAtDate).format("dddd, MMM Do YYYY, HH:mm");
}

export { handleFormatToDateAndTime };
