"use client";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
  Link as HeroLink,
} from "@heroui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <HeroNavbar isBordered maxWidth="full">
      <NavbarBrand>
        <p className="font-bold text-xl tracking-wide text-primary">
          LOCAR<span className="text-zinc-600">Drive</span>
        </p>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-4">
        {session?.user ? (
          <>
            <NavbarItem className="hidden sm:flex">
              <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
            </NavbarItem>

            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  name={session.user.name || "User"}
                  size="sm"
                  color="secondary"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Opções">
                <DropdownItem key="name" className="font-semibold">
                  {session.user.name}
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <NavbarItem>
            <Button as={HeroLink} href="/login" color="primary" variant="flat">
              Entrar
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </HeroNavbar>
  );
}
