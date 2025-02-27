import { TTypeRegistry } from "../types"

export interface IRegistry {
    id: string
    description: string
    idCategory?: string
    type: TTypeRegistry
    date: string
    quantity: number
    user: string
}