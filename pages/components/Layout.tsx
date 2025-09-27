import Header from "./Header";

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <main className="flex-grow">
{children}      
</main>
    </div>
  );
}

export default Layout;
