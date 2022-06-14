export type CreateFormProps = {
    onSave: (value: Value) => void
    data?: Value
}
export type Value = {
    name: string
    info: string
    contacts: string
}
