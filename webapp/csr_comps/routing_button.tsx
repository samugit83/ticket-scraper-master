"use client"

import { Button } from "@/components/ui/button"
import { ReactNode } from 'react';
import Link from 'next/link'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

export function RoutingButton({url, hovertext, icon, nextlink, addClass}: {
    url: string, 
    addClass: string,
    hovertext: string,
    icon: ReactNode,
    nextlink?: boolean }) {
  return (
    <HoverCard>
        <HoverCardTrigger asChild>
            {nextlink 
            ?
            <Link href={url}>
                <Button className={`px-[6px] h-[30px] ${addClass}`}>
                    {icon}
                </Button>
            </Link>
            :
            <a href={url} target="_blank" rel="noopener noreferrer">
                <Button className={`px-[6px] h-[30px] ${addClass}`}>
                    {icon}
                </Button>
            </a>}
        </HoverCardTrigger>
        <HoverCardContent className="w-auto p-[10px]">
            <div className="max-h-[400px] max-w-[400px] overflow-auto">
            {hovertext}
            </div>
        </HoverCardContent>
    </HoverCard>
  );

}

