import NavItems, { UserProfile } from "@/components/layout/nav-item";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MenuIcon, X } from "lucide-react";
import appConfig, { cssVars } from "@/app.config";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { subtitle, title } from "@/components/primitives";

export default function Sidenav() {
    return (
        <Sheet>
            <div style={{ height: `${cssVars.headerPx + (cssVars.marginPx * 2)}px`, padding: `${cssVars.marginPx}px` }} className={`flex flex-row top-0 w-full fixed z-50 bg-background`}>
                <span className="flex flex-row gap-x-6 flex-1">
                    <SheetTrigger asChild>
                        <Button size={'icon'} variant={"outline"} className="rounded-full">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <Link href={'/'} className="flex flex-row gap-x-2 items-center select-none">
                        <Image src={appConfig.icons.icon} alt={appConfig.title} height={cssVars.headerPx} width={cssVars.headerPx} className="w-8 h-8 aspect-square rounded-md" />
                        <p className={title({ className: "text-xl lg:text-2xl" })}>{appConfig.title}</p>
                    </Link>
                </span>

                <UserProfile />
            </div>

            <SheetContent className={`w-[65%] sm:w-[50%] md:w-[300px] p-0`} side={"left"}>
                <SheetHeader className="flex flex-row w-full items-center space-y-0" style={{ padding: `${cssVars.marginPx}px`, paddingBottom: 0, height: `${cssVars.navHeaderPx}px` }} >
                    <span className="flex flex-1 flex-row items-center gap-x-2 select-none">
                        <Image src={appConfig.icons.icon} alt={appConfig.title} height={cssVars.headerPx} width={cssVars.headerPx} className="w-7 h-7 aspect-square rounded-md" />
                        <SheetTitle className={title({ className: "text-xl lg:text-2xl" })}>{appConfig.title}</SheetTitle>
                    </span>
                    <SheetClose asChild>
                        <Button variant={'outline'} size={'icon'} className={'w-7 h-7'}><X /></Button>
                    </SheetClose>
                </SheetHeader>

                <ScrollArea className="w-full" style={{ padding: `${cssVars.marginPx}px`, paddingTop: `${cssVars.navItemsMarginPx}px`, height: `calc(100% - ${cssVars.navHeaderPx + cssVars.navItemsMarginPx}px)` }}>
                    <NavItems />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
