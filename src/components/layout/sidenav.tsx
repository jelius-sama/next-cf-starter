import NavItem from "@/components/layout/nav-item";
export default function Sidenav() {
    return (
        <section className="h-[62px]">
            <NavItem href="/">
                Home
            </NavItem>

            <NavItem href="/settings">
                Settings
            </NavItem>

            <NavItem href="/profile">
                Profile
            </NavItem>
            <NavItem href="/sign-in">
                Sign in
            </NavItem>
            <NavItem href="/sign-up">
                Sign up
            </NavItem>
        </section>
    );
}
