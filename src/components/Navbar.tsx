import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className="fixed z-50 w-full flex items-center justify-evenly p-4 bg-blue-900 text-white">
      <h1 className="text-2xl font-semibold">Todo App</h1>

      <NavigationMenu>
        <NavigationMenuList className="flex items-center space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/tasks">Tasks</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
