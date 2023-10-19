export function formatDateToBR(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function formatStringDateToBR(date: string): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}
