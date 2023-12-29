export const meta = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<h1>Hello World</h1>
			<a href="/user-db">User List (DB)</a>
			<a href="/user-static">User List (Static)</a>
		</div>
	);
}
