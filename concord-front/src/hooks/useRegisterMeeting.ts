import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiMeeting from "../api/ApiMeeting";

const apiMeeting = new ApiMeeting();

export const useRegisterMeeting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiMeeting.create,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["meeting"],
            });
        },
    });
};
