"use client"

import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import Link from "next/link"

const OpenInV0 = ({ componentSource }: { componentSource: string }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "text-muted-foreground/80 hover:text-foreground transition-none hover:bg-transparent disabled:opacity-100 lg:opacity-0 lg:group-focus-within/item:opacity-100 lg:group-hover/item:opacity-100",
            )}
            href={`https://v0.dev/chat/api/open?url=${encodeURIComponent(componentSource)}`}
            target="_blank"
            aria-label="Open in v0"
          >
            <svg
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                clipRule="evenodd"
                d="M9.50321 5.5H13.2532C13.3123 5.5 13.3704 5.5041 13.4273 5.51203L9.51242 9.42692C9.50424 9.36912 9.5 9.31006 9.5 9.25L9.5 5.5L8 5.5L8 9.25C8 10.7688 9.23122 12 10.75 12H14.5V10.5L10.75 10.5C10.6899 10.5 10.6309 10.4958 10.5731 10.4876L14.4904 6.57028C14.4988 6.62897 14.5032 6.68897 14.5032 6.75V10.5H16.0032V6.75C16.0032 5.23122 14.772 4 13.2532 4H9.50321V5.5ZM0 5V5.00405L5.12525 11.5307C5.74119 12.3151 7.00106 11.8795 7.00106 10.8822V5H5.50106V9.58056L1.90404 5H0Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="text-muted-foreground px-2 py-1 text-xs">
          Open in v0
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default OpenInV0
