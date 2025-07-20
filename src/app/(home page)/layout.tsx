import Footer from "@/components/layouts/Footer";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

async function Layout({ children }: { children: React.ReactNode }) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (session?.user?.id) {
			redirect("/home");
		}
	} catch {
		redirect("/signin");
	}
	return (
		<div>
			{children}
			<Footer />
		</div>
	);
}

export default Layout;
