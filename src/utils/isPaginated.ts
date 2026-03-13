// Type guard function for your Pagination type
function isPaginated<T>(obj: T): obj is T & Pagination {
    if (obj === null || typeof obj !== 'object') return false;

    // Check links property
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!('links' in obj) || typeof (obj as any).links !== 'object' || (obj as any).links === null) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const links = (obj as any).links;
    if (
        typeof links.first !== 'string' ||
        typeof links.last !== 'string' ||
        (links.prev !== null && typeof links.prev !== 'string') ||
        (links.next !== null && typeof links.next !== 'string')
    ) {
        return false;
    }

    // Check meta property
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!('meta' in obj) || typeof (obj as any).meta !== 'object' || (obj as any).meta === null) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meta = (obj as any).meta;
    if (
        typeof meta.current_page !== 'number' ||
        typeof meta.from !== 'number' ||
        typeof meta.last_page !== 'number' ||
        !Array.isArray(meta.links) ||
        typeof meta.path !== 'string' ||
        typeof meta.per_page !== 'number' ||
        typeof meta.to !== 'number' ||
        typeof meta.total !== 'number'
    ) {
        return false;
    }

    // Check meta.links array items
    for (const link of meta.links) {
        if (
            (link.url !== null && typeof link.url !== 'string') ||
            typeof link.label !== 'string' ||
            typeof link.active !== 'boolean'
        ) {
            return false;
        }
    }

    return true;
}

export default isPaginated;
