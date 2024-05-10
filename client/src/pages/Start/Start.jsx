import "../../css/style.css";
import { Outlet } from "react-router-dom";
import React from 'react';

export function Start() {
  return <Outlet />;
}

export default React.memo(Start);
