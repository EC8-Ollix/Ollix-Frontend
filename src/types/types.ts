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
    orderNumber: string
    requesterName: string
    requesterEmail: string
    observation: string
    requestDate: string
    orderStatus: number
    installationDate: string
    quantityRequested: number
    addressId: string
    addressApp: AddressApp
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

export interface HeliceByAddress {
    address: AddressApp
    propellersCount: number
}

// Logs Types

export interface LogApp {
    id: string
    entity: string
    entityId: string
    operation: string
    userName: string
    date: string
}

// Helices Types

export interface Helice {
    id: string
    helixId: string
    active: boolean
    installed: boolean
    addressId: string
    address: AddressApp
    clientId: string
    orderId: string
    order: OrderData
    isLoading: boolean
}
