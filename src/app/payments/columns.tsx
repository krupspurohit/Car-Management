import { ColumnDef } from "@tanstack/react-table";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { Button } from "@/components/ui/button";
("use client");

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: number;
	amount?: string;
	name?: string;
	mobile_no?: string;
	email?: string;
	address?: string;
};

export const columns = (
	handleDeleteClick: (id: number) => void,
	handleEditClick: (row: Payment) => void
): ColumnDef<Payment>[] => [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Name",
	},

	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "mobile_no",
		header: "Mobile_No",
	},
	{
		accessorKey: "address",
		header: "Address",
		cell: ({ row }) => {
			const fullAddress = row.original.address ?? "";
			const [selectedAddress, setSelectedAddress] = useState<
				string | null
			>();
			return (
				<>
					<span onClick={() => setSelectedAddress(fullAddress)}>
						{fullAddress.length > 10
							? fullAddress.slice(0, 10) + "..."
							: fullAddress}
					</span>
					<AlertDialog
						open={!!selectedAddress}
						onOpenChange={() => setSelectedAddress(null)}
					>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Your Full Address
								</AlertDialogTitle>
								<AlertDialogDescription>
									{selectedAddress}
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								{/* <AlertDialogAction>Continue</AlertDialogAction> */}
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</>
			);
		},
	},
	{
		accessorKey: "amount",
		header: () => (
			<div className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
				Amount
			</div>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return (
				<div className="  p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
					{formatted}
				</div>
			);
		},
	},
	{
		accessorKey: "action",
		header: () => (
			<div className="px-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
				Action
			</div>
		),
		cell: ({ row }) => {
			return (
				<div className="flex  align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => handleEditClick(row.original)}
					>
						<FaEdit />
					</Button>
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => handleDeleteClick(row.original.id)}
					>
						<MdDelete className="text-red-400" />
					</Button>
				</div>
			);
		},
	},
];
