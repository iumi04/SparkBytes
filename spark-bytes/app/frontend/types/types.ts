export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    area: string;
    tags: string[];
    image_url: string;
    created_by: string;
    signed_up_by: string[];
}
  
export interface EventResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Event[];
}
  