import { Route, Routes } from "react-router-dom";
import MoviePlayer from "../Common Component/MoviePlayer/MoviePlayer";
import SidebarPage from "../Common Component/Sidebar/SidebarPage";
import HomePage from "../User Pages/HomePage/HomePage";

import MoviesPage from "../User Pages/HomePage/Movies/MoviesPage";
import LoginPage from "../User Pages/LoginPage/LoginPage";
import MovieDetails from "../User Pages/MovieDetials/MovieDetials";
import MoviesListMain from "../User Pages/MoviesList/MoviesListMain";
import SearchPage from "../User Pages/SearchPage/SearchPage";
import TVPageMain from "../User Pages/TVPage/TvPageMain";

const RoutesPageMain = () => {
  return (
    <>
      <SidebarPage>
        <Routes>
          <Route path="/onboarding" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/Tv" element={<TVPageMain />} />
          <Route path="/Movies" element={<MoviesPage />} />

          <Route path="/:path-MoviesList" element={<MoviesListMain />} />
          <Route path="/:path-MoviesPlayer" element={<MoviePlayer />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/MovieDetails" element={<MovieDetails />} />
        </Routes>
      </SidebarPage>
    </>
  );
};

export default RoutesPageMain;
