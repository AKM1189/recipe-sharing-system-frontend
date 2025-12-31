export default function RecipeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="mx-5 sm:mx-10 md:mx-20 mt-10 md:mt-20">
      {children}
    </section>
  );
}
