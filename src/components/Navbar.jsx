import "../index.css";
const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between bg-slate-700 text-white py-9">
        <div className="logo">
          <span className="font-bold text-xl mx-9 ">i Task</span>
        </div>
        <ul className="flex gap-8 mx-9 ">
          <li className="hover:bg-sky-700 hover:visited:bg-blue-700 cursor-pointer hover:font-bold transition-all">
            Home
          </li>
          <li className="hover:bg-sky-700 hover:visited:bg-blue-700 cursor-pointer hover:font-bold transition-all">
            your tasks
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
