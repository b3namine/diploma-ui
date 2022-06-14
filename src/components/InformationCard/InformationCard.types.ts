export type InformationCardProps = {
    id: number
    name: string
    info: string
    contacts: string
    handleGoTo?: () => void
    onEdit?: () => void
    onDelete?: () => void
    editable?: boolean
}
