import React, { useEffect, useState } from 'react'


import { InputGroup, Form, Button, Image, Row, Col, Stack } from 'react-bootstrap'

//--nút tìm kiếm trên đầu danh sách bạn

import AddIcon from "./../assets/images/add.png"
import SearchIcon from "./../assets/images/search.png"
import GroupIcon from "./../assets/images/group.png"
import avatarIcon from './../assets/images/profile.png'
import ModalAddFriend from './Modals/ModalAddFriend'
import ModalCreateGroup from './Modals/ModalCreateGroup'
import useFriends from '../hooks/useFriends'
import { isImageFileNameValid, userExistInList } from '../hooks/useCheck'


export default function Search() {
  const { searchResult, search, listFriends, listSends, sendRequest, getListFriends } = useFriends()
  const [isSearch, setSearch] = useState(false)
  const [searchinput, setInput] = useState("")

  useEffect(() => {
    //lấy danh sách bạn bè và lời mời đã gửi
    getListFriends(-1)
    getListFriends(2)
  }, [listFriends, listSends])

  const handleInputChange = (e) => {
    setSearch(true)
    setInput(e.target.value)
  }

  //modal add friend
  const [isOpenAddFriend, setOpenAddfriend] = useState(false);
  const toggleOpenAddfriend = () => setOpenAddfriend(!isOpenAddFriend)


  const [isOpenCreateGroup, setOpenCreateGroup] = useState(false);
  const toggleOpenGroupChat = () => setOpenCreateGroup(!isOpenCreateGroup)

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      search(searchinput)
    }
  }

  const handleSearch = (e) => {
    search(searchinput)
  }

  useEffect(()=>{
    if(isOpenAddFriend === false || isOpenCreateGroup ||false){
      search('')
    }
  }, [isOpenAddFriend, isOpenCreateGroup])
  return (
    <div className='w-100 bg-white px-2 pt-4' style={{  maxWidth: "280px", minWidth: "270px"}}>
      <Stack direction='horizontal' className='ms-auto'>

        <InputGroup className='w-100'>
          <InputGroup.Text className="p-0 bg-body-tertiary rounded-start border-0">
            <Button onClick={handleSearch} className='border-0 p-0 bg-transparent mx-2 '>
              <Image src={SearchIcon} width={14} className="p-0" />
            </Button>
          </InputGroup.Text>

          <Form.Control
            placeholder="Search mesasges"
            className='p-1 rounded-end bg-body-tertiary border-0'
            style={{ width: "140px", fontSize: "15px" }}
            onChange={handleInputChange}
            onKeyDown={handleEnter}
            value={searchinput}
            name="searchinput"
          />
          <Button onClick={toggleOpenAddfriend}  className='border-0 p-0 m-1 bg-white'>
            <Image src={AddIcon} width={20} className="p-0 mx-1" />
          </Button>

          <Button onClick={toggleOpenGroupChat}className='border-0 p-0 bg-white'>
            <Image src={GroupIcon} width={20} className="p-0" />
          </Button>
        </InputGroup>

        {isOpenAddFriend && <ModalAddFriend handleToggle={toggleOpenAddfriend} show={isOpenAddFriend} />}
        {isOpenCreateGroup && <ModalCreateGroup handleToggle={toggleOpenGroupChat} show={isOpenCreateGroup} />}
      </Stack>

      <div>
        <Form.Label className='fw-bolder mt-3'>
          {isSearch &&
            <>
              {searchResult !== null && searchinput !== ''?
                <>
                  <span>
                    You may know:
                  </span>
                </>
                :
                <span>
                  No result
                </span>
              }
            </>
          }
        </Form.Label>
        {
          searchResult ? 
          Object.entries(searchResult).length !== 0 &&
          <Stack direction='horizontal'>
            <Stack direction='horizontal' gap={3}>
            {
                  isImageFileNameValid(searchResult.avatar)
                  ?
                  <Image width={40} height={40} roundedCircle src={searchResult.avatar}/>
                  :
                  <Image width={40} height={40} roundedCircle src={avatarIcon}/>
                }
              <div>
                <h5>{searchResult.username}</h5>
              </div>
            </Stack>

            <div xs={1} className='px-0 align-self-center h6 ms-auto' >
              {userExistInList(searchResult.user_id, listFriends) ?
                <></>
                :
                <>
                  {
                    userExistInList(searchResult.user_id, listSends)
                      ?
                      <span>Requested send</span>
                      :
                      <Button onClick={() => sendRequest(searchResult.user_id)} style={{ backgroundColor: "white", marginLeft: "-15px" }} className='border-0'>
                        <Image src={AddIcon} style={{ width: '30px', height: '30px' }} />
                      </Button>
                  }
                </>
              }

            </div>
          </Stack>
          :
          null
        }

      </div>
    </div>



  )
}
