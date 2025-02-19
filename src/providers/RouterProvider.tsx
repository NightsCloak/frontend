import { FC } from 'react';
import { createBrowserRouter, Outlet, RouterProvider as ReactRouterProvider } from 'react-router-dom';

const routes = (routeConfig: RouteObject[]): RouteObject[] => [
    {
        element: <Outlet />,
        children: [...routeConfig],
    },
];

const router = (routeConfig: RouteObject[]) => createBrowserRouter(routes(routeConfig));

const RouterProvider: FC<BaseProps> = ({ routeConfig }) => {
    return (
        <>
            <ReactRouterProvider router={router(routeConfig)} />
        </>
    );
};

export default RouterProvider;
