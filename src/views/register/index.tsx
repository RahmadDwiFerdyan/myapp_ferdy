import Link from "next/link";
import style from "../../auth/register/register.module.scss";

const TampilanRegister = () => {
    return (
        <div className={style.register}>
            <h1 className={style.register_title}>Halaman Register</h1>
            <Link href="/auth/login">Ke Halaman Login</Link>
        </div>
    );
};

export default TampilanRegister;