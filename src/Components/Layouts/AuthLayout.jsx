import { Outlet } from "react-router"

export const AuthLayout = () => {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center bg-[#eae9e9]">
        <div className="w-full md:w-[426px] rounded-2xl p-6 bg-[#f6f6f6]">
            <Outlet />
        </div>
    </div>
  )
}
