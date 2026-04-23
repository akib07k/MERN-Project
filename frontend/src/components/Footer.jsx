const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <p className="text-white font-bold tracking-wide">Akbuy</p>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</p>
          {/* <p className="text-indigo-400 font-medium">Developed by AGRAHARAM NAVEEN KUMAR</p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
