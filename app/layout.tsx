export const metadata = {
  title: "Malla Bacteriología",
  description: "Visualiza y marca los cursos aprobados",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}