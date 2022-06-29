# 咖啡圈圈 Coffee Chat Chat
![](https://raw.githubusercontent.com/JulieYeeee/coffee-chat-chat/main/static/picture/logo2.png)  
咖啡圈圈 Coffee Chat Chat 是一個個人經驗資訊交流平台。所有使用者在此平台都可以建立個人資訊頁面，並且與他人開啟資訊交流的聊天室。  
![](https://github.com/JulieYeeee/git-work/blob/main/coffee-rwd.png)  

****  
咖啡圈圈上線網站: https://coffee-chat-together.web.app/  
測試帳號: test@gmail.com  
測試密碼: testtest  
****  
## 主要功能  
+ 會員登入/註冊功能  
單頁切換登入/註冊介面  
![](https://github.com/JulieYeeee/git-work/blob/main/%E7%99%BB%E5%85%A5.gif)   


+ 個人頁面建立  
上傳圖片、Enter生成標籤、分享區拖曳功能  
  + 上傳圖片、即時預覽  
  ![](https://github.com/JulieYeeee/git-work/blob/main/1655058502484.jpg)  
  + Enter 生成標籤  
  ![](https://github.com/JulieYeeee/git-work/blob/main/%E6%A8%99%E7%B1%A4.gif)  
  + 分享區拖曳改變資料順序  
  ![](https://github.com/JulieYeeee/git-work/blob/main/%E6%8B%96%E6%9B%B3.gif)  



+ 會員資料瀏覽  
  + ![](https://github.com/JulieYeeee/git-work/blob/main/%E7%80%8F%E8%A6%BD%E6%9C%83%E5%93%A1.gif) 



+ 付款諮詢  
  + ![](https://github.com/JulieYeeee/git-work/blob/main/%E6%8F%90%E5%95%8F.gif) 


+ 開通即時聊天室
  + ![](https://github.com/JulieYeeee/git-work/blob/main/%E5%9B%9E%E8%A6%86.gif) 


+ 右上未讀訊息通知
****  
## 組件架構
![](https://github.com/JulieYeeee/git-work/blob/main/1655057317355.jpg)   
+ Nav為共用組件

****  
## 使用技術  
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
