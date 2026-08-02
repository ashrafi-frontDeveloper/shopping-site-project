import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import * as AuthService from "./../services/auth.service"

export const AuthProvider = (chidren) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const response = await AuthService.getMe()
                console.log(response);
                
            } catch (error) {
                console.error("[GetMe] ",error);
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }
    })

    return (
        <AuthContext.Provider value={}>
            {chidren}
        </AuthContext.Provider>
    )
}