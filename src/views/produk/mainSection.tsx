type Props = {
  id: string | string[] | undefined;
};

const MainSection = ({ id }: Props) => {
  return (
    <section>
      <p>Produk: {id}</p>
    </section>
  );
};

export default MainSection;