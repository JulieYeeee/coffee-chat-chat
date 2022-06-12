# 咖啡圈圈 Coffee Chat Chat
![](https://raw.githubusercontent.com/JulieYeeee/coffee-chat-chat/main/static/picture/logo2.png)  
咖啡圈圈 Coffee Chat Chat 是一個個人經驗資訊交流平台。所有使用者在此平台都可以建立個人資訊頁面，並且與他人開啟資訊交流的聊天室。  

****  
咖啡圈圈上線網站: https://coffee-chat-together.web.app/  
測試帳號: test@gmail.com  
測試密碼: testtest  
****  
## 主要功能  
+ 會員登入/註冊功能 
單頁切換登入/註冊介面

+ 個人頁面建立
上傳圖片、分享區拖曳功能


+ 會員資料瀏覽


+ 付款諮詢


+ 開通即時聊天室

+ 右上未讀訊息通知
****  
## 使用技術  
+ React
  + React Router : 建立 SPA 頁面
  + React useContext : 管理共用 state、ref、props
  + React useState、useRef : 兩者搭配處理資料、適時使用 useRef 避免過度渲染頁面
  + React useEffect : 透過 dependency 觸發相關程式
+ css
  + styled-components
    + CreateGlobalStyle : 全局共通 css 設定
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
