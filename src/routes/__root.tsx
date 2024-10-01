import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Layout from "../components/shared/Layout";
import ComingSoonView from "@/components/shared/ComingSoon";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent(props) {
    return <ComingSoonView />;
  },
});

function RootComponent() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
