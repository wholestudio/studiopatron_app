"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormActions, FormField } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/button";
import { loginSchema, type LoginInput } from "@/infra/validation/auth";

export function LoginForm() {
  async function onSubmit() {
    // Customer login will call /api/v1/customer/auth/login when auth is connected.
  }

  return (
    <Form<LoginInput>
      formOptions={{
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
      }}
      onSubmit={onSubmit}
      ariaLabel="Sign in"
      className="mt-8 max-w-md space-y-4"
    >
      <FormField name="email" label="Email" type="email" autoComplete="email" required />
      <FormField
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
      />
      <FormActions>
        <Button type="submit">Sign in</Button>
      </FormActions>
    </Form>
  );
}
