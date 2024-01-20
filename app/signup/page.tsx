"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

async function createUser(data: FormData, router: AppRouterInstance) {
  const user = data.get("username")?.valueOf();
  const password = data.get("password")?.valueOf();

  const userObj = {
    user: user,
    password: password,
  };

  await fetch("http://localhost:3001/auth/signup", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  })
    .then((res) => {
      if (res.ok) {
        router.push("/login");
      }
      return res.json();
    })
    .catch((e: Error) => {
      console.error(e);
    });
}

export default function SignUpForm() {
  const router = useRouter();
  return (
    <>
      <form
        id="signup-form"
        className="bg-light-dark-contrast p-8 flex flex-col min-h-72 m-auto relative justify-center items-center gap-6 sm:w-[60%] md:w-1/3 xs:w-[90%] top-1/3 border border-blue-500"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          if (
            formData.get("username")!.length > 0 &&
            formData.get("password")!.length > 0
          ) {
            await createUser(formData, router);
            const form = document.getElementById(
              "signup-form"
            ) as HTMLFormElement;
            form.reset();
          } else {
            toast.error("Username and Password fields must be filled.");
          }
        }}
      >
        <h1 className="text-5xl mt-0">Sign Up!</h1>
        <div>
          <label htmlFor="user" className="w-[80%] m-auto">
            Username:{" "}
          </label>
          <div className="bg-white rounded-pill p-2 pt-[1px] pb-[1px] w-[80%] m-auto max-w-[300px]">
            <input
              type="text"
              name="username"
              autoComplete="off"
              style={{
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="pass" className="w-[80%] m-auto">
            Password:{" "}
          </label>
          <div className="bg-white rounded-pill p-2 pt-[1px] pb-[1px] w-[80%] m-auto max-w-[300px]">
            <input
              type="password"
              name="password"
              autoComplete="off"
              style={{
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </div>
        </div>
        <div className="lg:block xs:flex xs:flex-col xs:items-center xs:justify-center">
          <input
            type="submit"
            value="Sign Up"
            className="bg-success text-dark-contrast w-32 h-10 lg:mr-8"
          />
          <Link
            href="/login"
            className="text-white hover:text-gray-500 focus-gray-500 hover:text-success focus:text-success xs:mt-2 lg:mt-auto"
          >
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
