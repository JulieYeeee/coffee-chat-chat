import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import defaultmessage from "../../static/picture/defaultmessage.png";
import talk from "../../static/picture/talk.png";
import { GetGlobalContext } from "../component/context/GlobalContext";
import {
  InboxBox,
  InboxLeft,
  InboxLeftController,
  InboxLeftTitle,
  InboxLeftList,
  SingleMsg,
  DefaultMsg,
  SingleMsgP,
  ReceiveMsgBox,
  ReceiveMsg,
  ReceiveMsgBlank,
} from "../component/style/Inbox.styled";
import {
  InboxRight,
  InboxRightTitle,
  InboxRightContent,
  DefaultContent,
  SendMsgBox,
  SendMsg,
  SendMsgBlank,
  ReplyBox,
} from "../component/style/Inbox.styled";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "../../src/Firebase";
import {
  getDatabase,
  query,
  ref,
  onValue,
  child,
  get,
  push,
  set,
  update,
} from "firebase/database";

const Inbox = ({ DOMref }) => {
  //useContext取得共用state
  const { account, setAccount, askUnreadRef, replyUnreadRef } =
    GetGlobalContext();
  //確認使用者是否登入，否則導至豋入頁
  let navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAccount(user.uid);
      } else {
        navigate("/signin");
      }
    });
  }, []);
  //取得 URL parameter,以便後續抓取資料庫中對應"訊息"資料
  const { id } = useParams();
  let [msgContent, setMsgContent] = useState([]);
  let [msgRole, setMsgRole] = useState(null);
  let msgContentRef = useRef([]);

  useEffect(() => {
    if (id !== "default") {
      msgContentRef.current = [];
      const dbRef = ref(getDatabase(firebase));
      get(child(dbRef, `inbox/${id}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            if (data["askAccount"] === account) {
              setMsgRole("ask");
            } else {
              setMsgRole("consultant");
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, account]);
  //存放從資料庫取得的訊息內容
  let [msgList, setMsgList] = useState([]);
  const database = getDatabase(firebase);
  const inboxRef = query(ref(database, "inbox/"));
  let msgRef = useRef(); //儲存 state 前，先使用 Ref 保存避免過度渲染
  onValue(inboxRef, (snapshot) => {
    const data = snapshot.val();
    let keys = Object.keys(data);
    msgRef.current = [];
    keys.forEach((item) => {
      //如果使用者身分在該則訊息是"回答者"則執行以下訊息排列
      if (data[item]["consultantAccount"] === account) {
        if (data[item]["askUnread"] !== 0) {
          msgRef.current.push({
            content: data[item]["askName"] + " 向你發出提問!立即確認提問內容",
            msgId: item,
            read: false,
          });
        } else {
          msgRef.current.push({
            content: data[item]["askName"] + " 向你發出提問!立即確認提問內容",
            msgId: item,
            read: true,
          });
        }
        //如果使用者身分在該則訊息是"分享者"則執行以下訊息排列
      } else if (data[item]["askAccount"] === account) {
        if (data[item]["replyUnread"] !== 0) {
          msgRef.current.push({
            content: `你已向 ${data[item]["consultantName"]} 發出提問!請靜候回覆`,
            msgId: item,
            read: false,
          });
        } else {
          msgRef.current.push({
            content: `你已向 ${data[item]["consultantName"]} 發出提問!請靜候回覆`,
            msgId: item,
            read: true,
          });
        }
      }
    });
    if (msgRef.current !== [] && msgList.length !== msgRef.current.length) {
      setMsgList(msgRef.current);
    }
  });
  //取得正在回覆的訊息內容(input value)
  let preMsgRef = useRef();
  const getReplyContent = (e) => {
    preMsgRef.current = e.target.value;
  };
  //傳送訊息後，保存至資料庫
  const submitReply = (e) => {
    e.preventDefault();
    if (e.target.parentElement.children[0].value != "") {
      const msgListRef = ref(database, `inbox/${id}/message`);
      const newMsgRef = push(msgListRef);
      if (msgRole === "ask") {
        console.log("ask set");
        set(newMsgRef, {
          from: "ask",
          content: preMsgRef.current,
          time: Date.now(),
          read: false,
        })
          .then((data) => {
            console.log("show success:", data);
            // Data saved successfully!
          })
          .catch((error) => {
            console.log("show error:", error);
          });
      }
      if (msgRole === "consultant") {
        console.log("consult set");
        set(newMsgRef, {
          from: "reply",
          content: preMsgRef.current,
          time: Date.now(),
          read: false,
        })
          .then((data) => {
            console.log("show success:", data);
            // Data saved successfully!
          })
          .catch((error) => {
            console.log("show error:", error);
          });
      }
      preMsgRef.current = "";
      e.target.parentElement.children[0].value = "";
    }
  };
  //當最新訊息送出後，將訊息窗保持在最新訊息範圍
  useEffect(() => {
    if (DOMref.current != null) {
      DOMref.current.scrollTop = DOMref.current.scrollHeight;
    }
  }, [msgContent]);
  useEffect(() => {
    const singleMsgRef = query(ref(database, `inbox/${id}/message`));
    if (id === "default" || account === null || msgRole === null) {
      return;
    }
    onValue(singleMsgRef, (snapshot) => {
      const data = snapshot.val();
      let keys = Object.keys(data);
      msgContentRef.current = [];
      for (let x = 0; x < keys.length; x++) {
        let key = keys[x];
        msgContentRef.current.push(data[key]);
      }
      if (msgContent.length !== msgContentRef.current.length) {
        setMsgContent(msgContentRef.current);
      }
    });
  }, [id, msgRole, preMsgRef.current]);
  //當訊息被選取時，標記色彩
  let [msgSelectElement, setMsgSelectElement] = useState(null);
  useEffect(() => {
    if (msgSelectElement) {
      msgSelectElement.classList.add("msgSelect");
    }
  }, []);
  let [select, setSelect] = useState(null);
  const selectCss = (e) => {
    if (msgSelectElement != null) {
      msgSelectElement.classList.remove("msgSelect");
    }
    setMsgSelectElement(e.target);
    e.target.classList.add("msgSelect");
  };
  //當視窗大小在500px時，左側訊息列表收闔設定
  let [closeCheck, setCloseCheck] = useState(null);
  const showMsgList = () => {
    if (closeCheck === null) {
      setCloseCheck("open");
    } else {
      setCloseCheck(null);
    }
  };
  //當使用者點擊回覆區或點左方訊息列表展開始，更新訊息已讀、未讀狀態
  const readMsg = () => {
    const dbRef = ref(getDatabase(firebase));
    get(child(dbRef, `inbox/${id}/message`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let keys = Object.keys(snapshot.val());
          let allMsg = snapshot.val();
          //當帳號角色在此訊息中為提問者，將執行以下程式碼
          if (msgRole === "ask") {
            keys.forEach((key) => {
              if (
                allMsg[key]["from"] === "reply" &&
                allMsg[key]["read"] === false
              ) {
                replyUnreadRef.current = replyUnreadRef.current - 1;
                update(ref(database, `inbox/${id}/`), {
                  replyUnread: replyUnreadRef.current,
                });
                update(ref(database, `inbox/${id}/message/${key}`), {
                  read: true,
                });
              }
            });
          }
          //當帳號角色在此訊息中為回答者，將執行以下程式碼
          if (msgRole === "consultant") {
            keys.forEach((key) => {
              if (
                allMsg[key]["from"] === "ask" &&
                allMsg[key]["read"] === false
              ) {
                askUnreadRef.current = askUnreadRef.current - 1;
                update(ref(database, `inbox/${id}/`), {
                  askUnread: askUnreadRef.current,
                });
                update(ref(database, `inbox/${id}/message/${key}`), {
                  read: true,
                });
              }
            });
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main>
      <InboxBox>
        <InboxLeft closeCheck={closeCheck}>
          <InboxLeftController onClick={showMsgList} closeCheck={closeCheck}>
            〉
          </InboxLeftController>
          <InboxLeftTitle>訊息列表</InboxLeftTitle>
          <InboxLeftList>
            {msgList.length !== 0 &&
              msgList.map((msg) => {
                return (
                  <SingleMsg to={`/inbox/${msg["msgId"]}`} onClick={readMsg}>
                    <SingleMsgP onClick={selectCss} select={select}>
                      {msg["content"]}
                    </SingleMsgP>
                  </SingleMsg>
                );
              })}
            {msgList.length === 0 && (
              <DefaultMsg className="msgList-default">
                <img src={talk}></img>
                <p>還沒有訊息，開始發問聊天吧!</p>
              </DefaultMsg>
            )}
          </InboxLeftList>
        </InboxLeft>

        <InboxRight>
          <InboxRightTitle>訊息內容</InboxRightTitle>
          <InboxRightContent ref={DOMref}>
            {id === "default" && (
              <DefaultContent>
                <img src={defaultmessage}></img>
                <p>點擊左方訊息查看內容</p>
              </DefaultContent>
            )}
            {msgContent
              ? msgContent.map((msg) => {
                  if (msgRole === "consultant" && msg["from"] === "ask") {
                    return (
                      <ReceiveMsgBox>
                        <ReceiveMsg>{msg["content"]}</ReceiveMsg>
                        <ReceiveMsgBlank></ReceiveMsgBlank>
                      </ReceiveMsgBox>
                    );
                  } else if (
                    msgRole === "consultant" &&
                    msg["from"] === "reply"
                  ) {
                    return (
                      <SendMsgBox>
                        <SendMsgBlank></SendMsgBlank>
                        <SendMsg>{msg["content"]}</SendMsg>
                      </SendMsgBox>
                    );
                  }

                  if (msgRole === "ask" && msg["from"] === "ask") {
                    return (
                      <SendMsgBox>
                        <SendMsgBlank></SendMsgBlank>
                        <SendMsg>{msg["content"]}</SendMsg>
                      </SendMsgBox>
                    );
                  } else if (msgRole === "ask" && msg["from"] === "reply") {
                    return (
                      <ReceiveMsgBox>
                        <ReceiveMsg>{msg["content"]}</ReceiveMsg>
                        <ReceiveMsgBlank></ReceiveMsgBlank>
                      </ReceiveMsgBox>
                    );
                  }
                })
              : undefined}
          </InboxRightContent>
          <ReplyBox>
            <textarea
              placeholder="輸入訊息"
              rows="1"
              onChange={getReplyContent}
              onClick={readMsg}
            ></textarea>
            <button type="submit" onClick={submitReply}>
              傳送
            </button>
          </ReplyBox>
        </InboxRight>
      </InboxBox>
    </main>
  );
};

export default Inbox;
