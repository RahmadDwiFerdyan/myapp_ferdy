import { useRouter } from "next/router";
import HeroSection from "./heroSection";
import MainSection from "./mainSection";

const HalamanProduk = () => {
  const { query } = useRouter();

  return (
    <div>
      <HeroSection />
      <MainSection id={query.id} />
    </div>
  );
};

export default HalamanProduk;