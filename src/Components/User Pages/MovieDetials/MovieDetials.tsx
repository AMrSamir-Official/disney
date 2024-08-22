// App.tsx
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./MovieDetials.css"; // You can apply styles here or inline

const App: React.FC = () => {
  return (
    <div className="App">
      <AppBar position="static" className="appBar">
        <Toolbar className="toolbar">
          <Typography variant="h6" className="logo">
            Disney+
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <nav className="nav">
            <Button color="inherit">Inicio</Button>
            <Button color="inherit">Series</Button>
            <Button color="inherit">Películas</Button>
            <Button color="inherit">Originales</Button>
          </nav>
          <Avatar
            alt="User"
            src="/path_to_your_avatar_image.jpg"
            sx={{ marginLeft: "16px" }}
          />
        </Toolbar>
      </AppBar>

      <div className="cover-section">
        <div className="cover-content">
          <img
            src="/mnt/data/6680bfa8-3055-458e-bdf6-ebf0cacbfe69-cover.png"
            alt="Cover"
            className="cover-image"
          />
          <div className="overlay-content">
            <Typography variant="h3" className="title">
              Luca
            </Typography>
            <Typography variant="body1" className="description">
              La película de Disney y Pixar “Luca” está ambientada en un pueblo
              de la costa italiana...
            </Typography>
            <div className="buttons">
              <Button
                variant="contained"
                color="primary"
                className="cta-button"
              >
                Ver Ahora
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                className="info-button"
              >
                Más Información
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
