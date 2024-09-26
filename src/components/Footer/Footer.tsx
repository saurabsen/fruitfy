import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white rounded-lg mt-14 shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased">
        <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
          &copy; 2024{" "}
          <Link to="/" className="hover:underline">
            Fruitfy
          </Link>
          . All rights reserved.
        </p>
        <div className="flex justify-center items-center space-x-1">
          <Link
            to={"https://github.com/saurabsen"}
            data-tooltip-target="tooltip-github"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <Github />
            <span className="sr-only">Github</span>
          </Link>
          <div
            id="tooltip-github"
            role="tooltip"
            className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
          >
            Follow me on GitHub
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <Link
            to={"https://linkedin.com/in/saurab-sen"}
            data-tooltip-target="tooltip-dribbble"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <Linkedin />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <div
            id="tooltip-dribbble"
            role="tooltip"
            className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
          >
            Connect with me on Linkedin
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
