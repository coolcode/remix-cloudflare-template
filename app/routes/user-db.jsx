import { useLoaderData } from "@remix-run/react";

export async function loader({ context }) {
	const { env } = context;
	const { results } = await env.DB.prepare("SELECT * FROM users LIMIT 5").all();
	return results;
}

export default function Users() {
	const data = useLoaderData();
	return (
		<ul>
			{data.map((user) => (
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	);
}
