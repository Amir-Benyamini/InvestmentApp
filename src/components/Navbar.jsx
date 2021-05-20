import React from "react";
import { Link } from "react-router-dom";

export function NavComp() {
	return (
		<div>
			<Link to="/">main</Link>
			<Link to="/plan">plan</Link>
			<Link to="/monitor">monitor</Link>
		</div>

	)
} 