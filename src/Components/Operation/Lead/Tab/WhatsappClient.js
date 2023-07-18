import { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, UncontrolledDropdown } from 'reactstrap';

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { dashboardChat } from '../../../../common/data';
import FeatherIcon from "feather-icons-react";


const WhatsappClient = () => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([...dashboardChat]);
    const [messageBox, setMessageBox] = useState(null);
    const [search_Menu, setsearch_Menu] = useState(false);

    const scrollToBottom = useCallback(() => {
        if (messageBox) {
            messageBox.scrollTop = messageBox.scrollHeight + 1000;
        }
    }, [messageBox]);

    useEffect(() => {
        if ((messages || []).length > 1) {
            scrollToBottom();
        }
    }, [messages, scrollToBottom]);


    const onSendMessage = () => {
        var modifiedMessages = [...messages];
        const lastItem = modifiedMessages.length
            ? modifiedMessages[modifiedMessages.length - 1]
            : { id: 1 };
        const today = new Date();
        const hour = today.getHours();
        const minute = today.getMinutes();
        const senderObj = {
            id: lastItem["id"] + 1,
            message: text,
            time: `${hour}.${minute}`,
            isLeft: false,
        };
        modifiedMessages.push({ ...senderObj });
        setMessages(modifiedMessages);
        setText("");
    };
    const toggleSearch = () => {
        setsearch_Menu(!search_Menu);
    };
    const searchMessages = () => {
        var searchInput, searchFilter, searchUL, searchLI, a, txtValue;
        searchInput = document.getElementById("searchMessage");
        searchFilter = searchInput.value.toUpperCase();
        searchUL = document.getElementById("users-conversation");
        searchLI = searchUL.getElementsByTagName("li");
        Array.prototype.forEach.call(searchLI, function (search) {
          a = search.getElementsByTagName("p")[0] ? search.getElementsByTagName("p")[0] : '';
          txtValue = a.textContent || a.innerText ? a.textContent || a.innerText : '';
          if (txtValue.toUpperCase().indexOf(searchFilter) > -1) {
            search.style.display = "";
          } else {
            search.style.display = "none";
          }
        });
      };

    return (
        <Row>
            <Col>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Conversación</h4>
                        <div className="flex-shrink-0">
                        <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item m-0">
                              <Dropdown
                                isOpen={search_Menu}
                                toggle={toggleSearch}
                              >
                                <DropdownToggle
                                  className="btn btn-ghost-secondary btn-icon"
                                  tag="button"
                                >
                                  <FeatherIcon
                                    icon="search"
                                    className="icon-sm"
                                  />
                                </DropdownToggle>
                                <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-lg">
                                  <div className="p-2">
                                    <div className="search-box">
                                      <Input
                                        onKeyUp={searchMessages}
                                        type="text"
                                        className="form-control bg-light border-light"
                                        placeholder="Buscar mensaje..."
                                        id="searchMessage"
                                      />
                                      <i className="ri-search-2-line search-icon"></i>
                                    </div>
                                  </div>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                          </ul>
                        </div>
                    </CardHeader>

                    <CardBody className="p-0">
                        <div id="users-chat" className='user-chat'>
                        <PerfectScrollbar className="chat-conversation p-3" id="chat-conversation"
                                style={{ marginBottom: "1rem", maxHeight: "400px" }}
                                containerRef={ref => setMessageBox(ref)}
                            >
                                <ul className="list-unstyled chat-conversation-list chat-sm" id="users-conversation">
                                    {(messages || []).map((item, key) => (
                                        <li className={item.isLeft ? "chat-list left" : "chat-list right"} key={key}>
                                            <div className="conversation-list">
                                                {item.img ? <div className="chat-avatar">
                                                    <img src={item.img} alt="" />
                                                </div> : null}
                                                <div className="user-chat-content">
                                                    <div className="ctext-wrap">
                                                        <>
                                                            <div className="ctext-wrap-content">
                                                                <p className="mb-0 ctext-content">{item.message}</p>
                                                            </div>
                                                            <UncontrolledDropdown className="align-self-start message-box-drop">
                                                                <DropdownToggle tag="a" role="button">
                                                                    <i className="ri-more-2-fill"></i>
                                                                </DropdownToggle>
                                                                <DropdownMenu>
                                                                    <DropdownItem><i className="ri-reply-line me-2 text-muted align-bottom"></i>Responder</DropdownItem>
                                                                    <DropdownItem><i className="ri-file-copy-line me-2 text-muted align-bottom"></i>Copiar</DropdownItem>
                                                                    <DropdownItem className="delete-item"><i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>Eliminar</DropdownItem>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </>
                                                    </div>
                                                    <div className="conversation-name">
                                                        <small className="text-muted time">{item.time}</small> 
                                                        <span className="text-success check-message-icon">
                                                            <i className="ri-check-double-line align-bottom"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>))}
                                </ul>
                            </PerfectScrollbar>
                        </div>
                        <div className="border-top border-top-dashed">
                            <div className="row g-2 mx-3 mt-2 mb-3">
                                <div className="col">
                                    <div className="position-relative">
                                        <input type="text" className="form-control border-light bg-light" placeholder="Enter Message..." 
                                        value={text} onChange={e => setText(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-info"  onClick={() => onSendMessage()}><span className="d-none d-sm-inline-block me-2">Enviar</span> <i className="mdi mdi-send float-end"></i></button>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default WhatsappClient