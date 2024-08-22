import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CardMedia,
  IconButton,
  InputAdornment,
  LinearProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Utils/firebase/firebaseConfig";
import {
  ADD_USER_NUMBER,
  DELETE_USER_NUMBER,
} from "../../Utils/redux/reducer/reducer";
import { LoginPageStyle } from "./LoginPage.Style";
import "./LoginPage.css";

interface IProps {
  classes?: any;
}

const AuthPage: FC<IProps> = (props: IProps) => {
  const [open, setOpen] = React.useState(false);
  const [profileModalOpen, setProfileModalOpen] = React.useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [currEmail, setCurrEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false); // Flag for sign-up mode
  const [showPassword, setShowPassword] = useState<boolean>(false); // Flag for password visibility
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const { watchLater } = useSelector((state: any) => state.moviesSlice);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleProfileModalOpen = () => setProfileModalOpen(true);
  const handleProfileModalClose = () => setProfileModalOpen(false);
  const { classes } = props;
  const dispatch = useDispatch();
  const storage = getStorage(); // Initialize Firebase Storage

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      if (isSignUp) {
        // Sign up logic
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Sign up successfully");
      } else {
        // Sign in logic
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Sign in successfully");
      }
      handleClose();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        if (newEmail) {
          await updateEmail(user, newEmail);
          toast.success("Email updated successfully");
          setCurrEmail(newEmail);
        }
        if (newPassword) {
          await updatePassword(user, newPassword);
          toast.success("Password updated successfully");
        }
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      handleProfileModalClose();
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrEmail(user.email || "");
        dispatch(ADD_USER_NUMBER(user.email || ""));
        setProfilePhoto(user.photoURL || "/default-profile.png");
      } else {
        setCurrEmail("");
        setProfilePhoto(null);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Sign out handler
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sign out successful!");
        dispatch(DELETE_USER_NUMBER(""));
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && auth.currentUser) {
      const userId = auth.currentUser.uid;
      const storageRef = ref(storage, `profilePhotos/${userId}`); // Create a reference for the file

      try {
        await uploadBytes(storageRef, file); // Upload the file
        const photoURL = await getDownloadURL(storageRef); // Get the download URL

        // Update Firebase profile photo
        await updateProfile(auth.currentUser, { photoURL });

        setProfilePhoto(photoURL); // Update profile photo state
      } catch (error) {
        console.error("Error uploading photo: ", error);
      }
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", margin: "0 auto" }}>
        {isLoading && <LinearProgress />}

        <Box className={classes.mainWrapper}>
          {currEmail === "" ? (
            <Box sx={{ position: "relative", top: "20rem" }}>
              <Typography className={classes.loginTitle}>
                {isSignUp ? "Sign Up for Disney" : "Sign In to Disney"}
              </Typography>
              <Typography className={classes.startWatching}>
                Start watching from where you left off, personalize for kids,
                and more
              </Typography>
              <Button onClick={handleOpen} className={classes.loginNowTitle}>
                {isSignUp ? "Sign Up Now" : "Sign In Now"}
              </Button>
              <Button
                onClick={() => setIsSignUp(!isSignUp)}
                className={classes.switchModeTitle}
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "New to Disney? Sign Up"}
              </Button>
            </Box>
          ) : (
            <Box className={classes.loggedBoxWrapper}>
              <Box className={classes.loggedTitleBox}>
                <Typography className={classes.loggedTitle}>
                  Subscribe to enjoy Disney
                </Typography>
                <Typography className={classes.loggedTitle}>
                  {currEmail}
                </Typography>
              </Box>
              <Box className={classes.loggedTitleBox2}>
                <Button className={classes.loginNowTitle}>Subscribe</Button>
                <Button className={classes.helpBtn} onClick={handleSignOut}>
                  Sign out
                </Button>
                <Button
                  variant="outlined"
                  className={classes.profileBtn}
                  onClick={handleProfileModalOpen}
                >
                  View Profile
                </Button>
              </Box>
            </Box>
          )}

          {/* Authentication Modal */}
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={classes.modalWrapper}>
              <Box className={classes.closeIconBox}>
                <Button onClick={handleClose}>
                  <CloseIcon className={classes.closeIcon} />
                </Button>
              </Box>
              <Typography className={classes.modalLoginTitle}>
                {isSignUp ? "Sign Up" : "Sign In"} to continue
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column" }}
                className={classes.modalInputBox}
              >
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    color: "white",
                    marginBottom: "10px",
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                  }}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                  sx={{
                    color: "white",
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "#007bff",
                    "&:hover": { backgroundColor: "#0056b3" },
                  }}
                  onClick={handleSignIn}
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
              </Box>
              <Typography className={classes.modalByProceeding}>
                By proceeding you confirm that you are above 18 years of age and
                agree to the Terms of Service and Privacy Policy
              </Typography>
            </Box>
          </Modal>

          {/* Profile Modal */}
          <Modal
            open={profileModalOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={classes.modalWrapper}>
              <Box className={classes.closeIconBox}>
                <Button onClick={handleProfileModalClose}>
                  <CloseIcon className={classes.closeIcon} />
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography className={classes.modalLoginTitle}>
                  Update Profile
                </Typography>
                {profilePhoto && (
                  <CardMedia
                    component="img"
                    image={profilePhoto}
                    sx={{
                      borderRadius: "50%",
                      width: 100,
                      height: 100,
                      marginBottom: 2,
                    }}
                  />
                )}
                <Button variant="contained" component="label">
                  Upload Profile Photo
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                <TextField
                  label="New Email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  sx={{
                    color: "white",
                    marginTop: "20px",
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                  }}
                />
                <TextField
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{
                    color: "white",
                    marginTop: "20px",
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "#007bff",
                    "&:hover": { backgroundColor: "#0056b3" },
                  }}
                  onClick={handleProfileUpdate}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
        <Toaster />
      </Box>
    </React.Fragment>
  );
};

export default withStyles(LoginPageStyle)(AuthPage);
