import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
	const [current, setCurrent] = useState(1);

	return (
		<Context.Provider value={{ current, setCurrent }}>
			{children}
		</Context.Provider>
	);
};
