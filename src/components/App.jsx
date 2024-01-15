import { Router, Route, Routes } from 'react-router-dom';
import AccountsPage from 'pages/AccountsPage/AccountsPage';
import ProfilesPage from 'pages/ProfilesPage/ProfilesPage';
import CampaignsPage from 'pages/CampaignsPage/CampaignsPage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AccountsPage />} />
        <Route path="/accounts/:accountId/profiles" element={<ProfilesPage />} />
        <Route path="/profiles/:profileId/campaigns" element={<CampaignsPage />} />
      </Routes>
   </> 
     

  );
}
export default App;
