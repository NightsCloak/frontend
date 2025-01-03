const baseUrl = `${import.meta.env.VITE_SCHEMA}://${import.meta.env.VITE_URI}${
    import.meta.env.VITE_PORT ? `:${import.meta.env.VITE_PORT}` : ''
}`;

const menus = {
    guest: [
        { path: 'contact', label: 'Contact' },
        { path: 'register', label: 'Register' },
        { path: 'login', label: 'Login' },
    ],
    user: [
        { path: '', label: 'Explore' },
        { path: 'collection', label: 'Collection' },
        { path: '', label: 'Explore' },
    ],
    developer: [],
    admin: [
        {
            path: `${baseUrl}/mission/telescope`,
            label: 'TELESCOPE',
            location: '_blank',
        },
    ],
    account: [],
};

export default menus;
