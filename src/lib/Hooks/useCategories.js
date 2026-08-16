import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/category.service";

const useCategories = () => {
    const [categories, setCtegories] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await getAllCategories()
                setCtegories(res?.data?.categories || [])
            } catch (error) {
                console.log(error);
                
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return {categories , isLoading}
}

export default useCategories;