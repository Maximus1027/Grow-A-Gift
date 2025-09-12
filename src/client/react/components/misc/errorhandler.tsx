import React from "@rbxts/react";
import { ErrorBoundary } from "./errorboundary";

export function ErrorHandler({ children }: React.PropsWithChildren) {
	return (
		<ErrorBoundary
			fallback={(message) => {
				return <frame></frame>;
			}}
		>
			{children}
		</ErrorBoundary>
	);
}
