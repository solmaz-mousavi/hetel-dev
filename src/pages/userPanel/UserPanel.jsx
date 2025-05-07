import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserPanelSidebar from '../../components/userPanelsidebar/UserPanelSidebar';
import { Outlet } from 'react-router-dom';
import './userPanel.css';

export default function UserPanel( {setSelectedUser}) {
	const navigate = useNavigate();
	const localStorageData = JSON.parse(localStorage.getItem("user"));
	useEffect(()=> {
		const localStorageData = JSON.parse(localStorage.getItem("user"));
		if(!localStorageData) {
			navigate('/aseman-hotel/login');
		}
	}, [])
	
	return (
        <div className="user-panel-container">
        <aside className="user-panel__sidebar-container">
          <UserPanelSidebar setSelectedUser={setSelectedUser} userInfo={localStorageData} />
        </aside>
        <section className="user-panel__main-container">
          <Outlet />
        </section>
      </div>
	)
}
