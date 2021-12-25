export default function (field, func) {
    return function (obj, query) {
        return func(obj[field], query)
    }
}