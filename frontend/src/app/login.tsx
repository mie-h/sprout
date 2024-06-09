import { GetServerSideProps } from "next";

interface NewRouteData {
  message: string;
}

interface NewRoutePageProps {
  data: NewRouteData;
}

export const getServerSideProps: GetServerSideProps<NewRoutePageProps> = async (
  context
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api`);
  const data: NewRouteData = await res.json();

  return {
    props: { data },
  };
};

const NewRoutePage: React.FC<NewRoutePageProps> = ({ data }) => {
  return (
    <div>
      <h1>New Route Data</h1>
      <p>{data.message}</p>
    </div>
  );
};

export default NewRoutePage;
