import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <Image
      src="/page-not-found.png" 
      alt="404" 
      width= {300} 
      height={300} 
      className={styles.error__image}
      />

      <h1 className={styles.error__title}>
        404 - Halaman Tidak Ditemukan
      </h1>

      <p className={styles.error__desc}>
        Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
      </p>

      <Link href="/" className={styles.error__button}>
        Kembali ke Home
      </Link>
    </div>
  );
};

export default Custom404;