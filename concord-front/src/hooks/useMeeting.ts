import { useQuery } from "@tanstack/react-query";
import ApiMeeting from "../api/ApiMeeting";


const apiMeeting = new ApiMeeting();

export const useMeeting = (room: string) => useQuery({
    queryKey: [room],
    queryFn: () => apiMeeting.getByRoom(room),
})
