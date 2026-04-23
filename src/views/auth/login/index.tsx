import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Tampilanlogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        const message =
          res?.error === "CredentialsSignin"
            ? "Email atau password salah"
            : res?.error || "Login failed";
        setError(message);
      }
    } catch (error) {
      setIsLoading(false);
      setError("wrong email or password");
    }
  };

  return (
    <>
      <div className={style.login}>
        <h1 className={style.login_title}>Halaman Login</h1>
        <div className={style.login_form}>
          {error ? <p className={style.login_error}>{error}</p> : null}

          <form onSubmit={handleSubmit}>
            <div className={style.login_form___item}>
              <label htmlFor="email" className={style.login_form___item___label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                className={style.login_form___item___input}
              />
            </div>

            <div className={style.login_form___item}>
              <label
                htmlFor="password"
                className={style.login_form___item___label}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                className={style.login_form___item___input}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={style.login_form___button}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            <br />
            <br />

            <button
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
              className={style.login_form__button}
              disabled={isLoading}
            >
              {isLoading ? "Wait a second..." : "Sign in with Google"}
            </button>

            <br />
            <br />

            <button
              onClick={() => signIn("github", { callbackUrl, redirect: false })}
              className={style.login_form__button}
              disabled={isLoading}
            >
              {isLoading ? "Wait a second..." : "Sign in with GitHub"}
            </button>
          </form>

          <p className={style.login_form___text}>
            Belum punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Tampilanlogin;
