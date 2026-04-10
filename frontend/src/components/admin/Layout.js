import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
export default function Layout() {
  return (
    <div style={{display:'flex'}}>
      <Sidebar />
      <div style={{marginLeft:'var(--sidebar-w)',flex:1,minHeight:'100vh',display:'flex',flexDirection:'column'}}>
        <Outlet />
      </div>
    </div>
  );
}
