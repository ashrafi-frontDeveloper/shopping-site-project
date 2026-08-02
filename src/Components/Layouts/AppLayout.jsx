import { Outlet } from "react-router";
import { Toaster } from "sonner";
import AuthProvider from "../../context/AuthProvider";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const AppLayout = () => {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "IRANSansX",
          },
        }}
      />
      <Header />
      <Outlet />
      <Footer />
    </AuthProvider>
  );
};

export default AppLayout;
