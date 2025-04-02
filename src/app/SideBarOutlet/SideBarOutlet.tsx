import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Loader from "@/Loader/Loader";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function SideBarOutLet() {
	const [showLoader, setShowLoader] = useState(false);

	const location = useLocation(); // Track route changes

	useEffect(() => {
		// Show loader when route changes
		setShowLoader(true);

		// Simulate loading delay and hide loader
		const timer = setTimeout(() => {
			setShowLoader(false);
		}, 1000); // Adjust timing as needed

		// Cleanup timeout on component unmount or route change
		return () => clearTimeout(timer);
	}, [location.pathname]);
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				{showLoader && <Loader />}
				<main className="w-full mt-2">
					<SidebarTrigger variant="ghost" />
					{!showLoader && <Outlet />}
				</main>
			</SidebarProvider>
		</>
	);
}

export default SideBarOutLet;
