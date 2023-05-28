import { type NextPage } from "next";

const Nav: NextPage = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-5 flex-shrink-0">
              <span className="font-medium text-[hsl(280,100%,70%)]">
                T3 App
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
