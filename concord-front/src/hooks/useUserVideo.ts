import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiUserVideo from "../api/ApiUserVideo";


const apiUserVideo = new ApiUserVideo();

export const useUserVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiUserVideo.create,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["userVideo"],
            });
        },
    });
};