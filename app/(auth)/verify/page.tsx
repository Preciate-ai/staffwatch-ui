"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { useVerify } from "@/services/auth.services";

const verifySchema = Yup.object().shape({
    otp: Yup.string().length(6, "OTP must be exactly 6 digits").required("OTP is required"),
});

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const verifyMutation = useVerify();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema: verifySchema,
        onSubmit: async (values) => {
            if (!email) return;
            await verifyMutation.mutateAsync({
                email,
                otp: values.otp,
            });
            router.push("/dashboard");
        },
    });

    if (!email) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-red-500">Invalid Request</CardTitle>
                    <CardDescription>
                        Email is missing from the verification request. Please try logging in or signing up again.
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Verify your account</CardTitle>
                <CardDescription className="text-center">
                    Enter the 6-digit code sent to {email}
                </CardDescription>
            </CardHeader>
            <form onSubmit={formik.handleSubmit}>
                <CardContent className="grid gap-4 justify-center">
                    <div className="grid gap-2 items-center flex-col">
                        <Label htmlFor="otp">One-Time Password</Label>
                        <InputOTP
                            maxLength={6}
                            value={formik.values.otp}
                            onChange={(value) => formik.setFieldValue("otp", value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        {formik.touched.otp && formik.errors.otp && (
                            <div className="text-sm text-red-500 text-center">{formik.errors.otp}</div>
                        )}
                        {verifyMutation.isError && (
                            <div className="text-sm text-red-500 text-center">
                                {(verifyMutation.error as any)?.message || "Verification failed. Please try again."}
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={verifyMutation.isPending}>
                        {verifyMutation.isPending ? "Verifying..." : "Verify"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
