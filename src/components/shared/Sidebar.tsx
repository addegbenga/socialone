import { useState } from "react";
import {
  Home,
  PlusCircle,
  FileText,
  Zap,
  AtSign,
  BarChart2,
  Menu,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Link } from "@tanstack/react-router";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const data1 = [
    { name: "Home", icon: <Home className="h-4 w-4" />, url: "/", id: 1 },
    {
      name: "Create",
      icon: <PlusCircle className="h-4 w-4" />,
      url: "/create",
      id: 2,
    },
    {
      name: "Draft",
      icon: <FileText className="h-4 w-4" />,
      url: "/draft",
      id: 3,
    },
  ];

  const data2 = [
    {
      name: "Engagement Builder",
      icon: <Zap className="h-4 w-4" />,
      url: "/engagement",
      id: 4,
    },
    {
      name: "My mentions",
      icon: <AtSign className="h-4 w-4" />,
      url: "/mentions",
      id: 5,
    },
  ];

  const data3 = [
    {
      name: "Analytics",
      icon: <BarChart2 className="h-4 w-4" />,
      url: "/analytics",
      id: 6,
    },
    {
      name: "My mentions",
      icon: <AtSign className="h-4 w-4" />,
      url: "/mentions",
      id: 7,
    },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={cn(
        "sticky top-0 self-start pb-12 flex-shrink-0 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-60",
        className
      )}
    >
      {/* <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-2 translate-x-1/2 z-10 hidden md:flex"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button> */}
      <div className={cn("space-y-4 py-4", isCollapsed ? "px-2" : "px-3")}>
        <div className="flex items-center justify-between mb-2">
          <h2
            className={cn(
              "font-semibold tracking-tight",
              isCollapsed ? "hidden" : "text-lg px-4"
            )}
          >
            Logo
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="@johndoe"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex items-center">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="@johndoe"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    @johndoe
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  className={cn(
                    "w-full",
                    isCollapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <Menu className="h-4 w-4" />
                  {!isCollapsed && <span className="ml-2">Menu</span>}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Menu</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {["Discover", "Workspace", "Insights"].map((section, index) => (
          <div key={section} className={isCollapsed ? "" : "px-3"}>
            <h2
              className={cn(
                "mb-2 font-semibold tracking-tight",
                isCollapsed ? "sr-only" : "px-4 text-lg"
              )}
            >
              {section}
            </h2>
            <div className="space-y-1">
              {(index === 0 ? data1 : index === 1 ? data2 : data3).map(
                (item) => (
                  <Link
                    key={item.id}
                    to={item.url}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                    activeProps={{
                      className: "bg-gray-100",
                    }}
                  >
                    {item.icon}
                    {!isCollapsed && <span className="ml-2">{item.name}</span>}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
