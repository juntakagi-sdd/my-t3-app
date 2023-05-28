import { type NextPage } from "next";

interface MainProps {
  children: React.ReactNode;
}

const Main: NextPage<MainProps> = ({ children }) => {
  return (
    <main>
      <div className="px-5 pt-5">{children}</div>
    </main>
  );
};

export default Main;
