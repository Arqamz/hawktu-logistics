import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import NotificationSystem from "./components/notification-system";
export default function App() {
    return (
        <ThemeProvider>
            <NotificationSystem>
            <RouterProvider router={router} />
            </NotificationSystem>
        </ThemeProvider>
    )
}
