export type Config = {
    perPage?: number;
    page?: number;
    searchText?: string;
    total?: number;
    column?: string;
    direction?: 'asc' | 'desc';
    filter?: string;
};

export type CreateResult = {
    id: number;
    createAt: number;
};