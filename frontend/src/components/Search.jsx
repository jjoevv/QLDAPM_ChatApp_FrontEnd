import React, { useEffect, useState } from 'react'


import { InputGroup, Form, Button, Image, Row, Col, Stack } from 'react-bootstrap'

//--nút tìm kiếm trên đầu danh sách bạn

import AddIcon from "./../assets/images/add.png"
import SearchIcon from "./../assets/images/search.png"
import GroupIcon from "./../assets/images/group.png"

import ModalAddFriend from './Modals/ModalAddFriend'
import ModalCreateGroup from './Modals/ModalCreateGroup'
import useFriends from '../hooks/useFriends'
import { userExistInList } from '../hooks/useCheck'

export default function Search() {

  const { searchFriend, search, listFriends, listSends, sendRequest, getListFriends } = useFriends()
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
  return (
    <div className='w-100 bg-white p-2'>
      <Stack direction='horizontal' className='ms-auto'>

        <InputGroup className='w-100'>
          <InputGroup.Text className="p-0 bg-body-tertiary rounded-start border-0">
            <Button onClick={handleSearch} className='border-0 p-0 bg-transparent mx-2 '>
              <Image src={SearchIcon} width={15} className="p-0" />
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
          <Button onClick={toggleOpenAddfriend} style={{ backgroundColor: "white", }} className='border-0 p-0 m-1'>
            <Image src={AddIcon} width={22} className="p-0 mx-1" />
          </Button>

          <Button onClick={toggleOpenGroupChat} style={{ backgroundColor: "white", }} className='border-0 p-0'>
            <Image src={GroupIcon} width={22} className="p-0" />
          </Button>
        </InputGroup>

        {isOpenAddFriend && <ModalAddFriend handleToggle={toggleOpenAddfriend} show={isOpenAddFriend} />}
        {isOpenCreateGroup && <ModalCreateGroup handleToggle={toggleOpenGroupChat} show={isOpenCreateGroup} />}
      </Stack>

      <Row>
        <Form.Label className='fw-bolder mt-3'>
          {isSearch ?
            <>
              {searchFriend !== null && searchinput !== ''?
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
            :<></>
          }
        </Form.Label>
        {
          Object.entries(searchFriend).length !== 0 &&
          <Stack direction='horizontal'>
            <Stack direction='horizontal' gap={3}>
              <Image roundedCircle style={{ width: '40px', height: '40px' }} />
              <div>
                <h5>{searchFriend.username}</h5>
              </div>
            </Stack>

            <div xs={1} className='px-0 align-self-center h6 ms-auto' >
              {userExistInList(searchFriend.user_id, listFriends) ?
                <></>
                :
                <>
                  {
                    userExistInList(searchFriend.user_id, listSends)
                      ?
                      <span>Requested send</span>
                      :
                      <Button onClick={() => sendRequest(searchFriend.user_id)} style={{ backgroundColor: "white", marginLeft: "-15px" }} className='border-0'>
                        <Image src={AddIcon} style={{ width: '30px', height: '30px' }} />
                      </Button>
                  }
                </>
              }

            </div>
          </Stack>
        }

      </Row>
    </div>



  )
}
