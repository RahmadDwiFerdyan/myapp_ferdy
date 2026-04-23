import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

const HalamanProduk = () => {
  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(
    query.produk ? `/api/produk/${query.produk}` : null,
    fetcher
  );

  return (
    <div>
      <h1>Halaman Produk</h1>
      <p>Produk: {query.produk}</p>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error...</p>}

      {data && (
        <div>
          <p>Nama: {data.name}</p>
          <p>Harga: {data.price}</p>
        </div>
      )}
    </div>
  );
};

export default HalamanProduk;