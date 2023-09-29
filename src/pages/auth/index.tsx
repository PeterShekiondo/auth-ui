import { Eye } from "@/components/icons/eye-icon";
import { EyeOff } from "@/components/icons/eye-off-icon";
import Alert, { AlertProps } from "@/components/ui/alert";
import AuthLayout from "@/layout/authLayout";
import { performFormDataHttp } from "@/network/httpClient";
import { AuthResponseType, DepartmentType } from "@/types";
import { setToken, setUser, routing } from "@/util/utils";
import { useRouter } from "next/router";
import { useState } from "react";

export default function logInPage(){

  const router = useRouter();
  const [signIn, setsignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [sigInloading, setSigInloading] = useState<string>("Sign in");
  const [sigUploading, setSigUploading] = useState<string>("Create account");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [alert, setAlert] = useState<AlertProps | null>();

  const [departmentList, setDepartmentList] = useState<DepartmentType[]>([]);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<String>("");
  const [newConfirmPassword, setNewConfirmPassword] = useState<string>("");
  const [phone, setPhone] = useState<String>("");
  const [department, setDepartment] = useState<DepartmentType>();

  const createAccount = async()=>{
    setAlert(null);
    if (newConfirmPassword != newPassword)
      return setAlert({
        message: `Password must match`,
        variant: "error",
        closeable: true,
      });

    setSigUploading("Loading..");
    var res: AuthResponseType = await performFormDataHttp("POST", {
      endPoint: "/auth/register",
      data: {
        firstName: firstName,
        lastName: lastName,
        email: newEmail,
        phone: phone,
        password: newPassword,
        department: department,
      },
    });

    if (!res.error) {
      setAlert({
        message: `${res.message}`,
        variant: "success",
        closeable: true,
      });
      setToken(res.token);
      if (res.user) {
        setUser(res.user);
        routing(res.user?.roles[0], router);
      }
    } else {
      setAlert({
        message: `${res.message}`,
        variant: "error",
        closeable: true,
      });
    }
    setSigUploading("Create account");
  }

  const logIn = async() => {
    setAlert(null);
    setSigInloading("Loading..");
    var res: AuthResponseType = await performFormDataHttp("POST", {
      endPoint: "/auth",
      data: {
        email: email,
        password: password,
      },
    });
    if (!res.error) {
      setAlert({
        message: `${res.message}`,
        variant: "success",
        closeable: true,
      });
      setToken(res.token);
      if (res.user) {
        setUser(res.user);
        routing(res.user?.roles[0], router);
      }
    } else {
      setAlert({
        message: `${res.message}`,
        variant: "error",
        closeable: true,
      });
    }
    setSigInloading("Sign in");
  }


    return (
        <AuthLayout
          child={
            <section>
              {signIn ? (
                <div
                  className="flex flex-col items-center justify-center px-6 py-8
                 mx-auto md:h-screen lg:py-0"
                >
                  <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-bold text-gray-900"
                  >
                    Access account
                  </a>
                  <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 
                  dark:border-gray-100"
                  >
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in to your account
                      </h1>
    
                      {alert && (
                        <Alert
                          message={alert?.message}
                          onClose={alert?.onClose}
                          variant={alert?.variant}
                        />
                      )}
    
                      <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={(value) => {
                          value.preventDefault();
                          logIn();
                        }}
                      >
                        <div>
                          <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                            Email
                          </label>
    
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@company.com"
                            required={true}
                            onChange={(value) => setEmail(value.target.value)}
                            className="text-sm focus:shadow-soft-gigas-outline 
                          leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid 
                          border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all 
                          focus:border-gigas-300 focus:bg-white
                           focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            aria-label="Name"
                            aria-describedby="email-addon"
                          />
                        </div>
    
                        <div>
                          <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                            Password
                          </label>
    
                          <div className="relative">
                            <input
                              type={`${showPassword ? "text" : "password"}`}
                              name="password"
                              id="Password"
                              placeholder="••••••••"
                              className="text-sm focus:shadow-soft-gigas-outline leading-5.6 ease-soft 
                              block w-full appearance-none rounded-lg border border-solid border-gray-300
                              bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all 
                              focus:border-gigas-300 focus:bg-white focus:text-gray-700 focus:outline-none 
                              focus:transition-shadow"
                              aria-label="Password"
                              aria-describedby="password-addon"
                              required={true}
                              onChange={(value) => setPassword(value.target.value)}
                            />
    
                            <div className="absolute inset-y-0 right-3 flex items-center">
                              <button
                                type="button"
                                className="w-5"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <Eye className="text-gray-600" />
                                ) : (
                                  <EyeOff className="text-gray-600" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
    
                        <div className="flex items-center justify-between">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gigas-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gigas-600 dark:ring-offset-gray-800"
                                required={false}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500">
                                Remember me
                              </label>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="text-sm font-medium text-gigas-600 hover:underline dark:text-gigas-500"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-gigas-500 
                                font-medium rounded-lg 
                                text-sm px-5 py-2.5 text-center hover:bg-gigas-600"
                        >
                          {sigInloading}
                        </button>
                        <p className="text-sm font-light text-gray-600">
                          Don’t have an account yet?{" "}
                          <a
                            href="#"
                            onClick={() => {
                              setAlert(null);
                              setsignIn(false);
                            }}
                            className="font-medium text-gigas-600 hover:underline ml-1"
                          >
                            Sign up
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-bold text-gray-900"
                  >
                    Create account
                  </a>
                  <div
                    className="w-full bg-white rounded-lg shadow dark:border 
                  md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-100"
                  >
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Create new account
                      </h1>
    
                      {alert && (
                        <Alert
                          message={alert?.message}
                          onClose={alert?.onClose}
                          variant={alert?.variant}
                        />
                      )}
    
                      <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={(value) => {
                          value.preventDefault();
                          createAccount();
                        }}
                      >
                        <div className="grid md:grid-cols-12 md:gap-3">
                          <div className="col-span-6">
                            <label
                              htmlFor="userName"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              First name
                            </label>
                            <input
                              type="userName"
                              name="userName"
                              id="userName"
                              className="bg-gray-50 border border-gray-300 sm:text-sm
                                     rounded-lg focus:ring-gigas-600 focus:border-gigas-600 block w-full p-2.5 
                                      dark:border-gray-200 dark:placeholder-gray-400 text-gray-900 dark:focus:ring-gigas-500
                                       dark:focus:border-gigas-500"
                              placeholder="first name"
                              required={true}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="userName"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Last name
                            </label>
                            <input
                              type="userName"
                              name="userName"
                              id="userName"
                              className="bg-gray-50 border border-gray-300 sm:text-sm
                                     rounded-lg focus:ring-gigas-600 focus:border-gigas-600 block w-full p-2.5 
                                      dark:border-gray-200 dark:placeholder-gray-400 text-gray-900 dark:focus:ring-gigas-500
                                       dark:focus:border-gigas-500"
                              placeholder="last name"
                              required={true}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
    
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Your email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 sm:text-sm
                                     rounded-lg focus:ring-gigas-600 focus:border-gigas-600 block w-full p-2.5 
                                      dark:border-gray-200 dark:placeholder-gray-400 text-gray-900 dark:focus:ring-gigas-500
                                       dark:focus:border-gigas-500"
                            placeholder="name@company.com"
                            required={true}
                            onChange={(e) => setNewEmail(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 sm:text-sm
                                     rounded-lg focus:ring-gigas-600 focus:border-gigas-600 block w-full p-2.5 
                                      dark:border-gray-200 dark:placeholder-gray-400 text-gray-900 dark:focus:ring-gigas-500
                                       dark:focus:border-gigas-500"
                            placeholder="0712334455"
                            required={true}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
    
                        <div className="mt-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Department
                          </label>
                          <select
                            id="small"
                            className="block w-full px-2 py-3 mb-6 text-sm border
                       border-gray-200 rounded-lg bg-gray-50 
                        placeholder-gray-400"
                            onChange={(e) =>
                              setDepartment(
                                departmentList.filter(
                                  (element) => element.name == e.target.value
                                )[0]
                              )
                            }
                          >
                            {
                                departmentList.length > 0 ? departmentList.map((department, key) => (
                                    <option key={key} value={`${department.name}`}>
                                        {department.name}
                                    </option>
                                    )): 
                                    <>
                                        <option className="text-gray-900"> Department 1</option>
                                        <option className="text-gray-900"> Department 2</option>
                                        <option className="text-gray-900"> Department 3</option>
                                    </>

                            }
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Password
                          </label>
                          {/*  */}
                          <div className="relative">
                            <input
                              type={`${showPassword ? "text" : "password"}`}
                              name="password"
                              id="password"
                              placeholder="••••••••"
                              className="bg-gray-50 border border-gray-300 text-gray-900 
                                    sm:text-sm rounded-lg focus:ring-gigas-600 focus:border-gigas-600
                                     block w-full p-2.5 dark:border-gray-200 placeholder-gray-400"
                              required={true}
                              onChange={(e) =>
                                setNewConfirmPassword(e.target.value)
                              }
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center">
                              <button
                                type="button"
                                className="w-5"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <Eye className="text-gray-600" />
                                ) : (
                                  <EyeOff className="text-gray-600" />
                                )}
                              </button>
                            </div>
                          </div>
                          {/*  */}
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Confirm password
                          </label>
                          <input
                            type={`${showPassword ? "text" : "password"}`}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 
                            sm:text-sm rounded-lg focus:ring-gigas-600 focus:border-gigas-600
                             block w-full p-2.5 dark:border-gray-200 placeholder-gray-400"
                            required={true}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-gigas-500 
                                 focus:ring-4 focus:outline-none 
                                font-medium rounded-lg 
                                text-sm px-5 py-2.5 text-center hover:bg-gigas-700 
                                focus:ring-gigas-800"
                        >
                          {sigUploading}
                        </button>
                        <p className="text-sm font-light text-gray-600">
                          <a
                            href="#"
                            className="font-medium text-gigas-600 hover:underline mr-1"
                            onClick={() => {
                              setAlert(null);
                              setsignIn(true);
                            }}
                          >
                            Sign in
                          </a>{" "}
                          to your account
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </section>
          }
        />
      );

}