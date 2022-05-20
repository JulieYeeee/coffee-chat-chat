import React from "react";
import { Link } from "react-router-dom";
import fb from "../static/picture/fb.png";
import linkedin from "../static/picture/linkedin.png";
import blog from "../static/picture/blog.png";

const Membership = () =>{
    return(
        <main className="membership-main">
            <div className="membership-box">
            
            <div className="navigation"><Link to="/memberlist">重返列表</Link></div>
            
            <div className="personal-data">
                <div className="personal-left">

                    <div className="headshot-box">
                        <img className="headshot"></img>
                    </div>

                    <div className="personal-basic-link">
                        <p className="personal-username">Jacky</p>
                        <p className="personal-title">title</p>
                        <div className="link-box">
                            <Link to="" className="link fb">
                                <img className="icon fb" src={fb}></img>
                            </Link>
                            <Link to="" className="link linkedin">
                                <img className="icon linkedin" src={linkedin}></img>
                            </Link>
                            <Link to="" className="link blog">
                                <img className="icon blog" src={blog}></img>
                            </Link>
                        </div>
                    </div>

                    <div className="intro-box">
                        <p className="intro-title">關於分享者</p>
                        <div className="intro-content-box">
                            <p className="intro">hello hello hello helloe</p>
                        </div>
                    </div>

                    <div className="tag-box">
                        <div className="tag"><p>keyword</p></div>
                        <div className="tag"><p>keyword</p></div>
                        <div className="tag"><p>keyword</p></div>
                    </div>

                    <div className="share-theme-box">
                        <p className="share-title">你可以問我：</p>
                        <div className="share-box">
                            <div className="share">
                                <span>1</span>
                                <p className="share-short-title">轉職PM建議</p>
                                <p className="share-content">擁有豐富的轉職經歷，在業務背景下轉殖PM，並且深耕科技產業，可與你分享該產業或PM的領域知識。</p>
                            </div>
                            <div className="share">
                                <span>1</span>
                                <p className="share-short-title">轉職PM建議</p>
                                <p className="share-content">擁有豐富的轉職經歷，在業務背景下轉殖PM，並且深耕科技產業，可與你分享該產業或PM的領域知識。</p>
                            </div>
                            <div className="share">
                                <span>1</span>
                                <p className="share-short-title">轉職PM建議</p>
                                <p className="share-content">擁有豐富的轉職經歷，在業務背景下轉殖PM，並且深耕科技產業，可與你分享該產業或PM的領域知識。</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="personal-right">
                    <form action="/ask">
                        <button type="submit">Ask me!立即提問</button>
                        <div className="ask-rule-box">
                        <p className="ask-rule-title">提問前請遵守：</p>
                        <p className="ask-rule">不得詢問個人隱私之問題，若因提問不當分享者有權婉轉回復。請盡量詢問分享者可分享領域，若因提問超出分享範圍，可能導致您收不到良好回復。</p>
                        </div>
                    </form>
                </div>
                <div className="personal-bottom">
                    <p className="know-more-title">了解更多</p>
                    <div className="project-box">
                        <div className="project">
                            <img></img>
                            <p className="project-type">文章</p>
                            <p className="project-content">五分鐘帶你了解PM職務做什麼。這是我進入科技PM一年時寫的文章。可以先閱讀了解大致樣貌。</p>
                            <Link to="">READ</Link>
                        </div>
                        <div className="project">
                            <img></img>
                            <p className="project-type">文章</p>
                            <p className="project-content">五分鐘帶你了解PM職務做什麼。這是我進入科技PM一年時寫的文章。可以先閱讀了解大致樣貌。</p>
                            <Link to="">READ</Link>
                        </div>
                        <div className="project">
                            <img></img>
                            <p className="project-type">文章</p>
                            <p className="project-content">五分鐘帶你了解PM職務做什麼。這是我進入科技PM一年時寫的文章。可以先閱讀了解大致樣貌。</p>
                            <Link to="">READ</Link>
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>



        </main>
    )
}

export default Membership;