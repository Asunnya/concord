import { useState } from "react";
import UserVideo from "../models/UserVideo";
import Meeting from "../models/Meeting";
import WaitingRoom from "./WaitingRoom";
import MeetingHandle from "./MeetingHandle";

const ConcordPage = () => {
    const [meetingStart, setMeetingStart] = useState(false);
    const [userEntity, setUserEntity] = useState<UserVideo>();
    const [meetingEntity, setMeetingEntity] = useState<Meeting>();

    async function handleStartMeeting(user: UserVideo, meeting: Meeting) {
        console.log(user.username + meeting.room_code);
    
        setUserEntity(user);
        setMeetingEntity(meeting);
        setMeetingStart(true);
    }
    
    async function handleEndMeeting() {
        setMeetingStart(false);
    }

    return (
        <>
            {meetingStart ? (
                <MeetingHandle
                    user={userEntity!}
                    meeting={meetingEntity!}
                    handleEndMeeting={handleEndMeeting}
                />
            ) : (
                <WaitingRoom handleStartMeeting={handleStartMeeting} />
            )}
        </>
    );
};


export default ConcordPage;
