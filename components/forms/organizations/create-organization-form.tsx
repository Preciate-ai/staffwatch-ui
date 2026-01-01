"use client";

import React from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateOrganizationInternalSchema } from "@/validators/organizations/create-organization.schema";
// import axios from "axios"; // Assuming we'll plug in the actual API call later or use a service
import { toast } from "sonner"; // sonner is not installed
import { useCreateInternalOrganization } from "@/services/organization.services";

interface CreateOrganizationFormProps {
    onClose: () => void;
}

export function CreateOrganizationForm({ onClose }: CreateOrganizationFormProps) {
    const { mutateAsync: createOrganization } = useCreateInternalOrganization();

    const formik = useFormik({
        initialValues: {
            name: "",
            organizationName: "",
            workEmail: "",
        },
        validationSchema: CreateOrganizationInternalSchema,
        onSubmit: async (values) => {
            try {
                await createOrganization(values);
                toast.success("Organization created successfully");
                onClose();
            } catch (error) {
                toast.error("Failed to create organization");
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="e.g. John Doe"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.name && formik.errors.name ? "border-destructive" : ""}
                />
                {formik.touched.name && formik.errors.name ? (
                    <p className="text-xs text-destructive">{formik.errors.name}</p>
                ) : null}
            </div>

            <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                    id="organizationName"
                    name="organizationName"
                    placeholder="e.g. Acme Corp"
                    value={formik.values.organizationName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.organizationName && formik.errors.organizationName ? "border-destructive" : ""}
                />
                {formik.touched.organizationName && formik.errors.organizationName ? (
                    <p className="text-xs text-destructive">{formik.errors.organizationName}</p>
                ) : null}
            </div>

            <div className="space-y-2">
                <Label htmlFor="workEmail">Work Email</Label>
                <Input
                    id="workEmail"
                    name="workEmail"
                    type="email"
                    placeholder="e.g. john@acmecorp.com"
                    value={formik.values.workEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.workEmail && formik.errors.workEmail ? "border-destructive" : ""}
                />
                {formik.touched.workEmail && formik.errors.workEmail ? (
                    <p className="text-xs text-destructive">{formik.errors.workEmail}</p>
                ) : null}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? "Creating..." : "Create Organization"}
                </Button>
            </div>
        </form>
    );
}
