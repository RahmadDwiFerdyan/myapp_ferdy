import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ProductType } from "@/types/Product.type";

type ProdukApiResponse = {
  data: ProductType[];
};

const HalamanProduk = ({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!product) {
    return <p>Produk tidak ditemukan.</p>;
  }

  return (
    <div>
      <h1>Halaman Produk</h1>
      <p>Produk: {product.id}</p>
      <p>Nama: {product.name}</p>
      <p>Harga: {product.price}</p>
    </div>
  );
};

export default HalamanProduk;

export const getServerSideProps: GetServerSideProps<{
  product: ProductType | null;
}> = async ({ params }) => {
  const produkId = String(params?.produk || "");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/produk`);
  const response: ProdukApiResponse = await res.json();

  const product = response.data.find((item) => item.id === produkId) || null;

  return {
    props: {
      product,
    },
  };
};