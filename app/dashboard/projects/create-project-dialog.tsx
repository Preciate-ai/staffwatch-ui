"use client"

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateProject } from "@/services/projects.services";
import { Plus } from "lucide-react";
import { useState } from "react";

// Validation schema for creating a project
const CreateProjectSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .required("Project name is required"),
    description: Yup.string()
        .max(500, "Description must be less than 500 characters")
        .optional(),
});

export function CreateProjectDialog() {
    const [open, setOpen] = useState(false);
    const createProjectMutation = useCreateProject();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: CreateProjectSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                await createProjectMutation.mutateAsync(values);
                setOpen(false);
                resetForm();
            } catch (error) {
                console.error("Failed to create project:", error);
                // Ideally show a toast notification here
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Add a new project to your organization. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Project Alpha"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.name && formik.errors.name ? "border-red-500" : ""}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-sm text-red-500">{formik.errors.name}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe the project goals..."
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.description && formik.errors.description ? "border-red-500" : ""}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <p className="text-sm text-red-500">{formik.errors.description}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={formik.isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {formik.isSubmitting ? "Creating..." : "Create Project"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
