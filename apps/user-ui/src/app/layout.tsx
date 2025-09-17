import './global.css';
import Header from './shared/widget/header/Header';

export const metadata = {
  title: 'Trinet Ecommerce website',
  description: 'Trinet Ecommerce website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        {children}
        
        </body>
    </html>
  )
}
