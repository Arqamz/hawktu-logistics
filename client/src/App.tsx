import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import NotificationSystem from "./components/notification-system";
import { Toaster } from "./components/ui/sonner";
export default function App() {
    return (
        <ThemeProvider>
            <NotificationSystem>
            <RouterProvider router={router} />
            <Toaster position="bottom-right" /> 
            </NotificationSystem>
        </ThemeProvider>
    )
}
