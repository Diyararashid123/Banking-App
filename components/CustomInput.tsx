import React from 'react'
import {Control, FieldPath, Form} from "react-hook-form"

import {
 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from 'zod'
import { AuthFormSchema } from '@/lib/utils'

const formschema = AuthFormSchema('sign-up');

interface CustomInput {
  control:Control<z.infer<typeof formschema>>,
  name: FieldPath<z.infer<typeof formschema>>,
  label: string,
  placeholder: string,
}

const CustomInput = ({ control,label,placeholder,name}:CustomInput) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <div className="form-item">
        <FormLabel className="form-label">
          {label}
        </FormLabel>
        <div className="flex w-full flex-col">
          <FormControl>
            <Input 
              placeholder={placeholder}
              className="input-class"
              type={name === 'password' ? 'password' : 'text'}
              {...field}
            />
          </FormControl>
          <FormMessage className="form-message mt-2" />
        </div>
      </div>
    )}
  />
)
}

export default CustomInput