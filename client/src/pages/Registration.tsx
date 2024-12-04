'use client'

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Import the useRegistration hook and the request types
import { useRegistration } from '@/hooks/useRegistration';
import { CustomerRegisterRequest, SellerRegisterRequest } from '@/types/auth/RegistrationTypes';

// Define validation schemas using Zod
const baseSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters long' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z.string().min(10, { message: 'Phone number must be valid' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
  confirmPassword: z.string(),
});

const sellerSchema = baseSchema.extend({
  businessName: z.string().min(1, { message: 'Business name is required' }),
  address: z.object({
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    district: z.string().min(1, { message: 'District is required' }),
    addressLineOne: z.string().min(1, { message: 'Address Line One is required' }),
    addressLineTwo: z.string().optional(),
    additionalInfo: z.string().optional(),
  }),
});

const customerSchema = baseSchema.extend({
  address: z.object({
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    district: z.string().min(1, { message: 'District is required' }),
    addressLineOne: z.string().min(1, { message: 'Address Line One is required' }),
    addressLineTwo: z.string().optional(),
    additionalInfo: z.string().optional(),
  }),
});

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<'customer' | 'seller'>('customer');
  const isSeller = activeTab === 'seller';
  const formSchema = isSeller ? sellerSchema : customerSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      businessName: '',
      address: {
        country: '',
        city: '',
        district: '',
        addressLineOne: '',
        addressLineTwo: '',
        additionalInfo: '',
      },
    },
  });

  // Use the custom hook for registration
  const { registerCustomer, registerSeller, loading, error, successMessage } = useRegistration();

  const navigate = useNavigate(); // For redirection

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const requestData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
        confirmPassword: values.confirmPassword,
        address: values.address,
      };

      let response;
      if (isSeller) {
        const sellerData: SellerRegisterRequest = {
          ...requestData,
          businessName: values.businessName,
        };
        response = await registerSeller(sellerData);
      } else {
        const customerData: CustomerRegisterRequest = requestData;
        response = await registerCustomer(customerData);
      }

      // Show success toast and redirect to login page
      toast.success('Registration successful! Please log in.');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Form submission error', err);
      toast.error('Failed to Register.');
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4">
      <header className="w-full px-4 lg:px-6 h-20 flex items-center justify-between border-b border-border bg-background">
        <div className="container mx-auto flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold text-primary dark:text-primary-dark">
              HawkTU
            </span>
          </Link>
        </div>
      </header>
      <Card className="mx-auto max-w-sm my-10">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('customer')}
            className={`flex-1 py-2 text-center ${activeTab === 'customer' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          >
            Customer
          </button>
          <button
            onClick={() => setActiveTab('seller')}
            className={`flex-1 py-2 text-center ${activeTab === 'seller' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          >
            Seller
          </button>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Create a new account by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* Form Fields */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <FormControl>
                        <Input id="firstName" placeholder="Jane" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <FormControl>
                        <Input id="lastName" placeholder="Allen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input id="email" placeholder="janeallen@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                      <FormControl>
                        <Input id="phoneNumber" placeholder="+1234567891" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isSeller && (
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="businessName">Business Name</FormLabel>
                        <FormControl>
                          <Input id="businessName" placeholder="Acme Inc" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Address Fields */}
                <FormField
                  control={form.control}
                  name="address.country"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="address.country">Country</FormLabel>
                      <FormControl>
                        <Input id="address.country" placeholder="USA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="address.city">City</FormLabel>
                      <FormControl>
                        <Input id="address.city" placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.district"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="address.district">District</FormLabel>
                      <FormControl>
                        <Input id="address.district" placeholder="Manhattan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.addressLineOne"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="address.addressLineOne">Address Line One</FormLabel>
                      <FormControl>
                        <Input id="address.addressLineOne" placeholder="123 Main Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.addressLineTwo"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="address.addressLineTwo">Address Line Two (Optional)</FormLabel>
                      <FormControl>
                        <Input id="address.addressLineTwo" placeholder="Apartment 4C" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.additionalInfo"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="address.additionalInfo">Additional Info (Optional)</FormLabel>
                      <FormControl>
                        <Input id="address.additionalInfo" placeholder="Near Central Park" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Fields */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <FormControl>
                        <Input id="confirmPassword" type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
