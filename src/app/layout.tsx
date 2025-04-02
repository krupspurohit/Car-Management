import DemoPage from "./payments/page";
import { AlertDl } from "./Dialog/AlertDl";
import { useEffect, useState } from "react";
import { Payment } from "./payments/columns";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import Loader from "@/Loader/Loader";

export default function Layout() {
	const [data, setData] = useState<Payment[]>(getData());
	const [loading, setLoading] = useState(false);

	function getData(): Payment[] {
		// Fetch data from your API here.
		if (typeof window !== "undefined") {
			const storeData = localStorage.getItem("formData");
			return storeData ? JSON.parse(storeData) : [];
		}
		return [];
	}

	useEffect(() => {
		localStorage.setItem("formData", JSON.stringify(data));
	}, [data]);

	const HandleData = (newData: Payment) => {
		setLoading(true);
		setTimeout(() => {
			const updateData = [...data, { ...newData, id: data.length + 1 }];
			setData(updateData);

			toast.success(`Data Added successfully!!`, {
				action: {
					label: "Closed",
					onClick(event) {
						console.log(event);
					},
				},
			});
			setLoading(false);
		}, 1000);
	};

	const HandleDelete = (id: number | null): void => {
		setLoading(true);
		setTimeout(() => {
			const newData = data.filter((row) => row.id !== id);
			setData(newData);
			toast.error(`Data Deleted successfully!!`, {
				action: {
					label: "Closed",
					onClick(event) {
						console.log(event);
					},
				},
			});
			setLoading(false);
		}, 1000);
	};

	const HandleEdit = (editRow: Payment) => {
		setLoading(true);
		setTimeout(() => {
			const updateData = data.map((row) =>
				row.id === editRow.id ? { ...row, ...editRow } : row
			);
			setData(updateData);
			toast.info(`Data Updated successfully!!`, {
				action: {
					label: "Closed",
					onClick(event) {
						console.log(event);
					},
				},
			});
			setLoading(false);
		}, 1000);
	};

	return (
		<>
			{loading && <Loader />}
			<AlertDl HandleData={HandleData} />{" "}
			<DemoPage data={data} onDelete={HandleDelete} onEdit={HandleEdit} />
			<Toaster
				duration={2000}
				richColors
				theme="dark"
				offset={30}
				style={{ backgroundColor: "gray/50" }}
			/>
		</>
	);
}
