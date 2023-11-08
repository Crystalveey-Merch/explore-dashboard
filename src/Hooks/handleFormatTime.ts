import moment from "moment"


export const handleFormatTime = (time: string) => {
    return moment(time, "h:mm:ss a").format("h:mm A")
}