import styles from "../../pages/produk/produk.module.scss";
import Link from "next/link";
import Image from "next/image";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk_title}>Daftar Produk</h1>

      <div className={styles.produk_content}>
        {products.length > 0 ? (
          <>
            {products.map((products: ProductType) => (
              <Link
                href={`/produk/${products.id}`}
                key={products.id}
                className={styles.produk__content__item}
              >
                <div className={styles.produk_content_item__image}>
                  <Image
                    src={products.image}
                    alt={products.name}
                    width={300}
                    height={300}
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <h4 className={styles.produk_content_item_name}>
                  {products.name}
                </h4>

                <p className={styles.produk_content_item_category}>
                  {products.category}
                </p>

                <p className={styles.produk_content_item__price}>
                  Rp {products.price.toLocaleString("id-ID")}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <div className={styles.produk_content_skeleton}>
            <div className={styles.produk_content_skeleton__image}></div>
            <div className={styles.produk_content_skeleton_name}></div>
            <div className={styles.produk_content_skeleton_category}></div>
            <div className={styles.produk_content_skeleton__price}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;