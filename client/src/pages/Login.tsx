'use client'

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLogin } from '@/hooks/useLogin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

// Validation schema with zod
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
});

type accountType = 'seller' | 'customer';

export default function LoginPreview() {
  const [accountType, setaccountType] = useState<accountType>('customer');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate=useNavigate
  const { login, isLoading, error, isSuccess } = useLogin();

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response=await login({ ...values, accountType });
      if (response) {
        toast.success('Login successful!');
        window.location.href = accountType === 'seller' ? '/seller-dashboard' : '/shop';
      }
    } catch (err) {
      toast.error(error || 'Login failed');
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="w-full px-4 lg:px-6 h-20 flex items-center justify-between border-b border-border bg-background">
        <div className="container mx-auto flex items-center space-x-4">
          <Link to="/landing" className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold text-primary dark:text-primary-dark">
              HawkTU
            </span>
          </Link>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <Card className="mx-auto max-w-sm">
          <Tabs defaultValue="customer" onValueChange={(value) => setaccountType(value as accountType)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
            </TabsList>
            <TabsContent value="customer">
              <LoginForm accountType="customer" form={form} onSubmit={onSubmit} isLoading={isLoading} error={error} />
            </TabsContent>
            <TabsContent value="seller">
              <LoginForm accountType="seller" form={form} onSubmit={onSubmit} isLoading={isLoading} error={error} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

interface LoginFormProps {
  accountType: accountType;
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

function LoginForm({ accountType, form, onSubmit, isLoading, error }: LoginFormProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Login as {accountType}</CardTitle>
        <CardDescription>
          Enter your email and password to log in to your {accountType} account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="johndoe@mail.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="******"
                        autoComplete="current-password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </Form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/registration" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </>
  );
}

