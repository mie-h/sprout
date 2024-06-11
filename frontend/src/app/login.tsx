export const getServerSideProps = async () => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;
  console.log(URL);
  const res = await fetch("/api");
  console.log(res);
};

export function Login() {
  return (
    <div>
      <button className="" onClick={() => getServerSideProps()}>
        login
      </button>
    </div>
  );
}
