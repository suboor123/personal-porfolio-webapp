export type SearchFilters = 'project' | 'blog' | 'session';

export interface SearchItem {
    id: string;
    name: string;
    description: string;
    type: SearchFilters;
    imageUrl: string;
    views: number
}