import Image from "next/image";

export default function Brand() {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/logo.png"
        alt="Logo"
        quality={100}
        width={40}
        height={40}
        className="rounded-full"
      />
      <h1 className="text-2xl text-white font-semibold">Geetask</h1>
    </div>
  );
}
