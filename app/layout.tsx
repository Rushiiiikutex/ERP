import './globals.css';


export const metadata = {
  title: 'College ERP',
  description: 'A simple ERP system for colleges',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
