import moment from "moment"

export const FormatNumber = ({ number, withNaira = false }) => {
    let naira = "\u20A6"
    let formatedNumber = parseFloat(number).toLocaleString(undefined, { minimumFractionDigits: withNaira ? 2 : 0, maximumFractionDigits: withNaira ? 2 : 0 })
    let result = withNaira ? naira + formatedNumber : formatedNumber
    return (
        result
    )
}

export const FormatDate = ({ date, withTime = false, timeOnly = false, fromNow = false }) => {
    return (
        fromNow ? moment(date).fromNow() : timeOnly ? moment(date).format('LT') : moment(date).format(`${withTime ? 'Do MMM, YYYY - LT' : 'Do MMM, YYYY'}`)
    )
}