export default [
    {
        name: "Home",
        route: "/",
    },
    {
        name: "About",
        route: "/",
    },
    {
        name: "Works",
        route: "/",
    },
    {
        name: "Contact",
        route: "/",
    },
    // {
    //     name: "Affliate Program",
    //     route: "/",
    // },
] as Array<Route>;

interface Route {
    name: string;
    element: React.ReactNode;
    route: string;
    banner: React.ReactNode
    id: string;
}
