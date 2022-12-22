import React from "react";

interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <div className="flex justify-between px-5 py-4 border-b border-b-gray-200 items-center">
      <h2 className="text-lg text-gray-600 font-bold">{props.title}</h2>
      <div className="px-2 py-1 rounded-xl shadow-xl flex space-x-3">
        <img src="/" className="w-6 h-62 rounded-full" />
      </div>
    </div>
  );
};

export default Header;
