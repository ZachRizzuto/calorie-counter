"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  }).then((res) => {
    if (res.ok) {
      router.push("/login");
    } else {
      throw new Error("Couldn't create account");
    }
  });
}

export default function SignUpForm() {
  const router = useRouter();
  return (
    <>
      <form
        id="signup-form"
        className="bg-gray-800 p-8 flex flex-col min-h-72 m-auto relative justify-center items-center gap-6 w-1/3 top-1/3 border border-blue-500"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await createUser(formData, router);
          const form = document.getElementById(
            "signup-form"
          ) as HTMLFormElement;
          form.reset();
        }}
      >
        <h1 className="text-5xl mt-0">Sign Up!</h1>
        <div>
          <label htmlFor="user">Username: </label>
          <input type="text" name="username" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="pass">Password: </label>
          <input type="password" name="password" autoComplete="off" />
        </div>
        <div>
          <input
            type="submit"
            value="Sign Up"
            className="bg-gray-700 w-32 h-10 mr-8"
          />
          <Link
            href="/login"
            className="text-white hover:text-gray-500 focus-gray-500"
          >
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
