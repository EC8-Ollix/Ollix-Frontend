///Generic Types
export interface PaginationRequest {
    page: number
    pageSize: number
    [key: string]: any // Isso permite adicionar quaisquer outras propriedades de parâmetro de query necessárias.
}

// PaginationResponse.ts
export interface PaginationResponse<T> {
    page: number
    pageSize: number
    totalRecords: number
    totalPages: number
    data: T[]
}

//---------------------------------------------

///User Types
export interface UserRegisterRequest {
    firstName: string
    lastName: string
    userEmail: string
    password: string
    confirmPassword: string
}

export interface UserLoginRequest {
    userEmail: string
    password: string
}

export interface User {
    id?: string
    firstName?: string
    lastName?: string
    userEmail: string
    userType?: number
    clientApp?: {
        id?: string
        companyName?: string
        bussinessName?: string
        cnpj?: {
            value: string
        }
        active?: true
    }
}

export interface UserloginResponse {
    token: string
    user: User
}

//---------------------------------------------

// Clients Types

export interface ClientRegisterRequest {
    companyName: string
    bussinessName: string
    cnpj: string
}
export interface ClientsData {
    id: string
    companyName: string
    bussinessName: string
    cnpj: {
        value: string
    }
    active: boolean
    isLoading: boolean
}

// Order Types

export interface OrderData {
    id: string
    requesterName: string
    requesterEmail: string
    observation: string
    requestDate: string
    orderStatus: number
    installationDate: string
    quantityRequested: number
    addressId: string
    clientId: string
}

// Address Types

export interface AddressApp {
    id: string
    postalCode: string
    street: string
    neighborhood: string
    city: string
    state: string
}

export interface HelicesByAddress {
    address: AddressApp
    propellersCount: number
}
