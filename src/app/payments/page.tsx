import { useState } from "react";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { ProfileForm } from "../Form/ProfileForm";

export default function DemoPage({
	data,
	onDelete,
	onEdit,
}: {
	data: any;
	onDelete: (id: number | null) => void;
	onEdit: (row: any) => void;
}) {
	const [deletedId, setDeletedId] = useState<number | null>(null);
	const [editData, setEditData] = useState<Payment | null>(null);

	const handleDeleteClick = (id: number) => {
		setDeletedId(id); // Set the ID to show the dialog
	};

	const handleEditClick = (editRow: any) => {
		setEditData(editRow);
	};

	return (
		<div className="container  mx-auto py-10">
			<DataTable
				columns={columns(handleDeleteClick, handleEditClick)}
				data={data}
			/>

			{/* Delete Confirmation Dialog */}

			<AlertDialog
				open={deletedId !== null}
				onOpenChange={(isopen) => !isopen && setDeletedId(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure want to Delete?
						</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setDeletedId(null)}>
							No
						</AlertDialogCancel>
						<AlertDialogAction onClick={() => onDelete(deletedId)}>
							Yes
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Open Edit Dialog */}
			<AlertDialog open={editData != null}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Update Your Data</AlertDialogTitle>
						<AlertDialogDescription>
							<ProfileForm
								defaultValues={editData}
								HandleData={onEdit}
								handleCancel={() => setEditData(null)}
							/>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						{/* <AlertDialogAction>Continue</AlertDialogAction> */}
						{/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
