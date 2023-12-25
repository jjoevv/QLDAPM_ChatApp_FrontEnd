import React, { useState} from 'react'

export  function ChatBoxReciever({content, timestamp}) {
  return (
    <div  className='mt-auto d-flex flex-end justify-content-start p-2 m-2'>
    
    <p style={{padding:10 , backgroundColor:'#D3E0EA', borderRadius: 10 , maxWidth: "60%" }} >
        <strong style={{fontSize:13}} >
               {content} 
        </strong> <br></br>
    </p>

</div>
  )
}


export function ChatBoxSender({content, timestamp}) {
  return (
    <div  style={{}} 
      className='mt-auto d-flex flex-end justify-content-end p-2 m-2'>
            
            <p style={{padding:10 ,backgroundColor: "#1687A7", borderRadius: 10 , maxWidth: "60%" }} >
                <strong style={{fontSize:13}} >
                       {content} 
                </strong> <br></br>
            </p>

    </div>
  )
}

export const ChatBox = ({content, timestamp}) =>{
    return (
        <div className={styles.message} key={i}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className={styles.msgMeta}>{msg.username}</span>
          <span className={styles.msgMeta}>
            {formatDateFromTimestamp(msg.__createdtime__)}
          </span>
        </div>
        <p className={styles.msgText}>{msg.message}</p>
        <br />
      </div>
    )
  }
export default (ChatBoxReciever, ChatBoxSender, ChatBox)