'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormScheme } from '@/lib/types';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/cypresslogo.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/global/Loader';
import { actionLoginUser } from '@/lib/server-action/auth-actions';


const LoginPage = () => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState("");

    const form =useForm<z.infer<typeof FormScheme>>({
        mode:"onChange",
        resolver: zodResolver(FormScheme),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit: SubmitHandler<z.infer<typeof FormScheme>> = async (
        formdata
        ) => {
            const {error} = await actionLoginUser(formdata);
            if (error) {
               form.reset();
                setSubmitError(error.message);
            } 
            router.push("/dashboard");
        };
  return (
    <Form {...form}>
        <form 
        onChange={() => {
            if(submitError){
                setSubmitError("");
            }
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className=' w-full
        sm:justify-center
        sm:w-[400px]
        space-y-6
        flex flex-col'
        >
        <Link href="/"
        className='
        w-full
        flex
        justify-left
        items-center
        '>
        <Image
        src={logo}
        alt="logo"
        width={40}/>

        <span
        className='
        font-semibold
        dark:text-white
        text-4xl
        first-letter:ml-2'>
            SyncSphere
        </span>
        </Link>
        <FormDescription
            className='text-foreground/60'
        >
            An all-In-One Collaboration and Productivity Platform
        </FormDescription>

        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={isLoading}
        >
          {!isLoading ? 'Login' : <Loader />}
        </Button>
        <span className="self-container">
          Dont have an account?{' '}
          <Link
            href="/signup"
            className="text-primary"
          >
            Sign Up
          </Link>
        </span>

        </form>
    </Form>
  )
}

export default LoginPage