export default function Footer() {
  return (
    <footer className="bg-gray-800 mt-auto">
      <div className=" text-white py-12 text-center">
        <p className="text-2xs">
          &copy; {new Date().getFullYear()} Todo App. All rights reserved.
        </p>
        <p className="text-xs mt-2">Built with Next.js and Prisma.</p>
      </div>
    </footer>
  );
}

