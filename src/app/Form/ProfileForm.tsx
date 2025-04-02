"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
	id: z.number().default(0),
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Invalid Email",
	}),
	mobile_no: z
		.string()
		.min(10, {
			message: "Mobile No must be at least 10 Digit.",
		})
		.max(10, {
			message: "Mobile No must be at least 10 Digit.",
		}),
	amount: z.string().min(4, {
		message: "Amount must be at least 4 Digit.",
	}),
	address: z.string().min(10, {
		message: "Address must be at least 10 Character.",
	}),
});

type FormData = z.infer<typeof formSchema>;

interface ProfileFormProps {
	HandleData: (data: FormData) => void;
	handleCancel: () => void;
	defaultValues: any;
}

export function ProfileForm({
	HandleData,
	handleCancel,
	defaultValues,
}: ProfileFormProps) {
	// ...
	console.log(defaultValues);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	});

	// 2. Define a submit handler.
	const HandleSubmit = (values: FormData) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		HandleData(values);
		form.reset();
		handleCancel();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(HandleSubmit)}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Your Name"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter Your Email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="mobile_no"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mobile No</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Enter Your Mobile No"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Enter Your Amount"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Your Address"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<div className="flex justify-end items-center w-full">
					<Button
						variant="secondary"
						className="bg-gray-400 w-3/12 "
						type="submit"
					>
						{!defaultValues ? "Add Data" : "Update Data"}
					</Button>
					<Button
						variant="secondary"
						className="bg-red-200 mx-6 px-4 w-2/12 "
						type="button"
						onClick={handleCancel}
					>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
}
