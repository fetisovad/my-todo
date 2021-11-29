// export default new Intl.DateTimeFormat("en-GB", {
//     year: "2-digit",
//     month: "2-digit",
//     day: "2-digit",
//     hour: '2-digit',
//     minute: '2-digit',
// })

export const formatDate = (date) => new Date(date).toLocaleString()