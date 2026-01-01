import * as Yup from "yup";

export const CreateOrganizationInternalSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    organizationName: Yup.string().required("Organization Name is required"),
    workEmail: Yup.string()
        .email("Work Email must be a valid email")
        .required("Work Email is required")
        .test("is-work-email", "Please use a work email address", (value) => {
            if (!value) return false;
            const publicDomains = [
                "gmail.com",
                "yahoo.com",
                "hotmail.com",
                "outlook.com",
                "aol.com",
                "icloud.com",
                "proton.me",
                "protonmail.com",
                "zoho.com",
                "yandex.com",
                "mail.com",
                "gmx.com",
            ];
            const domain = value.split("@")[1];
            return !publicDomains.includes(domain);
        }),
});
