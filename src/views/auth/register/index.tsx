import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "../../register/register.module.scss";

const TampilanRegister = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const fullname = formData.get("fullname") as string;
    const password = formData.get("password") as string;

    setEmailError("");
    setPasswordError("");
    setGeneralError("");
    setSuccess("");

    if (!email?.trim()) {
      setEmailError("Email wajib diisi");
      return;
    }

    if (!password || password.length < 6) {
      setPasswordError("Password minimal 6 karakter");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullname, password }),
      });

      const data = await response
        .json()
        .catch(() => ({ message: "Terjadi kesalahan" }));

      if (response.ok) {
        form.reset();
        setIsLoading(false);
        setSuccess(data?.message ?? "Register berhasil");
        setTimeout(() => push("/auth/login"), 800);
        return;
      }

      setIsLoading(false);
      const message = data?.message ?? "Terjadi kesalahan";

      if (response.status === 409) {
        setEmailError(message);
        return;
      }

      if (response.status === 400) {
        if (typeof message === "string" && message.toLowerCase().includes("password")) {
          setPasswordError(message);
        } else {
          setEmailError(message);
        }
        return;
      }

      setGeneralError(message);
    } catch {
      setIsLoading(false);
      setGeneralError("Terjadi kesalahan");
    }
  };
  return (
    <div className={style.register}>
      <h1 className={style.register_title}>Halaman Register</h1>
      <div className={style.register_form}>
        {generalError ? (
          <p className={style.register_error}>{generalError}</p>
        ) : null}
        {success ? (
          <p className={style.register_form__text}>
            {success} <Link href="/auth/login">Ke Halaman Login</Link>
          </p>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className={style.register_form__item}>
            <label htmlFor="email" className={style.register_form__label}>
              Email
            </label>
            <p
              className={
                emailError
                  ? style.register_field_error
                  : style.register_field_hint
              }
            >
              {emailError || "*Email wajib diisi"}
            </p>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.register_form__input}
              required
            />
          </div>

          <div className={style.register_form__item}>
            <label htmlFor="fullname" className={style.register_form__label}>
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Fullname"
              className={style.register_form__input}
              required
            />
          </div>

          <div className={style.register_form__item}>
            <label htmlFor="password" className={style.register_form__label}>
              Password
            </label>
            <p
              className={
                passwordError
                  ? style.register_field_error
                  : style.register_field_hint
              }
            >
              {passwordError || "*Password minimal 6 karakter"}
            </p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={style.register_form__input}
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            className={style.register_form__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>

        <p className={style.register_form__text}>
          Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;

