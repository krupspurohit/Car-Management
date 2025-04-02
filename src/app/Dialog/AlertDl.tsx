import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "../Form/ProfileForm";

import { useState } from "react";

export function AlertDl({ HandleData }: { HandleData: (x: any) => void }) {
	const [open, setOpen] = useState(false);

	const handleCancel = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<AlertDialog open={open}>
			<Button
				variant="secondary"
				size="lg"
				className="bg-blue-400"
				onClick={() => handleOpen()}
			>
				Add Data
			</Button>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Add Your Data</AlertDialogTitle>
					<AlertDialogDescription>
						<ProfileForm
							defaultValues={null}
							HandleData={HandleData}
							handleCancel={handleCancel}
						/>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					{/* <AlertDialogAction>Continue</AlertDialogAction> */}
					{/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
