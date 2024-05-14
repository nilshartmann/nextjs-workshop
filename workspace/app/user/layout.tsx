export default function UserBereichLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>User Verwaltung</h1>
      <div>{children}</div>
    </div>
  );
}
