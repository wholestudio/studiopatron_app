"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormActions, FormField } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { registerSchema, type RegisterInput } from "@/lib/validation/auth";

export function RegisterForm() {
  async function onSubmit() {
    // Customer registration will call /api/v1/customer/auth/register when auth is connected.
  }

  return (
    <Form<RegisterInput>
      formOptions={{
        resolver: zodResolver(registerSchema),
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
      }}
      onSubmit={onSubmit}
      ariaLabel="Create account"
      className="mt-8 max-w-md space-y-4"
    >
      <FormField name="name" label="Name" autoComplete="name" required />
      <FormField name="email" label="Email" type="email" autoComplete="email" required />
      <FormField
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        required
      />
      <FormField
        name="confirmPassword"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        required
      />
      <FormActions>
        <Button type="submit">Create account</Button>
      </FormActions>
    </Form>
  );
}
