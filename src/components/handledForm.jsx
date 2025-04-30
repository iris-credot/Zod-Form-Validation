import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


 const model= z.object({
  names: z.string().min(7,"Names must have 7 characters and above"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  age: z.number({ invalid_type_error: "Age must be a number" }).min(18,"Age must be 18 years and above"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  messages: z.string().max(200, "Message must be under 200 characters").min(20,"Message must be under 20 characters")
 })
export default function FormsExtraction() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        resolver: zodResolver(model),
      });
    
      const onSubmit = (data) => {
        console.log("Login data:", data);
        alert("Form Submitted")
        reset(); 
      };
  return (
    <div className="w-full h-[700px] max-w-3xl bg-white flex flex-col justify-center items-center p-5 rounded-lg gap-6 shadow-lg">
      <h1 className="text-black text-3xl font-bold">Forms Extraction</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-100 w-full  overflow-auto p-6 flex flex-col rounded-md justify-start items-start text-base gap-4">
        <div className="w-full flex flex-col">
          <label htmlFor="names" className="text-gray-700 font-medium">Names</label>
          <input
            {...register("names")}
            type="text"
            placeholder="Enter your names"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
           {errors.names && (
                <p className="text-red-500 text-sm">{errors.names.message}</p>
              )}
        </div>
        <div className="flex flex-row gap-3 w-full">
        <div className="w-1/2 flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
           {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
        </div>

        <div className="w-1/2 flex flex-col">
          <label htmlFor="age" className="text-gray-700 font-medium">Age</label>
          <input
           {...register("age", { valueAsNumber: true })}
            type="number"
            placeholder="Enter your age"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
           {errors.age && (
                <p className="text-red-500 text-sm">{errors.age.message}</p>
              )}
        </div>
        </div>
         <div className="flex flex-row gap-3 w-full">
          <div className="w-1/2">
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">Phone Number</label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          
          <div className="w-1/2">
            <label htmlFor="gender" className="block text-gray-700 font-semibold mb-1">Gender</label>
            <select
              {...register("gender")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>
          </div> 
          
          <div className="w-full">
            <label htmlFor="messages" className="block text-gray-700 font-semibold mb-1">Message</label>
            <textarea
              {...register("messages")}
              rows={4}
              placeholder="Write your message (max 20 characters)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.messages && <p className="text-red-500 text-sm mt-1">{errors.messages.message}</p>}
          </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 self-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
