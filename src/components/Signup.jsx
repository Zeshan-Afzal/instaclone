import React from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Signup() {
  const { register, handleSubmit } = useForm();
  const loginToAccount = (data) => {};
  return (
    <section className="flex justify-center items-center h-screen w-screen dark:bg-gray-900">
      <div className=" w-3/5 h-3/5  flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <a
              href="#"
              className="  justify-center flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Workflow logo"
              />
            </a>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <form
              onSubmit={handleSubmit(loginToAccount)}
              className="space-y-4 md:space-y-6 "
            >
              <Input
                type="text"
                placeholder="Enter you email"
                name="name"
                label="Your Name"
                {...register("name", { required: true })}
              />
              <Input
                type="email"
                placeholder="Enter you email"
                name="email"
                label="Your Email"
                {...register("email", { required: true })}
              />
              <Input
                type="password"
                placeholder="Enter you email"
                name="password"
                label="Your Password"
                {...register("password", { required: true })}
              />
              <button
                type="submit"
                className="w-full text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have a account?{" "}
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
