import { Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 mt-auto border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-8 md:grid-cols-2">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold tracking-wider text-white">Geetask</h2>
          <p className="text-sm mt-2">
            © {new Date().getFullYear()} Geetask. All rights reserved.
          </p>
          <p className="text-sm mt-1">
            Built with <span className="text-blue-500">Next.js</span> & <span className="text-purple-400">Prisma</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-4">
            <a
              href="https://github.com/goodnessdevs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white border rounded p-2 transition"
            >
              <Github />
            </a>
            <a
              href="https://linkedin.com/in/goodness-omogbeja-47b99a292"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white border rounded p-2 transition"
            >
              <Linkedin />
            </a>
            <a
              href="https://www.instagram.com/gee_nyne/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white border rounded p-2 transition"
            >
              <Instagram />
            </a>
          </div>
          <p className="text-sm">
            Contact:{" "}
            <a
              href="mailto:devswithgoody82@gmail.com"
              className="hover:underline hover:text-blue-400"
            >
              devswithgoody82@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
