/** @jsxImportSource @emotion/react */
import { useState, useContext, useEffect } from "react";
import { UserContext, UserContextProps } from "../../../UserContext";
import Button from "../Button/Button";
import { editUserDetails } from "../../../api";
import { getModalStyles } from "./Modal.style";
import { useTheme } from "../../../hooks/useTheme";
import LoadingBars from "../LoadingBars/LoadingBars";

const EditUserDetails: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const { user, setUser } = useContext(UserContext) as UserContextProps;

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || "");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const style = getModalStyles(theme);

  useEffect(() => {
    if (user) {
      setFullName(user?.fullName || "");
      setEmail(user?.email || "");
      setJobTitle(user?.jobTitle || "");
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (user) {
        const formData = {
          fullName,
          email,
          jobTitle,
        };

        const portfolioToken = localStorage.getItem("portfolioToken") || "";
        const userId = localStorage.getItem("userId") || "";
        await editUserDetails(portfolioToken, formData, userId);

        setUser({
          ...user,
          fullName,
          email,
          jobTitle,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error editing user details", error);
      setLoading(false);
    }
    closeModal();
  };

  const handleCancel = () => {
    setFullName(user?.fullName || "");
    setEmail(user?.email || "");
    setJobTitle(user?.jobTitle || "");
    closeModal();
  };

  const bars = [
    { width: "300px", delay: "0s" },
    { width: "200px", delay: "0.2s" },
    { width: "300px", delay: "0.4s" },
  ];

  return (
    <div css={style.div}>
      {loading ? (
        <LoadingBars bars={bars} />
      ) : (
        <>
          <span css={style.closeButton} onClick={closeModal}>
            &times;
          </span>
          <h2 css={style.h2}>Edit User Details</h2>
          <form onSubmit={handleSave} css={style.form}>
            <div css={style.inputGroup}>
              <label css={style.label} htmlFor="name">
                Name
              </label>
              <input
                css={style.input}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                id="name"
                name="name"
              />
            </div>
            <div css={style.inputGroup}>
              <label css={style.label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                css={style.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div css={style.inputGroup}>
              <label htmlFor="jobTitle" css={style.label}>
                Job Title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                css={style.input}
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                disabled={loading}
              />
            </div>
            <div css={style.buttonContainer}>
              <Button
                type="submit"
                disabled={loading}
                color="primary"
                backgroundColor={"transparent"}
                borderRadius={"xsmall"}
                width={"large"}
                height={"medium"}
                padding={"xsmall"}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                color="primary"
                backgroundColor={"transparent"}
                borderRadius={"xsmall"}
                width={"large"}
                height={"medium"}
                padding={"xsmall"}
              >
                Cancel
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditUserDetails;
