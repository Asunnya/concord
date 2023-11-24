import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiMeeting from "../api/ApiMeeting";


const apiMeeting = new ApiMeeting();

export const useUpdateMeeting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiMeeting.update,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["meeting"],
            });
        },
    });
};
