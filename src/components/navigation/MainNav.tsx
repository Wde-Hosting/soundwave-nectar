import { Link } from "react-router-dom";
import { Home, Calendar, Music, Newspaper, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    description: "Quick access to live radio and trending shows"
  },
  {
    title: "Shows & Schedule",
    href: "/schedule",
    icon: Calendar,
    description: "Program guide with DJ bios and show descriptions"
  },
  {
    title: "Music & Playlists",
    href: "/music",
    icon: Music,
    description: "Curated playlists from past shows"
  },
  {
    title: "News & Interviews",
    href: "/news",
    icon: Newspaper,
    description: "Music industry updates and artist interviews"
  },
  {
    title: "Community",
    href: "/community",
    icon: Users,
    description: "Local business promotions and events"
  },
  {
    title: "Contact & Requests",
    href: "/contact",
    icon: MessageSquare,
    description: "Send song requests and messages to DJs"
  }
];

export function MainNav({ className }: { className?: string }) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="group relative flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
          <div className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all group-hover:w-full" />
        </Link>
      ))}
    </nav>
  );
}