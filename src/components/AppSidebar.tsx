import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Bike,
  Package,
  Search,
  Settings,
  Users,
  Home,
  TrendingUp,
  Filter
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Análises", url: "/analytics", icon: BarChart3 },
  { title: "Estoque", url: "/inventory", icon: Package },
  { title: "Motos", url: "/motorcycles", icon: Bike },
  { title: "Vendas", url: "/sales", icon: TrendingUp },
  { title: "Filtros", url: "/filters", icon: Filter },
];

const settingsItems = [
  { title: "Usuários", url: "/users", icon: Users },
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string) =>
    isActive(path)
      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <Bike className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-sidebar-foreground">MotoStock</h1>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <Bike className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wider mb-2">
            {!collapsed && "Navegação"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavCls(
                        item.url
                      )}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wider mb-2">
            {!collapsed && "Sistema"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavCls(
                        item.url
                      )}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Toggle Button - Bottom */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <SidebarTrigger className="w-full bg-sidebar-accent hover:bg-sidebar-primary text-sidebar-foreground hover:text-sidebar-primary-foreground rounded-lg p-2 transition-colors" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}