import { SessionProviderWrapper } from '@/components/SessionProviderWrapper';
import './globals.css';

export const metadata = {
  title: 'Virgil',
  description: 'AI-powered PDF tutor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
