import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { getAccessToken } from "../Util/token";

import AdminLogin from "../Screens/Auth/Login";

import { Dashboard } from "../Screens/Dashboard";

import CategoryManagement from "../Screens/CategoryManagement";
import AddSoundCategory from "../Screens/CategoryManagement/AddSoundCategory";
import AddMeditationCategory from "../Screens/CategoryManagement/AddMeditationCategory";
import AddStoryCategory from "../Screens/CategoryManagement/AddStoryCategory";
import AddArticleCategory from "../Screens/CategoryManagement/AddArticleCategory";
import EditSoundCategory from "../Screens/CategoryManagement/EditSoundCategory";
import EditMeditationCategory from "../Screens/CategoryManagement/EditMeditationCategory";
import EditStoriesCategory from "../Screens/CategoryManagement/EditStoriesCategory";
import EditArticleCategory from "../Screens/CategoryManagement/EditArticleCategory";

import SoundManagement from "../Screens/SoundManagement";
import AddSound from "../Screens/SoundManagement/AddSound";
import SoundDetails from "../Screens/SoundManagement/SoundDetails";
import EditSound from "../Screens/SoundManagement/EditSound";

import MeditationManagement from "../Screens/MeditationManagement";
import AddMeditation from "../Screens/MeditationManagement/AddMeditation";
import MeditationDetails from "../Screens/MeditationManagement/MeditationDetails";
import EditMeditation from "../Screens/MeditationManagement/EditMeditation";

import StoryManagement from "../Screens/StoryManagement";
import AddStory from "../Screens/StoryManagement/AddStory";
import StoryDetails from "../Screens/StoryManagement/StoryDetails";
import EditStory from "../Screens/StoryManagement/EditStory";

import ArticleManagement from "../Screens/ArticleManagement";
import AddArticle from "../Screens/ArticleManagement/AddArticle";
import ArticleDetails from "../Screens/ArticleManagement/ArticleDetails";
import EditArticle from "../Screens/ArticleManagement/EditArticle";

// import Error from "../Screens/Error";

const AdminRouter = () => {
  const token = getAccessToken();
  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />

        <Route
          path="/login"
          element={
            <ProtectedRoutes>
              <AdminLogin />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />

        <Route
          path="/category-management"
          element={
            <PrivateRoutes>
              <CategoryManagement />
            </PrivateRoutes>
          }
        />

        <Route
          path="/category-management/add-sound-category"
          element={
            <PrivateRoutes>
              <AddSoundCategory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/category-management/add-meditation-category"
          element={
            <PrivateRoutes>
              <AddMeditationCategory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/category-management/add-story-category"
          element={
            <PrivateRoutes>
              <AddStoryCategory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/category-management/add-article-category"
          element={
            <PrivateRoutes>
              <AddArticleCategory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/category-management/edit-sound-category/:id"
          element={
            <PrivateRoutes>
              <EditSoundCategory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/category-management/edit-meditation-category/:id"
          element={
            <PrivateRoutes>
              <EditMeditationCategory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/category-management/edit-stories-category/:id"
          element={
            <PrivateRoutes>
              <EditStoriesCategory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/category-management/edit-article-category/:id"
          element={
            <PrivateRoutes>
              <EditArticleCategory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/sound-management"
          element={
            <PrivateRoutes>
              <SoundManagement />
            </PrivateRoutes>
          }
        />
        <Route
          path="/sound-management/add-sound"
          element={
            <PrivateRoutes>
              <AddSound />
            </PrivateRoutes>
          }
        />
        <Route
          path="/sound-management/sound-details/:id"
          element={
            <PrivateRoutes>
              <SoundDetails />
            </PrivateRoutes>
          }
        />
        <Route
          path="/sound-management/edit-sound/:id"
          element={
            <PrivateRoutes>
              <EditSound />
            </PrivateRoutes>
          }
        />

        <Route
          path="/meditation-management"
          element={
            <PrivateRoutes>
              <MeditationManagement />
            </PrivateRoutes>
          }
        />
        <Route
          path="/meditation-management/add-meditation"
          element={
            <PrivateRoutes>
              <AddMeditation />
            </PrivateRoutes>
          }
        />
        <Route
          path="/meditation-management/meditation-details/:id"
          element={
            <PrivateRoutes>
              <MeditationDetails />
            </PrivateRoutes>
          }
        />
        <Route
          path="/meditation-management/edit-meditation/:id"
          element={
            <PrivateRoutes>
              <EditMeditation />
            </PrivateRoutes>
          }
        />

        <Route
          path="/story-management"
          element={
            <PrivateRoutes>
              <StoryManagement />
            </PrivateRoutes>
          }
        />
        <Route
          path="/story-management/add-story"
          element={
            <PrivateRoutes>
              <AddStory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/story-management/story-details/:id"
          element={
            <PrivateRoutes>
              <StoryDetails />
            </PrivateRoutes>
          }
        />
        <Route
          path="/story-management/edit-story/:id"
          element={
            <PrivateRoutes>
              <EditStory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/article-management"
          element={
            <PrivateRoutes>
              <ArticleManagement />
            </PrivateRoutes>
          }
        />
        <Route
          path="/article-management/add-article"
          element={
            <PrivateRoutes>
              <AddArticle />
            </PrivateRoutes>
          }
        />
        <Route
          path="/article-management/article-details/:id"
          element={
            <PrivateRoutes>
              <ArticleDetails />
            </PrivateRoutes>
          }
        />
        <Route
          path="/article-management/edit-article/:id"
          element={
            <PrivateRoutes>
              <EditArticle />
            </PrivateRoutes>
          }
        />

        {/* <Route path="*" element={<Error />} />  */}
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRouter;
