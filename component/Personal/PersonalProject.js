import React from "react";
import coverdefault from "../../static/picture/coverdefault.png";
import {
  SingleProject,
  LayoutBox,
  ProjectCover,
  ReaclCover,
  DefaultCover,
  ProjectContent,
  ProjectLink,
  DeleteProjectButton,
} from "../style/Account.styled";

const PersonalProject = ({
  project,
  projects,
  index,
  getFile,
  setProjects,
}) => {
  //取得使用者選擇的作品類型
  const getSelectValue = (e) => {
    setProjects((prev) => {
      prev[index]["type"] = e.target.value;
      return [...prev];
    });
  };
  //取得使用者輸入的作品集或文章連結
  const getLink = (e) => {
    setProjects((prev) => {
      prev[index]["link"] = e.target.value;
      return [...prev];
    });
  };
  //取得使用者輸入的作品或文章的說明
  const getContent = (e) => {
    setProjects((prev) => {
      prev[index]["content"] = e.target.value;
      return [...prev];
    });
  };
  //移除指定 Project
  const deleteProject = () => {
    let newProjectsArr = projects.filter(
      (singleProject) => singleProject != projects[index]
    );
    setProjects(newProjectsArr);
  };

  return (
    <SingleProject>
      <DeleteProjectButton>
        <div onClick={deleteProject}>X</div>
      </DeleteProjectButton>
      <LayoutBox>
        <ProjectCover>
          <div>
            {project["cover"] && <ReaclCover src={project["cover"]} />}
            {!project["cover"] && <DefaultCover src={coverdefault} />}
          </div>
          <label>
            <p>+</p>
            <input type="file" onChange={getFile(index)} id="project-image" />
          </label>
        </ProjectCover>
        <ProjectContent>
          <select
            value={project["type"] ? project["type"] : ""}
            onChange={getSelectValue}
          >
            <option>請選擇</option>
            <option>文章</option>
            <option>作品</option>
          </select>
          <textarea
            placeholder="連結說明"
            value={project["content"] ? project["content"] : ""}
            onChange={getContent}
          ></textarea>
        </ProjectContent>
      </LayoutBox>
      <ProjectLink
        type="text"
        value={project["link"] ? project["link"] : ""}
        placeholder="在此貼上作品/文章連結"
        onChange={getLink}
      ></ProjectLink>
    </SingleProject>
  );
};

export default PersonalProject;
