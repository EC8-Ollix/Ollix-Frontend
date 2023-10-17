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

export interface ClientRegisterRequest {
    companyName: string
    bussinessName: string
    cnpj: string
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
