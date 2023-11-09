import moment from "moment"

function handleFormatDateB(date: string) {
    return moment(date).format("dddd, MMM Do YYYY")
}


export { handleFormatDateB}