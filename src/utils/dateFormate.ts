export const formatDate = (value: string) => {
    const date = new Date(value)
    const years = date.getFullYear()
    const month = ('0' + date.getMonth()).slice(-2)
    const day = ('0' + date.getDay()).slice(-2)
    return `${years}-${month}-${day}`

}
