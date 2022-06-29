# 咖啡圈圈 Coffee Chat Chat
![](https://raw.githubusercontent.com/JulieYeeee/coffee-chat-chat/main/static/picture/logo2.png)  
咖啡圈圈 Coffee Chat Chat 是一個個人經驗資訊交流平台。所有使用者在此平台都可以建立個人資訊頁面，並且與他人開啟資訊交流的聊天室。  
![](https://github.com/JulieYeeee/git-work/blob/main/coffee-rwd.png)  

****  
咖啡圈圈上線網站: https://coffee-chat-together.web.app/  
測試帳號: test@gmail.com  
測試密碼: testtest  
****  

## 主要功能與操作展示  
+ 個人頁面建立  
  + Enter 生成標籤  
  + 說明: 為自己建立幾個獨特關鍵字，按下 Enter 即可生成，也可刪除指定關鍵字。  
  ![](https://github.com/JulieYeeee/git-work/blob/main/keyword.gif) 
  
  + 拖曳改變資料順序 
  + 說明: 透過拖曳可以改變資料順序，再也不必刪除內文重新手打。  
  ![](https://github.com/JulieYeeee/git-work/blob/main/drag.gif) 
  
  + 新增/刪減作品數量  
  + 說明: 初始預設為 3 個編輯欄位。若想分享更多作品，可以即時新增、編輯，亦可以刪減。若新增數量後忘記填寫資料也沒關係，咖啡圈圈會為您把關資料，若有不完整的資料將不會顯示在個人頁面上。 
  ![](https://github.com/JulieYeeee/git-work/blob/main/addpj.gif)  
  
  + 上傳圖片即時預覽 
  + 說明: 從本地資料夾選取圖片後，將會立即顯示於編輯介面中，即時預覽照片樣貌。  
  ![](https://github.com/JulieYeeee/git-work/blob/main/upload.gif)  
  
  +立即產出個人網址
  

+ 會員資料瀏覽與付費諮詢  
  + 會員資料瀏覽
  + 說明: 在會員列表中可以找到感興趣的人選並瀏覽詳細個人資料
  ![](https://github.com/JulieYeeee/git-work/blob/main/search.gif) 

  + 付費諮詢
  + 說明: 只要付費一杯咖啡的價格，即可向對象提問，並且開通雙方的聊天室。 
  ![](https://github.com/JulieYeeee/git-work/blob/main/ask.gif)  


+ 即時聊天室與未讀通知
  + 即時聊天
  + 說明: 付款成功後系統會開啟雙方的聊天室。可以即時聊天諮詢。
  ![](https://github.com/JulieYeeee/git-work/blob/main/chatroom.gif)  
  
  + 未讀訊息通知
  + 說明: 當有新訊息未讀取時，頁面右上角將會顯示未讀數量。進入聊天室點擊回覆欄位時，將更新未讀數量。
  ![](https://github.com/JulieYeeee/git-work/blob/main/notification.gif) 
  

+ 會員登入/註冊功能  
  + 單頁切換登入/註冊介面  
  ![](https://github.com/JulieYeeee/git-work/blob/main/signin.gif)   
  

****  
## 組件架構
![](https://github.com/JulieYeeee/git-work/blob/main/1655057317355.jpg)   
+ Nav為共用組件

****  
## 關於主要功能的技術實踐
+ Enter 生成標籤
  + 使用 onKeyPress 監聽 Enter 動作。
  + 當 Enter 一觸發，即更新 state 資料，重新渲染標籤區組件。
  
+ 拖曳改變資料順序
  + 使用 HTML Drag and Drop API 實現，無使用套件。
  + 以游標位置與拖曳區物件寬度相減，尋找執行交換資料的規律條件，符合條件的情形下將進行交換資料。
  + 透過 clientX 取得拖曳時的游標 X 值，再以 getBoundingClientX() 取的物件 left 與 width值。
  + 當游標滑過第一及第二個物件時，會符合 X 值減去物件 left 與 width 小於零，此時執行 state 資料順序交換。
  + 當游標滑到第三個物件時，會符合 X 值減去物件 left 與 width 大於零，此時執行 state 刪除拖曳原位置資料，並新增到 state 最後位置。
  + 
## 專案使用技術  
+ React
  + React Router : 建立 SPA 頁面、實現跳轉
  + React useContext : 管理共用 state、ref
  + React useState、useRef : 兩者搭配處理資料、適時使用 useRef 避免過度渲染頁面
  + React useEffect : 透過 dependency 觸發相關程式
+ css
  + styled-components
    + CreateGlobalStyle : 全局共通 CSS 設定
    + Theme : 建立網站共同主題色彩 
    + Adapting based on props
+ Firebase  
  +  Hosting : 部屬網站
  +  Authentication : 實現會員登入、註冊
  +  Database : 儲存會員資料、訊息、實時監聽訂單、訊息異動
+ BABEL : 編譯器
+ Webpack : 模組打包 
+ Tappay : 金流串接 (測試版)

****  
## Contact Info
葉怡君 Julie Ye  
Email : oopsyeh056@gmail.com  
Linkedin : www.linkedin.com/in/julieyeeee   
