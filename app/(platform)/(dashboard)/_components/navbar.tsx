import { Plus } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

import { FormPopover } from "@/components/form/form-popover";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <nav
      className="
      fixed
      top-0
      z-50
      w-full
      px-4
      bg-white
      border-b
      shadow-sm
      h-14
      flex
      items-center
    "
    >
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            variant="primary"
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
        </FormPopover>
        <FormPopover>
          <Button
            variant="primary"
            size="sm"
            className="
          rounded-sm
          block
          md:hidden
          "
          >
            <Plus className="w-4 h-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
