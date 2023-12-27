import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import useChatroom from '../../hooks/useChatroom';
import { parse, getHours, getMinutes, compareAsc } from 'date-fns';
import { downloadFileFromUrl, getFilename, isImageFileNameValid, isSupportedFormat } from '../../hooks/useCheck';
import { Image } from 'react-bootstrap';
import ImageRenderer from '../../components/ImageRender';
import { baseURL } from '../../hooks/API';
import downloadIcon from '../../assets/images/download.png'
// dd/mm/yyyy, hh:mm:ss
function formatDateFromTimestamp(timestampString) {
  const dateObject = parse(timestampString, 'dd/MM/yyyy HH:mm:ss', new Date());

  // Get hours and minutes from the Date object
  const hours = getHours(dateObject);
  const minutes = getMinutes(dateObject);

  // Format hours and minutes
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;

}
const Messages = ({ socket }) => {
  const { user } = useAuth()
  const {room, listMessages, fetch_Messages_In_Room } = useChatroom()
  const [messagesecieved, setMessagesReceived] = useState([])

  const messagesColumnRef = useRef(null);

  useEffect(()=>{
    fetch_Messages_In_Room(room.room_id)
    setMessagesReceived(listMessages)
    return () => {
      setMessagesReceived([])
    }
  }, [room])
  

  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesecieved]);

  const sortedMessages = messagesecieved.sort((a, b) =>
    compareAsc(parse(a.timestamp, 'dd/MM/yyyy HH:mm:ss', new Date()), parse(b.timestamp, 'dd/MM/yyyy HH:mm:ss', new Date()))
  );


  // Runs whenever a socket event is recieved from the server
  useEffect(() => {

    socket.on('listen_message_text', (data) => {
      
     setMessagesReceived((state) => [
        ...state, data
      ]);
      //dispatch(fetchMessagesInChatRoom(data))
      fetch_Messages_In_Room(room.room_id)

    });
    // Remove event listener on component unmount
    return () => socket.off('listen_message_text');
  }, [ socket]);

  const handleDownload = (fileUrl) => {
    downloadFileFromUrl(fileUrl, getFilename(fileUrl))
  };

  return (
    <div className='messagesColumn border-end border-1 border-light-subtle pt-5' ref={messagesColumnRef}>
      {sortedMessages.map((msg, index) => {
        return msg.user.user_id !== user.user_id ?
          <>
            <div key={index} className=' d-flex flex-end  p-1 m-2 '>
              {
                !isImageFileNameValid(msg.content)
                  ?
                  <>
                    {
                      isSupportedFormat(`${baseURL}/${msg.content}`)
                        ?
                        <>
                          <button className='bg-primary-dark text-white' onClick={() => handleDownload(`${baseURL}/${msg.content}`)}>
                            {getFilename(msg.content)}
                            <Image src={downloadIcon} className='ms-2' width={14}/>
                          </button>
                        </>
                        :
                        <p style={{ padding: 10, backgroundColor: '#D3E0EA', borderRadius: 10, maxWidth: "60%" }} >
                          <strong style={{ fontSize: 13 }} >
                            {msg.content}
                          </strong> <br></br>
                          <span className='text-end ' style={{ fontSize: "13px" }}>{formatDateFromTimestamp(msg.timestamp)}</span>
                        </p>
                    }
                  </>
                  :
                  <ImageRenderer imageUrl={`${baseURL}/${msg.content}`} isSender={false}/>
              }
            </div>
          </>

          :
          
          <>
            <div key={index}
              className='mt-auto d-flex flex-end justify-content-end p-2 m-2'>
              {
                !isImageFileNameValid(msg.content)
                  ?
                  <>
                    {
                      isSupportedFormat(`${baseURL}/${msg.content}`)
                        ?
                        <>
                          <button className='bg-primary-dark text-white' onClick={() => handleDownload(`${baseURL}/${msg.content}`)}>
                            {getFilename(msg.content)}
                            <Image src={downloadIcon} className='ms-2' width={14}/>
                          </button>
                        </>
                        :
                        <div className='py-2 px-3 border-0 rounded-3 mw-75 text-light'
                          style={{ backgroundColor: "#1687A7" }} >
                          <span className=' fs-6 text-break' style={{ maxWidth: "100%" }}>
                            {msg.content}
                          </span> <br></br>
                          <span className='float-end' style={{ fontSize: "13px" }}>{formatDateFromTimestamp(msg.timestamp)}</span>
                        </div>
                    }
                  </>
                  :
                  <ImageRenderer imageUrl={`${baseURL}/${msg.content}`} isSender={true}/>
              }
            </div>

          </>

      })}
    </div>
  );
};

export default Messages;
