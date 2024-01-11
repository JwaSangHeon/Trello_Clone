import { Plus } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div
      className="
      fixed
      px-4
      z-50
      top-0
      bg-white
      border-b
      w-full
      h-14
      flex
      items-center
      shadow-sm
    "
    >
      {/* Mobile sidebar */}
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button
          size="sm"
          className="
          rounded-sm
          hidden
          md:block
          h-auto
          py-1.5
          px-2
        "
        >
          Create
        </Button>
        <Button
          size="sm"
          className="rounded-sm
          block
          md:hidden
          "
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
