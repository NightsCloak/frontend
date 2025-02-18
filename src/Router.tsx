import { FC } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

const routes = (routeConfig: RouteObject[]): RouteObject[] => [
    {
        element: <Outlet />,
        children: [...routeConfig],
    },
];

const router = (routeConfig: RouteObject[]) => createBrowserRouter(routes(routeConfig));

const Router: FC<BaseProps> = ({ routeConfig }) => {
    return (
        <>
            <RouterProvider router={router(routeConfig)} />
        </>
    );
};

export default Router;
