import { useRouter } from "next/router";

const halamanKategori = () => {
//   const Router = useRouter();
//   console.log(Router);
     const { query } = useRouter();
  return (
    <div>
      <h1>Halaman Kategori</h1>
      <p>Kategori: {Array.isArray(query.slug) ? query.slug.join("-") : query.slug}</p>
    </div>
  );
};

export default halamanKategori;