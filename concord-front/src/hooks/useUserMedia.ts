import { useState, useEffect } from "react"



const useUserMedia = (requestedMedia: any) => {
    const [mediaStream, setMediaStream] = useState<MediaStream>()
  
    useEffect(() => {
      const enableStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(requestedMedia)
          setMediaStream(stream)
        } catch (err) {
          console.error(err)
        }
      }
  
      if (!mediaStream) {
        enableStream()
      } else {
        return () => {
          if (mediaStream) {
            mediaStream.getTracks().forEach(track => {
              track.stop()
            })
          }
        }
      }
    }, [mediaStream, requestedMedia])
  
    return mediaStream
  }

  export default useUserMedia