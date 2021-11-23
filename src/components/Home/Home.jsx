import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
export const Home = inject("auth")(observer((props) => {


	return (
		<div>
			<h1>Home</h1>
		</div>
	)

	}))