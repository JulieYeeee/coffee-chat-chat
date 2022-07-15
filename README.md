# 咖啡圈圈 Coffee Chat Chat
![](https://raw.githubusercontent.com/JulieYeeee/coffee-chat-chat/main/static/picture/logo2.png)  
咖啡圈圈 Coffee Chat Chat 是一個個人經驗資訊交流平台。所有使用者在此平台都可以建立個人資訊頁面，並且開啟雙方資訊交流的聊天室。  
![](https://github.com/JulieYeeee/git-work/blob/main/coffee-rwd.png)  

****  
咖啡圈圈上線網站: https://coffee-chat-together.web.app/  
測試帳號: test@gmail.com  
測試密碼: testtest  
****  

## 主要功能與操作展示  
+ 個人頁面建立  
  + Enter 生成標籤  
  + 說明: 為自己建立獨特關鍵字，按下 Enter 即可生成，也可刪除指定關鍵字。  
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
  
+ 首頁滾動特效
  + 滑動頁面背景顏色改變
  ![](https://github.com/JulieYeeee/git-work/blob/main/homepage.gif)  
  
+ 會員登入/註冊功能  
  + 單頁切換登入/註冊介面  
  ![](https://github.com/JulieYeeee/git-work/blob/main/signin.gif)   
  

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

+ 作品數量新增刪減  
  + 將作品集資料以 array 的型態儲存於 state 。
  + 透過 filter()、map() 達成新增刪減。

+ 資料篩選處理
  + 為提升網站使用者的瀏覽體驗。在個人頁面及會員列表中，都有資料篩選機制。
  + 當個人資料僅分享區、作品集缺漏，個人展示頁內不會顯示那些為完整資料。
  + 當個人資料連最基礎資料區都缺漏，會員列表將不會顯示該會員帳戶。

+ 付費諮詢功能
  + 串接第三方金流套件 TapPay。
  + 在 Firebase Functions 建立付款 API。
  + API 將處理前端 request 附帶資料，並 POST fetch TapPay 後端。
  + 取得 response 、回傳前端。

+ 即時聊天功能、未讀數量更新
  + 使用 Firebase 實時監聽功能，監聽訊息變化。
  + 資料表結構會記錄每一則訊息的已讀情形、發訊角色。
  + 根據發訊角色套用對應的組件與 CSS 樣式。
  + 根據已讀情形更新未讀通知數量。

+ 首頁滾動特效
  + 使用 scrollY 與 innerHeight 偵測卷軸位置與整體頁面高度。
  + 當卷軸位置大於整頁高度 * 0.7 時，更新 styled-components props ，將背景改為黃色。


## 整體專案使用技術  
+ React
  + React Router: 建立 SPA 頁面、實現跳轉
  + React Context: 管理共用 state、props
  + React useState: 處理資料狀態
  + React useEffect: 透過 dependency 改變，觸發相關程式
  
+ CSS
  + styled-components
    + CreateGlobalStyle: 全局共通 CSS 設定
    + Theme: 建立網站共同主題色彩 
    + Adapting based on props
    
+ Firebase  
  +  Hosting: 部屬網站
  +  Authentication: 實現會員登入、註冊
  +  Database: 儲存會員資料、訊息、實時監聽訂單、訊息異動
  +  Functions: 建立 API ，向第三方金流服務取得回應

+ Babel : 編譯 JSX 
+ webpack : 模組打包 
+ TapPay : 金流串接 (測試版)

  
## 開發者資訊
葉怡君 Julie Ye  
Email : oopsyeh056@gmail.com  
Linkedin : www.linkedin.com/in/julieyeeee   
