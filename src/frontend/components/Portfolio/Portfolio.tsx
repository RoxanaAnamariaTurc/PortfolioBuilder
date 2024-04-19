/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../UserContext";
import { Skills } from "../UserDashboard/UserDashboard";
import { useThemeContext } from "../ThemeContext";

interface Project {
  _id?: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<Skills>({
    techSkills: [],
    softSkills: [],
  });

  const { userId } = useParams<{ userId: string }>();
  const { style } = useThemeContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, projectsResponse, skillsResponse] =
          await Promise.all([
            axios.get(`http://localhost:3001/user/${userId}`),
            axios.get(`http://localhost:3001/projects/${userId}`),
            axios.get(`http://localhost:3001/user/${userId}/skills`),
          ]);
        console.log("User:", userResponse.data);
        setUser(userResponse.data.user);
        setProjects(projectsResponse.data);
        setSkills(skillsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div css={style.portfolio}>
      <h1 css={style.h1}>
        👋, I am {user.fullName}, <br /> The {user.jobTitle}, you are looking
        for.
      </h1>

      <div css={style.skillsContainer}>
        <div>
          <h4>Email: {user.email}</h4>
          <h4>Job title: {user.jobTitle}</h4>
        </div>
        <div css={style.skillDiv}>
          <h4>Technical Skills</h4>
          {skills.techSkills.map((skill) => (
            <span>{skill}</span>
          ))}
        </div>
        <div css={style.skillDiv}>
          <h4>Soft Skills</h4>
          {skills.softSkills.map((skill) => (
            <span>{skill}</span>
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
              src={`http://localhost:3001/${project.image}`}
              alt={project.name}
            />
            <div css={style.description}>
              <p css={style.p}>{project.description}</p>
            </div>
          </div>

          <a css={style.a} href={project.link}>
            View project
          </a>
        </div>
      ))}
      <footer css={style.footer}>Made with ❤️</footer>
    </div>
  );
};

export default Portfolio;
