/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../UserContext";
import { Skills } from "../UserDashboard/UserDashboard";
import { useThemeContext } from "../ThemeContext";
import LoadingBars from "../LoadingBars/LoadingBars";
import projectImage from "../../../images/projectImage.jpg";

interface Project {
  _id?: string;
  name: string;
  description: string;
  image: string;
  link?: string;
}

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<Skills>({
    techSkills: [],
    softSkills: [],
  });
  const [loading, setLoading] = useState(true);

  const { token } = useParams<{ token: string }>();
  const { style } = useThemeContext();

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/portfolio/${token}`);

      const { user } = response.data;

      setUser(user);
      setProjects(user.projects);
      setSkills(user.skills);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    const bars = [
      { width: "300px", delay: "0s" },
      { width: "200px", delay: "0.2s" },
      { width: "300px", delay: "0.4s" },
    ];
    return <LoadingBars bars={bars} />;
  }

  return (
    <div css={style.portfolio}>
      <h1 data-testid="username" css={style.h1}>
        {user && (
          <>
            👋, I am {user.fullName}, <br /> The {user.jobTitle}, you are
            looking for.
          </>
        )}
      </h1>

      <div css={style.skillsContainer}>
        {user && (
          <div>
            <h4>Email: {user.email}</h4>
            <h4>Job title: {user.jobTitle}</h4>
          </div>
        )}
        <div css={style.skillDiv}>
          <h4>Technical Skills</h4>
          {skills?.techSkills?.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
        <div css={style.skillDiv}>
          <h4>Soft Skills</h4>
          {skills?.softSkills?.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
      </div>
      <h2 css={style.h1}>Projects</h2>
      {projects.map((project) => (
        <div key={project._id} css={style.div}>
          <h3 css={style.title}>{project.name}</h3>

          <div css={style.container}>
            <img
              css={style.img}
              src={
                project.image
                  ? `${API_BASE_URL}/${project.image}`
                  : projectImage
              }
              alt="project"
            />
            <div css={style.description}>
              <p css={style.p}>{project.description}</p>
            </div>
          </div>
          {project.link && (
            <a css={style.a} href={project.link}>
              View project
            </a>
          )}
        </div>
      ))}
      <footer css={style.footer}>Made with ❤️</footer>
    </div>
  );
};

export default Portfolio;
