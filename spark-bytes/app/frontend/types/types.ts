export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    area: string;
    tags: string[];
    image_url: string;
}
  
export interface EventResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Event[];
}
  