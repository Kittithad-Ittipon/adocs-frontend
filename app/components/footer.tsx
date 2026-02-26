export default function Footer() {
  return (
    <footer className="w-full h-[120px] bg-gray-800 flex justify-center items-center flex-col gap-2 p-2">
      <div className="w-full flex justify-center items-center gap-1">
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=a.kittithad.ittipon@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl mx-2 hover:text-cyan-400 transition duration-200">
          <i className="bx bxl-gmail"></i>
        </a>
        <a href="https://www.facebook.com/a.kittihad" target="_blank" rel="noopener noreferrer" className="text-white text-2xl mx-2 hover:text-cyan-400 transition duration-200">
          <i className="bx bxl-facebook-circle"></i>
        </a>
      </div>
      <span className="text-white text-xs font-[300] text-center w-full">
        © 2025 Adocs Deployment Platform.
      </span>
      <span className="text-white text-xs font-[300] text-center w-full">
        Built with Docker & Next.js & Flask.
      </span>
    </footer>
  );
}
