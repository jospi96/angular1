export interface User {

    email: string
    gender: string
    id?: number
    name: string
    status: string

}

export interface Post {
    id?: number
    title: string
    body: string
    user_id?: number

}

export interface Comments {
    post_id: number
    id?: number
    name: string
    email: string
    body: string

}