"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUpRight } from "lucide-react"

export default function SocialDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground rounded-full"
          aria-label="Follow me on X"
        >
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
          >
            <path d="M14 12.25H9.68L6.297 7.97l-3.873 4.28H.276L5.295 6.7 0 0h4.43l3.06 3.916L11.025 0h2.147L8.485 5.19 14 12.25Zm-3.727-1.244h1.189L3.783 1.18H2.507l7.766 9.827Z" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" align="end">
        <DropdownMenuItem asChild>
          <a
            className="group cursor-pointer justify-between [&_svg]:size-3.5"
            href="https://x.com/intent/follow?screen_name=nrjdalal_com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex grow items-center gap-2">nrjdalal_com</span>
            <ArrowUpRight
              size={16}
              strokeWidth={2}
              className="opacity-0 transition-opacity group-hover:opacity-60"
              aria-hidden="true"
            />
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
